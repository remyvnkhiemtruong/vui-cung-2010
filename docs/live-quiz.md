# English Club Live Quiz – 50-player event

**Implementation status:** Public, one-click room creation is implemented on the feature branch. A separate Neon branch `live-quiz-preview` now has the schema and `DATABASE_URL` is configured for this Vercel Preview branch. Production remains unchanged until database and multi-player tests pass.

## Routes

- `/` – existing single-player game, unchanged except a Live Multiplayer link.
- `/live` – enter a six-character room code.
- `/live/host` – **automatically creates a room and QR (no login, no password)** and lets the MC Start, Reveal, Next, Finish.
- `/live/join/ABC123` – students join on their phones with nicknames, submit A/B/C/D.
- `/live/screen/ABC123` – projector screen with QR, shared questions and Top 10 leaderboard.

A newly created room now contains **all 200 October 20 English questions, randomly ordered once, without repeats**. MC may continue through question 200, or finish early at any time. Every player sees the same current question and the same answer order, with one common 25-second timer per question. Up to 50 players join; server-owned points are base 100 for correct, up to 50 speed bonus and +20 for three or more consecutive correct answers. MC controls Start, Reveal, Next and Finish. Updates refresh approximately every 2.2 seconds.

## Database setup – REQUIRED

1. Create a **new Neon PostgreSQL project** specifically for this game (do **not** reuse the HTNV class-management database).
2. SQL from `db/live-quiz.sql` was applied to the isolated Neon **live-quiz-preview** branch. The `production` Neon branch remains untouched until tests pass.
3. In Vercel project `2010`, set:
   - `DATABASE_URL`: dedicated Neon Preview branch connection string, **encrypted** in Vercel Preview. No host passcode is used.
4. Redeploy branch `feature/live-quiz-50`. In MC page, create a room and test with actual devices.
5. After testing and approval, apply/configure the production database and Production environment variables.
6. Vercel SSO protection has been disabled to make the game publicly accessible. A room creator receives a random private **host capability token** for Start/Reveal/Next/Finish; the QR contains only the room code.

Do not store secrets in GitHub. Do not use `NEXT_PUBLIC_` prefix.

## Real-world tests to run BEFORE production

- MC creates a room and opens the projector view.
- Student uses QR and joins, name length 2–30 accepted.
- Two players cannot use the same nickname (case-insensitive).
- At most 50 players can join; 51st gets a clear refusal.
- All phones receive the same question and answer order.
- Student cannot submit twice or after 25 seconds.
- Server alone calculates the score; client cannot submit a numeric score.
- Before MC reveals, spectators do not see the correct answer or current question points; after Reveal, rankings update.
- Rapid simultaneous answers retain correct totals and are not duplicated.
- Refresh keeps the player's session if the tab remains open.
- Devices tested across Wi-Fi and cellular; projector stays visible at browser zoom 100%.
- 50 connected real devices or a proper Preview load test stays within performance and Vercel/Neon limits.
- Public access requires no Vercel login or MC passcode; only the room creator's tab holds control permissions.

## Security / practical limitations

- Room and player tokens are random values held in tab sessionStorage; only their SHA-256 hashes are persisted. A student joining with the public QR cannot operate the host controls. Public room creation is rate-limited to eight rooms per origin IP hash per 15 minutes.
- PostgreSQL room-level row locks enforce room capacity and one answer per player/question. All authoritative scoring happens inside a PostgreSQL function.
- While a question is active, public snapshots subtract that question's points from ranks, so ranking does not leak the correct option prematurely.
- The existing **solo quiz** still bundles correct answers client-side; a motivated participant could inspect that JavaScript bundle. This is suitable for a friendly club game, but not a fully cheat-proof high-stakes examination.
- Polling at ~2.2s yields about 23 player status requests/sec at 50 players, plus host/projector. Database-backed load testing is the release gate.
- Scores do not sync via WebSockets; this is near-real-time polling, which is operationally simpler on Vercel.
- Names and results are retained in the Neon database until cleaned up. The provided SQL includes an optional 30-day cleanup statement; decide data retention before the event.
- Losing a browser tab may lose the host/student secret session. Host should keep the MC tab open during the event.
- Vercel Preview has a dedicated Neon database connection. Live API testing is required before production.

