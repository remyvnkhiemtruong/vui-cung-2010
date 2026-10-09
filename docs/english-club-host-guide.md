# English Club — 20 October (MC Script)

**Questions:** Supplied by Ms. Phan Thanh Thùy, English Teacher, Vo Van Kiet High School.

**System:** Developed by Trương Minh Khiêm, Cohort 52 Student, Ho Chi Minh City University of Education.

**Format:** 12 English questions, 30 seconds per question, no repeats, individual quiz or up to 50 live participants via QR.

## Opening

> Welcome to our Vietnamese Women's Day English Club Quiz! Today's twelve questions were prepared by Ms. Phan Thanh Thùy from Vo Van Kiet High School. We will explore the history of October 20, memorable women, traditional virtues, and two picture-based questions.

## How to play

> Scan the QR code and enter your nickname. When everyone is ready, we will start together. You have thirty seconds for each question. Choose A, B, C, or D. We will display how many students have answered, and reveal the correct response together.

## During the quiz

- Read the exact question shown on the screen; do not insert additional trivia.
- Give students the 30-second response window, then click **REVEAL ANSWER**.
- The system shows an answer explanation based on the teacher's source document.
- The picture depicting domestic violence should be introduced respectfully; avoid making light of abuse.
- One source question is a light-hearted wife/girlfriend riddle, not a statement of fact.
- The game ends after question 12. Display the leaderboard and applaud everyone's participation.

## Closing

> Thank you for joining our English Club celebration. We appreciate the contributions, courage, and achievements of Vietnamese women. Happy Vietnamese Women's Day!

## Image integrity fix

The original teacher's Word document embeds the two quiz illustration screenshots as PNG images. The photo portions alone have been faithfully cropped, encoded into small valid WebP files and committed under `public/questions/teacher-docx/`. Do not use the old `.jpg` files: they were corrupt and triggered `Image unavailable` despite the route returning HTTP 200. The prebuild validator pins the correct image data with SHA-256 and RIFF/WEBP checks, and the solo player bypasses the Next.js image optimizer for these static local resources.
