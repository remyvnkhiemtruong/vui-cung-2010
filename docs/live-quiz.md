# English Club Live Quiz – 50-player event

**Implementation status:** Public, one-click room creation is implemented on the feature branch. A separate Neon branch `live-quiz-preview` now has the schema and `DATABASE_URL` is configured for this Vercel Preview branch. Production remains unchanged until database and multi-player tests pass.

## Routes

- `/` – existing single-player game, unchanged except a Live Multiplayer link.
- `/live` – enter a six-character room code.
- `/live/host` – **automatically creates a room and QR (no login, no password)** and lets the MC Start, Reveal, Next, Finish.
- `/live/join/ABC123` – students join on their phones with nicknames, submit A/B/C/D.
- `/live/screen/ABC123` – projector screen with QR, shared questions and Top 10 leaderboard.

A session has 10 shared random questions from the existing 54 English October 20 questions, one common 25-second timer per question, 50 players maximum, and server-owned point calculations (100 for correct, up to 50 speed, +20 streak of 3 or more). MC controls question transitions. Updates refresh approximately every 2.2 seconds.

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

`npm run test:live` runs unit/static validation for scoring, 50 simulated players, phase transitions, SQL safety invariants, and non-disclosure in public responses. `npm run build` runs both the prior 54-question/100-round bank validation and these Live tests before compiling Next.js.

The 50-player test is a **pure scoring simulation**, not a 50-client network throughput test. Do not infer real load capacity from unit tests alone.

## Response progress indicator

During each active question, both the MC dashboard and projector show **ANSWERS RECEIVED: X/Y**, a progress bar, and a green **ALL STUDENTS HAVE ANSWERED** confirmation when all joined participants have submitted an answer. The numerator is counted by PostgreSQL from accepted answers for the current room and question, not by browser clicks; duplicate submissions do not increase it. The denominator is the room's player count (maximum 50). The value updates with the existing approximately 2.2-second polling cycle. It resets automatically on the next question. This indicator does **not** automatically reveal answers: the MC explicitly clicks **REVEAL ANSWER**.
