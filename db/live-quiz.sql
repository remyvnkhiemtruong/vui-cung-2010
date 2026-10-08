-- Isolated English Club Live Quiz schema. Apply only to a dedicated Neon database.
-- All writes are enforced by atomic PostgreSQL transactions.
CREATE TABLE IF NOT EXISTS live_quiz_rooms (
  code varchar(6) PRIMARY KEY,
  host_token_hash varchar(64) NOT NULL,
  creator_hash varchar(64) NOT NULL,
  phase varchar(12) NOT NULL DEFAULT 'lobby' CHECK (phase IN ('lobby','question','reveal','finished')),
  question_index integer NOT NULL DEFAULT -1,
  questions jsonb NOT NULL CHECK (jsonb_typeof(questions) = 'array'),
  question_started_at timestamptz,
  seconds_per_question integer NOT NULL DEFAULT 25 CHECK (seconds_per_question BETWEEN 10 AND 120),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS live_quiz_players (
  id uuid PRIMARY KEY,
  room_code varchar(6) NOT NULL REFERENCES live_quiz_rooms(code) ON DELETE CASCADE,
  display_name varchar(30) NOT NULL CHECK (char_length(display_name) BETWEEN 2 AND 30),
  token_hash varchar(64) NOT NULL,
  score integer NOT NULL DEFAULT 0,
  streak integer NOT NULL DEFAULT 0,
  total_correct_ms integer NOT NULL DEFAULT 0,
  joined_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS live_quiz_unique_names
  ON live_quiz_players (room_code, lower(display_name));
CREATE INDEX IF NOT EXISTS live_quiz_players_ranking
  ON live_quiz_players (room_code, score DESC, total_correct_ms ASC, joined_at ASC);

CREATE TABLE IF NOT EXISTS live_quiz_answers (
  room_code varchar(6) NOT NULL REFERENCES live_quiz_rooms(code) ON DELETE CASCADE,
  player_id uuid NOT NULL REFERENCES live_quiz_players(id) ON DELETE CASCADE,
  question_index integer NOT NULL,
  choice char(1) NOT NULL CHECK (choice IN ('A','B','C','D')),
  is_correct boolean NOT NULL,
  earned_points integer NOT NULL,
  response_ms integer NOT NULL,
  submitted_at timestamptz NOT NULL,
  PRIMARY KEY (room_code, player_id, question_index)
);

-- Basic room-creation rate limit (eight rooms/15min per origin IP hash).
CREATE INDEX IF NOT EXISTS live_quiz_room_creation_rate
  ON live_quiz_rooms (creator_hash, created_at);

CREATE OR REPLACE FUNCTION live_quiz_create_room(
  p_code text, p_hash text, p_questions jsonb, p_creator text
) RETURNS text LANGUAGE plpgsql AS $
DECLARE n integer;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext(p_creator)::bigint);
  SELECT count(*) INTO n FROM live_quiz_rooms
    WHERE creator_hash=p_creator AND created_at > now() - interval '15 minutes';
  IF n >= 8 THEN RETURN 'rate_limited'; END IF;
  INSERT INTO live_quiz_rooms (code,host_token_hash,creator_hash,questions)
    VALUES (p_code,p_hash,p_creator,p_questions);
  RETURN 'created';
END;
$;

-- Room-level lock makes concurrent joins respect the 50-player cap.
CREATE OR REPLACE FUNCTION live_quiz_join(
  p_code text, p_id uuid, p_name text, p_token_hash text
) RETURNS text LANGUAGE plpgsql AS $$
DECLARE r live_quiz_rooms%ROWTYPE; n integer;
BEGIN
  SELECT * INTO r FROM live_quiz_rooms WHERE code=p_code FOR UPDATE;
  IF NOT FOUND THEN RETURN 'not_found'; END IF;
  IF r.created_at < now() - interval '24 hours' THEN RETURN 'expired'; END IF;
  IF r.phase <> 'lobby' THEN RETURN 'closed'; END IF;
  SELECT count(*) INTO n FROM live_quiz_players WHERE room_code=p_code;
  IF n >= 50 THEN RETURN 'full'; END IF;
  IF EXISTS (SELECT 1 FROM live_quiz_players WHERE room_code=p_code AND lower(display_name)=lower(p_name)) THEN
    RETURN 'duplicate_name';
  END IF;
  INSERT INTO live_quiz_players (id,room_code,display_name,token_hash)
    VALUES (p_id,p_code,p_name,p_token_hash);
  RETURN 'joined';
END;
$$;

-- Only server-side code invokes this using the secret host-token hash.
CREATE OR REPLACE FUNCTION live_quiz_control(
  p_code text, p_hash text, p_action text
) RETURNS text LANGUAGE plpgsql AS $$
DECLARE r live_quiz_rooms%ROWTYPE; next_i integer;
BEGIN
  SELECT * INTO r FROM live_quiz_rooms WHERE code=p_code FOR UPDATE;
  IF NOT FOUND THEN RETURN 'not_found'; END IF;
  IF r.host_token_hash <> p_hash THEN RETURN 'unauthorized'; END IF;
  IF p_action='start' AND r.phase='lobby' THEN
    UPDATE live_quiz_rooms SET phase='question',question_index=0,question_started_at=now(),updated_at=now()
      WHERE code=p_code; RETURN 'ok';
  ELSIF p_action='reveal' AND r.phase='question' THEN
    UPDATE live_quiz_rooms SET phase='reveal',updated_at=now() WHERE code=p_code;
    RETURN 'ok';
  ELSIF p_action='next' AND r.phase='reveal' THEN
    next_i := r.question_index + 1;
    IF next_i >= jsonb_array_length(r.questions) THEN
      UPDATE live_quiz_rooms SET phase='finished',updated_at=now() WHERE code=p_code;
    ELSE
      UPDATE live_quiz_rooms SET phase='question',question_index=next_i,
        question_started_at=now(),updated_at=now() WHERE code=p_code;
    END IF;
    RETURN 'ok';
  ELSIF p_action='finish' AND r.phase IN ('question','reveal') THEN
    UPDATE live_quiz_rooms SET phase='finished',updated_at=now() WHERE code=p_code;
    RETURN 'ok';
  ELSE
    RETURN 'invalid_transition';
  END IF;
END;
$$;

-- One server-authoritative submission; room/player locks and PK enforce idempotency.
CREATE OR REPLACE FUNCTION live_quiz_submit(
  p_code text, p_id uuid, p_token_hash text,
  p_index integer, p_choice text, p_arrived_at timestamptz
) RETURNS jsonb LANGUAGE plpgsql AS $$
DECLARE
  r live_quiz_rooms%ROWTYPE;
  player live_quiz_players%ROWTYPE;
  correct_letter text;
  correct boolean;
  elapsed integer; remaining integer; new_streak integer; awarded integer;
BEGIN
  SELECT * INTO r FROM live_quiz_rooms WHERE code=p_code FOR UPDATE;
  IF NOT FOUND THEN RETURN jsonb_build_object('status','not_found'); END IF;
  SELECT * INTO player FROM live_quiz_players
    WHERE id=p_id AND room_code=p_code AND token_hash=p_token_hash FOR UPDATE;
  IF NOT FOUND THEN RETURN jsonb_build_object('status','unauthorized'); END IF;
  IF EXISTS(SELECT 1 FROM live_quiz_answers WHERE room_code=p_code AND player_id=p_id AND question_index=p_index) THEN
    RETURN jsonb_build_object('status','already_answered');
  END IF;
  IF r.phase<>'question' OR r.question_index<>p_index THEN
    RETURN jsonb_build_object('status','not_active');
  END IF;
  IF r.question_started_at IS NULL OR p_arrived_at < r.question_started_at OR
     p_arrived_at > r.question_started_at + make_interval(secs => r.seconds_per_question) THEN
    RETURN jsonb_build_object('status','expired');
  END IF;
  IF p_choice NOT IN ('A','B','C','D') THEN RETURN jsonb_build_object('status','invalid_choice'); END IF;
  correct_letter := r.questions -> p_index ->> 'correctAnswer';
  correct := (p_choice=correct_letter);
  elapsed := greatest(0,least(r.seconds_per_question*1000,
    floor(extract(epoch FROM (p_arrived_at-r.question_started_at))*1000)::integer));
  remaining := r.seconds_per_question*1000-elapsed;
  new_streak := CASE WHEN correct THEN player.streak+1 ELSE 0 END;
  awarded := CASE WHEN correct THEN
    100+round(remaining::numeric/(r.seconds_per_question*1000)*50)::integer+
    CASE WHEN new_streak>=3 THEN 20 ELSE 0 END
    ELSE 0 END;
  INSERT INTO live_quiz_answers
    (room_code,player_id,question_index,choice,is_correct,earned_points,response_ms,submitted_at)
    VALUES(p_code,p_id,p_index,p_choice,correct,awarded,elapsed,p_arrived_at);
  UPDATE live_quiz_players SET score=score+awarded,streak=new_streak,
    total_correct_ms=total_correct_ms+CASE WHEN correct THEN elapsed ELSE 0 END
    WHERE id=p_id;
  RETURN jsonb_build_object('status','accepted');
END;
$$;

-- Optional cleanup, run manually after events. Keep results for exporting first.
-- DELETE FROM live_quiz_rooms WHERE created_at < now() - interval '30 days';
