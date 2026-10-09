# English Club • Vietnamese Women's Day (October 20)

This game uses **only the 12 questions from the Word document supplied by the English teacher**. All prior generated question banks (54, 200, and proposed 300 questions) have been replaced; none are imported into the active game.

## Content and credits

**Question content:** Ms. Phan Thanh Thùy — English Teacher, Vo Van Kiet High School.

**System development:** Trương Minh Khiêm — Cohort 52 Student, Ho Chi Minh City University of Education.

The source document contains 12 items across 3 pages: Vietnamese Women's Day date, ten women at Đồng Lộc Junction, Lý Chiêu Hoàng, Trưng Trắc, Công–Dung–Ngôn–Hạnh, two illustrated questions (domestic violence and housework), a light-hearted October 20 riddle, the 'eight golden words', Nguyễn Thị Định, Đặng Thùy Trâm, and the purpose of October 20.

The two photo questions use photos cropped **directly from the teacher's original embedded Word images**. Their original answer choices and correct letters are maintained. Two open-ended source questions (four virtues and the riddle) received *three new incorrect answer options* each solely so they work in the game's A/B/C/D format. The question calling Lý Chiêu Hoàng the “first emperor (king)” was clarified as **first female ruler** to avoid a factually misleading question while preserving the supplied correct answer. All other question content and intended answers follow the teacher's document.

## Rules

- **Exactly 12 questions** per solo game and per live room, with no repetitions inside the session.
- **30 seconds per question**, on the solo timer and in the shared server clock for the Live Quiz.
- **Live Quiz:** host opens `/live/host` to create a room and QR automatically, up to 50 students join, MC presses Start and controls Reveal and Next, while the projector at `/live/screen/CODE` shows current question, responses received (X/Y), and the live ranking.
- Everyone in one Live room receives the same randomly shuffled question order and shuffled A/B/C/D choice positions.
- Existing rooms keep their stored questions and their original timer until the host creates a new room; the update applies to newly created rooms.
- Score: 100 base points for a correct answer, up to 50 speed points, and a 20-point streak bonus for 3+ correct consecutive answers. The server counts each answer at most once.
- Browser solo high scores and seen-question history use separate keys so old results from prior question banks do not carry forward.

## Verification

`npm run build` runs `scripts/check-quiz-bank.mjs` to verify the exact 12 teacher answers, photo presence, and 100 complete, non-repeating random rounds, then runs the server scoring tests before compiling Next.js. Database SQL schema in `db/live-quiz.sql` uses 30 seconds as the default on newly created rooms. Check Vercel Preview before publishing to production.
