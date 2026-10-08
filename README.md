# English Club Mini Game — Vietnamese Women's Day 🌸

A friendly, **100% English** team/solo quiz for the English Club's October 20 celebration. Built with Next.js, React and TypeScript, and deployed on Vercel.

## Audience and learning goals

- Designed for mixed-ability English learners (roughly CEFR A2–B1).
- Build confidence by answering short, clear questions rather than memorizing obscure historical dates.
- Practice useful everyday English, celebrate Vietnamese women, and enjoy a fast-paced game-show atmosphere.
- Celebrate people without stereotyping gender or assigning roles by gender.

## Format

Each new round randomly selects **10 questions from a curated bank of 54**, with no duplicates. The order of questions **and** the A/B/C/D positions are shuffled. Every session includes:

| Round | Questions | Difficulty |
| --- | ---: | --- |
| 20/10 Celebration | 3 | 2 warm-up, 1 standard |
| English Challenge | 3 | 1 warm-up, 1 standard, 1 challenge |
| Inspiring Women | 2 | 1 warm-up, 1 standard |
| Picture Round | 2 | 1 warm-up, 1 standard |
| **Total** | **10** | **5 warm-up, 4 standard, 1 challenge** |

There are **25 seconds per question**. Correct answers earn 100 points, up to 50 speed points, and +20 extra points for streaks of at least three. A session usually takes about **6–10 minutes** including the host's introduction and short answer reactions.

## Illustrations

The previous two solid-color placeholders have been replaced by **12 original SVG illustrations**, bundled in `public/questions/english-club/`. They work without external image servers, and every round includes two picture questions. Each image provides accessible alt text through the question and an English attribution.

## Host instructions

1. Open the Vercel Preview and enter a player/team name.
2. Display the website on a projector or large TV; allow the audience to read the question before answering.
3. Players can click/tap answers or use **A, B, C, D / 1, 2, 3, 4**. Press **Enter** after an answer to continue.
4. Take 15–30 seconds to ask a volunteer to explain an interesting answer in English after selected rounds.
5. Press **Play Again** for a fresh ten-question round. The high score is stored only in this browser, not in a shared online leaderboard.

A ready-to-use MC script is provided in `docs/english-club-host-guide.md`.

## Content quality and source checking

- Bank: `src/data/questions.ts`
- Type contracts: `src/types/quiz.ts`
- Selection logic: `buildQuizRound()` and `ROUND_PLAN`
- Build-time bank validator: `scripts/check-quiz-bank.mjs`
- All factual questions carry an optional `sourceUrl`, shown after answering.
- `npm run build` runs validation (including **100 simulated rounds**) before Next.js compilation.
- The check fails the deployment for duplicate IDs or answers, missing images, unexpected ratios, incorrect answer mappings, or insufficient question coverage.

### Selected reliable references

- Council of Europe: [CEFR A2/B1 language descriptors](https://www.coe.int/en/web/common-european-framework-reference-languages/table-%201-cefr-3.3-common-reference-levels-global-scale)
- British Council: [Fluency activities for lower levels](https://www.teachingenglish.org.uk/en/teaching-resources/teaching-secondary/activities/pre-intermediate-a2/fluency-activities-lower)
- Official account of [Vietnamese Women's Day](https://sotuphap.hochiminhcity.gov.vn/)
- [UNESCO International Women's Day](https://www.unesco.org/en/days/women)
- [Nobel Prize: Marie Curie](https://www.nobelprize.org/prizes/physics/1903/marie-curie/questions-and-answers/)
- [Nobel Prize: Malala Yousafzai](https://www.nobelprize.org/prizes/peace/2014/yousafzai/biographical/)
- [NASA: Katherine Johnson](https://www.nasa.gov/centers-and-facilities/langley/katherine-johnson-biography/)
- [Smithsonian: Amelia Earhart](https://www.si.edu/object/amelia-earhart:nasm_A19500108000)

## Development

```bash
npm ci
npm run dev
npm run lint
npm run build
```

`master` serves the existing production release. New English Club changes are first made on the `upgrade/question-bank-v2` branch and reviewed in Vercel Preview.
