# October 20 Mini Game — English Club 🌸

**Topic:** Vietnamese Women's Day on October 20 ONLY. Every question is written in English for the English Club, but this is a **celebration quiz, not an English grammar quiz**.

## What's in the bank?

The game randomly selects 10 of 54 curated questions, with no duplicates:

| Category | Total bank | Each round | Learning goal |
|---|---:|---:|---|
| October 20: Origins | 12 | 3 | Recognized founding date of the Vietnam Women's Union and its history |
| October 20: Activities | 18 | 3 | Greetings, flower arranging, tributes, performances, community activities |
| Vietnamese Women | 12 | 2 | Inspiring Vietnamese women highlighted during Women's Day |
| October 20: Picture Quiz | 12 | 2 | Identify 20/10 activities from original illustrations |
| **Total** | **54** | **10** | **All questions related to October 20** |

Each round contains **five warm-up questions, four standard questions, and one final celebration scenario challenge**. Questions shuffle within each level; answer positions A/B/C/D shuffle. The timer gives **25 seconds per question**. Two picture questions are guaranteed.

There are **no questions about English grammar, general idioms, unrelated global celebrities, or abstract legal trivia**.

## Historical accuracy

The trivia distinguishes two commonly confused dates:
- October 20, **1930**: the Vietnam Women's Union's officially recognized founding date.
- October 20, **1946**: launch under its present name, with Le Thi Xuyen as first chairwoman.
- **1976**: a conference recognized October 20, 1930 as the Union's founding date.

Celebration activity questions use everyday examples, such as thank-you cards, meaningful speeches, flower arranging, recognizing women's achievements and charity. They are framed as good event choices — not claims that every family or school has identical customs.

Women featured include Trung Trac, Trung Nhi, Lady Trieu, Le Thi Xuyen, Nguyen Thi Dinh, Vo Thi Sau, Dang Thuy Tram, Nguyen Thi Binh, Ho Xuan Huong, and Ly Chieu Hoang. They are featured because October 20 celebrates the contributions of Vietnamese women, **not because they were all born on October 20**.

### Reliable references

- [Vietnam Women's Union — 80 Years of Development](https://www.hoilhpn.org.vn/tin-chi-tiet/-/chi-tiet/hoi-lhpn-viet-nam-80-nam-mot-chang-%C4%91uong-20-10-1930-20-10-2010--14712-2.html)
- [Vietnam Women's Union — Historical Milestones](https://www.hoilhpn.org.vn/web/guest/tin-chi-tiet/-/chi-tiet/hoi-lhpn-viet-nam-cac-dau-moc-lich-su-32291-3301.html)
- [Vietnam Women's Union — October 20 Activities (2026)](https://www.hoilhpn.org.vn/web/guest/tin-chi-tiet/-/chi-tiet/7-hoat-%C4%91ong-trong-tam-chao-mung-96-nam-thanh-lap-hoi-lhpn-viet-nam-va-ngay-phu-nu-viet-nam-999501-2.html)
- [Vietnam Women's Union — Flower-Arranging Event (2025)](https://www.hoilhpn.org.vn/web/guest/tin-chi-tiet/-/chi-tiet/%C4%91ang-uy-tw-hoi-lhpn-viet-nam-to-chuc-sinh-hoat-chuyen-%C4%91e-nhung-sac-mau-hanh-phuc-ky-niem-95-nam-thanh-lap-hoi-681701-7.html)
- [Vietnam Women's Museum — About](https://baotangphunu.org.vn/en/about/)
- [Vietnam National Museum of History — Trung Sisters](https://baotanglichsu.vn/VI/Articles/3098/13485/cuoc-khoi-nghia-hai-ba-trung-nam-40-43-sau-cong-nguyen.html)
- [Vietnam National Museum of History — Lady Trieu](https://baotanglichsu.vn/vi/Articles/3098/14281/cuoc-khoi-nghia-cua-trieu-thitrinh.html)

Individual historical question cards also provide a source link after the answer is revealed.

## Original illustrations

Twelve new SVG illustrations are served from `public/questions/october20/` with **no external image hosting**. Each is paired with a specific October 20 activity (flowers, greeting cards, performances, tributes, museum visits, awards and more). Older general-topic illustrations are no longer referenced by the quiz.

## Event format

- Participants play as one person or as one team on a shared screen.
- Keyboard shortcuts: **A/B/C/D** or **1/2/3/4**; **Enter** advances after answering.
- A correct answer: 100 points, plus up to 50 speed points; streaks of three or more add 20.
- Scores are local to the browser and **not** a networked leaderboard.
- The mini game is designed for a **6–10 minute club segment**.
- [English-only MC script](docs/english-club-host-guide.md)

## Tests and development

```bash
npm ci
npm run lint
npm run build
```

The prebuild validator in `scripts/check-quiz-bank.mjs` checks duplicate questions, category/difficulty ratios, missing images, all four answer options and **100 simulated 10-question rounds** — including balance, final challenge placement and correctness after shuffling.