## Run tests

`npm run test:live` runs unit/static validation for scoring, 50 simulated players, phase transitions, SQL safety invariants, and non-disclosure in public responses. `npm run build` runs both the new 200-question/40-complete-deck/100-solo-round validation and these Live tests before compiling Next.js.

The 50-player test is a **pure scoring simulation**, not a 50-client network throughput test. The build additionally verifies 40 complete 200-question room decks for uniqueness and correct shuffled answers. Do not infer real load capacity from unit tests alone.

## Response progress indicator

During each active question, both the MC dashboard and projector show **ANSWERS RECEIVED: X/Y**, a progress bar, and a green **ALL STUDENTS HAVE ANSWERED** confirmation when all joined participants have submitted an answer. The numerator is counted by PostgreSQL from accepted answers for the current room and question, not by browser clicks; duplicate submissions do not increase it. The denominator is the room's player count (maximum 50). The value updates with the existing approximately 2.2-second polling cycle. It resets automatically on the next question. This indicator does **not** automatically reveal answers: the MC explicitly clicks **REVEAL ANSWER**.

## Continuing until the bank is exhausted

- When the MC opens `/live/host`, the server stores a unique random permutation of all **200** questions in the room's Neon JSONB document.
- Database state holds `question_index`, starting at 0. The public room API fetches only `questions -> question_index` rather than transporting the whole bank to each phone.
- `REVEAL ANSWER` does not advance the question. `NEXT QUESTION` moves exactly one position after reveal. Pressing Next after question **10** opens question **11**; after **199**, it opens **200**.
- On revealing question 200, the next MC action changes the room phase to `finished`; the final leaderboard appears. Pressing `END EARLY` is always supported during the game.
- Answer counts are scoped to the active question and reset to 0 for the next question. Each player may submit at most one answer per question.
- Opening a new room re-shuffles the full bank; no-repeat is guaranteed **within each room**, not between different rooms.
- The solo mode keeps its short 10-question rounds and remembers already-shown IDs in this browser. It resets the seen deck only after using all 200.

### Historical and teaching sources

- [Vietnam Women's Union: historical milestones](https://hoilhpn.org.vn/web/guest/tin-chi-tiet/-/chi-tiet/hoi-lhpn-viet-nam-cac-dau-moc-lich-su-32291-3301.html)
- [Vietnam Women's Union: 80-year history](https://www.hoilhpn.org.vn/tin-chi-tiet/-/chi-tiet/hoi-lhpn-viet-nam-80-nam-mot-chang-%C4%91uong-20-10-1930-20-10-2010--14712-2.html)
- [Vietnam National Museum of History: Trung Sisters](https://baotanglichsu.vn/VI/Articles/3098/13485/cuoc-khoi-nghia-hai-ba-trung-nam-40-43-sau-cong-nguyen.html)
- [Sports Authority: Tran Hieu Ngan's Olympic milestone](https://tdtt.gov.vn/the-thao-trong-nuoc/id/94134/tran-hieu-ngan-dau-moc-dau-tien-cua-the-thao-viet-nam-tai-olympic)

New historical and women's achievement questions carry source URLs. Activity questions are designed as practical event-planning scenarios; they do not imply that every school follows identical October 20 traditions.

### Production rollout

The branch and the PR must pass Vercel Preview build, TypeScript, prebuild uniqueness checks and a room integration test before production. The Vercel Hobby project had previously hit its daily deploy quota; if Vercel shows rate limiting, do not merge solely on the strength of code review.
