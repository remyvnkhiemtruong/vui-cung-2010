# Neon project configuration (English Club Live Quiz)

The Neon project selected for this repository:

- **Name:** english-club-live-quiz
- **Project ID:** `steep-frost-65613497`
- **Primary branch:** `production`
- **Branch ID:** `br-misty-meadow-b3wm0se5`
- **Database:** `neondb`

The root `neon.ts` intentionally contains **only** `defineConfig({})` as requested. It does not create schema tables or turn on optional Neon services. The SQL for multiplayer is separately tracked at [`db/live-quiz.sql`](../db/live-quiz.sql).

## Set up in YOUR project working directory

Open a terminal at your local checkout of `remyvnkhiemtruong/vui-cung-2010`:

```bash
git checkout feature/live-quiz-50
npm install
npm i -g neon@latest
neon auth
neon skills -y
neon mcp -y
neon link --project-id steep-frost-65613497 --branch production -y
neon config init
```

The committed `neon.ts` already has the requested contents:

```ts
import { defineConfig } from "@neon/config/v1";

export default defineConfig({});
```

**Before deploying, inspect proposed changes:**

```bash
neon config status
neon config plan
neon deploy
```

- Recent Neon documentation describes `neon auth` for OAuth. If `neon login` works in your version, it can be used instead.
- `neon link` writes local project context in `.neon` and may pull branch credentials into `.env.local`; **both must remain local and never be committed**.
- The CLI setup commands require a local interactive OAuth session, npm registry access, and a compatible editor. This repository preparation does not mean those CLI commands already executed on your own machine.
- `neon deploy` is an alias of `neon config apply`. Empty `defineConfig({})` leaves default PostgreSQL features alone; **it does not create Live Quiz tables**.
- To enable real multiplayer, apply `db/live-quiz.sql` after migration review/approval, connect the pooled Neon `DATABASE_URL` to the **Vercel Preview** environment, and configure a private `LIVE_HOST_PASSCODE`. Then run the end-to-end and 50-player load tests in [`docs/live-quiz.md`](live-quiz.md).
- Do **not** merge the Live Quiz PR into production until Neon-backed Preview testing is successful.
