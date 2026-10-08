# English Club Live Quiz – 50-player event

**Implementation status:** Feature branch implemented; Vercel Preview compiles and passes static/unit tests. **Live multi-device operation requires a dedicated Neon database and secrets. No production release should occur before database-backed integration testing.**

## Routes

- `/` – existing single-player game, unchanged except a Live Multiplayer link.
- `/live` – enter a six-character room code.
- `/live/host` – MC enters a private passcode, creates room, shows QR, controls Start, Reveal, Next, Finish.
- `/live/join/ABC123` – students join on their phones with nicknames, submit A/B/C/D.
- `/live/screen/ABC123` – projector screen with QR, shared questions and Top 10 leaderboard.

A session has 10 shared random questions from the existing 54 English October 20 questions, one common 25-second timer per question, 50 players maximum, and server-owned point calculations (100 for correct, up to 50 speed, +20 streak of 3 or more). MC controls question transitions. Updates refresh approximately every 2.2 seconds.

## Database setup – REQUIRED

1. Create a **new Neon PostgreSQL project** specifically for this game (do **not** reuse the HTNV class-management database).
2. Apply the SQL in `db/live-quiz.sql` in its Neon SQL Editor after reviewing it.
3. In Vercel project `2010`, set:
   - `DATABASE_URL`: pooled Neon connection string, type **encrypted**, target Preview initially.
   - `LIVE_HOST_PASSCODE`: your chosen host secret, at least 12 characters, target Preview initially. Never share with students.
4. Redeploy branch `feature/live-quiz-50`. In MC page, create a room and test with actual devices.
5. After testing and approval, apply/configure the production database and Production environment variables.
6. Current Vercel project has **Deployment Protection (SSO)** enabled for *.vercel.app domains. Students may see a Vercel login prompt. Use an approved public custom domain or configure deployment protection so student-facing routes are reachable. Keep host protected by the secret passcode.

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
- Public access does not require Vercel login, while the MC passcode remains private.

## Security / practical limitations

- Room and player tokens are random secret values held in tab sessionStorage; only their SHA-256 hashes are persisted. Host token is never in QR.
- PostgreSQL room-level row locks enforce room capacity and one answer per player/question. All authoritative scoring happens inside a PostgreSQL function.
- While a question is active, public snapshots subtract that question's points from ranks, so ranking does not leak the correct option prematurely.
- The existing **solo quiz** still bundles correct answers client-side; a motivated participant could inspect that JavaScript bundle. This is suitable for a friendly club game, but not a fully cheat-proof high-stakes examination.
- Polling at ~2.2s yields about 23 player status requests/sec at 50 players, plus host/projector. We have **not yet load-tested against a live database**.
- Scores do not sync via WebSockets; this is near-real-time polling, which is operationally simpler on Vercel.
- Names and results are retained in the Neon database until cleaned up. The provided SQL includes an optional 30-day cleanup statement; decide data retention before the event.
- Losing a browser tab may lose the host/student secret session. Host should keep the MC tab open during the event.
- Vercel preview may return 503 on API requests until DATABASE_URL is configured.

## Run tests

`npm run test:live` runs unit/static validation for scoring, 50 simulated players, phase transitions, SQL safety invariants, and non-disclosure in public responses. `npm run build` runs both the prior 54-question/100-round bank validation and these Live tests before compiling Next.js.

The 50-player test is a **pure scoring simulation**, not a 50-client network throughput test. Do not infer real load capacity from unit tests alone.
