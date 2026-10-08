# October 20 Mini Game — English Club 🌸

**Topic:** Vietnamese Women's Day on October 20 ONLY. Every question is written in English for the English Club, but this is a **celebration quiz, not an English grammar quiz**.

## 200-question bank (English, Vietnamese Women's Day only)

The English Club bank now contains **200 unique questions**, each with four options, the correct answer and an explanation. All questions stay on topic: Vietnamese Women's Day, the Vietnam Women's Union, meaningful October 20 events, and Vietnamese women's achievements.

| Category | Questions |
|---|---:|
| October 20: Origins | 36 |
| October 20: Activities | 90 |
| Vietnamese Women | 50 |
| October 20: Picture Quiz | 24 |
| **Total** | **200** |

There are **24 distinct picture questions** using **12 original local SVG illustrations** (one image may accompany two different questions). Historical and biographical questions link to sources such as the Vietnam Women's Union, National Museum of History and Vietnam's Sports Authority.

**Solo quiz:** Still offers 10 questions per round (3 origins, 3 activities, 2 women, 2 picture clues; five warm-ups, four standard, one final challenge; 25 seconds/question). The browser remembers which questions have already appeared across consecutive rounds and avoids repeats until all 200 have been shown; it then starts a new cycle. This history is local to the browser and may reset when browser data is cleared.

**Live Quiz:** A room shuffles the full bank **once when created**, then moves through the same 200-question list for all students. After question 10 the MC can continue to question 11, and so on until question 200, without repeating any question ID. The game ends when the bank is exhausted or the MC chooses **END EARLY**. The 25-second timer, server-side score calculations, up to 50 students, QR invites, answer-progress counter and projector leaderboard are unchanged. The MC manually controls **REVEAL ANSWER** and **NEXT QUESTION**; there is no automatic advance when the timer expires.

**Time note:** Playing all 200 questions takes well over an hour. The MC can finish whenever appropriate for the club event; creating a new room starts a new independently randomized deck.

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

Twelve original SVG illustrations are served from `public/questions/october20/` with **no external image hosting**. Each is paired with a specific October 20 activity (flowers, greeting cards, performances, tributes, museum visits, awards and more). Older general-topic illustrations are no longer referenced by the quiz.

## Event format

- Participants play as one person or as one team on a shared screen.
- Keyboard shortcuts: **A/B/C/D** or **1/2/3/4**; **Enter** advances after answering.
- A correct answer: 100 points, plus up to 50 speed points; streaks of three or more add 20.
- Scores are local to the browser and **not** a networked leaderboard.
- The mini game is designed for a **6–10 minute club segment**.
- [English-only MC script](docs/english-club-host-guide.md)


## Responsive presentation layout and attribution

The website uses a **100dvh viewport-locked layout** on desktop, projectors, tablets, and phones. The start form, quiz, and results screen are designed to fit inside the browser viewport **without scrolling the page**. After selecting an answer, the option grid is replaced with feedback to free vertical space. Reviewing results uses **Previous / Next** buttons to navigate one answer at a time, rather than a long scrollable list.

For best results during a live presentation, use standard browser zoom (100%) and a typical landscape projector resolution. Browser accessibility settings, exceptionally small viewports, and enlarged system fonts can require further layout adjustments.

**Created by:** Truong Minh Khiem  
**Affiliation:** Ho Chi Minh City University of Education

These credits appear in English in the fixed footer on all three game screens, and the author and affiliation are included in page metadata.

## Tests and development

```bash
npm ci
npm run lint
npm run build
```

The prebuild validator in `scripts/check-quiz-bank.mjs` now checks all **200** unique IDs and prompts, four valid options and answer mappings, local SVGs, category counts, **100 balanced solo rounds, 40 complete 200-question Live decks**, and **20 consecutive solo rounds without any repeated question**. The Live tests also check that question 10 is no longer the end of a room.
