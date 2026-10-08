import { Question, OptionKey, QuestionType, QuestionOption } from '@/types/quiz';

/**
 * Input definition interface for creating type-safe questions easily.
 */
export interface CreateQuestionInput {
  id: number | string;
  type?: QuestionType;
  question: string;
  options: Record<OptionKey, string>;
  correctAnswer: OptionKey;
  image?: string;
  imageCredit?: string;
  imageSourceUrl?: string;
  explanation?: string;
  category?: string;
  difficulty?: 'warm-up' | 'standard' | 'challenge';
  sourceUrl?: string;
}

/**
 * Factory helper to build a normalized, type-safe Question object.
 */
export function createQuestion(input: CreateQuestionInput): Question {
  const optionKeys: OptionKey[] = ['A', 'B', 'C', 'D'];
  const formattedOptions: QuestionOption[] = optionKeys.map((key) => ({
    key,
    text: input.options[key],
  }));

  return {
    id: input.id,
    type: input.type ?? 'multiple-choice',
    question: input.question,
    options: formattedOptions,
    correctAnswer: input.correctAnswer,
    image: input.image,
    imageCredit: input.imageCredit,
    imageSourceUrl: input.imageSourceUrl,
    explanation: input.explanation,
    category: input.category,
    difficulty: input.difficulty,
    sourceUrl: input.sourceUrl,
  };
}

/**
 * Official Question Bank for Vietnamese Women's Day Quiz.
 * English-only October 20 theme: history, celebration activities, and Vietnamese women's achievements.
 */
export const QUESTIONS_PER_ROUND = 10;
export const questionBank: Question[] = [
  createQuestion({
    id: "oct20-001",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "October 20: Origins",
    question: "On which date is Vietnamese Women's Day celebrated?",
    options: {
      A: "October 20",
      B: "March 8",
      C: "November 20",
      D: "October 1",
    },
    correctAnswer: 'A',
    explanation: "Vietnamese Women's Day is marked every year on October 20.",
    sourceUrl: "https://www.hoilhpn.org.vn/tin-chi-tiet/-/chi-tiet/hoi-lhpn-viet-nam-80-nam-mot-chang-%C4%91uong-20-10-1930-20-10-2010--14712-2.html",
  }),
  createQuestion({
    id: "oct20-002",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "October 20: Origins",
    question: "Which month is Vietnamese Women's Day in?",
    options: {
      A: "October",
      B: "March",
      C: "August",
      D: "December",
    },
    correctAnswer: 'A',
    explanation: "October 20 is the day celebrated in Vietnam.",
    sourceUrl: "https://www.hoilhpn.org.vn/tin-chi-tiet/-/chi-tiet/hoi-lhpn-viet-nam-80-nam-mot-chang-%C4%91uong-20-10-1930-20-10-2010--14712-2.html",
  }),
  createQuestion({
    id: "oct20-003",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "October 20: Origins",
    question: "What is the English name for the celebration on October 20?",
    options: {
      A: "Vietnamese Women's Day",
      B: "Vietnamese Teachers' Day",
      C: "Vietnamese Children's Day",
      D: "National Independence Day",
    },
    correctAnswer: 'A',
    explanation: "October 20 is known in English as Vietnamese Women's Day.",
    sourceUrl: "https://www.hoilhpn.org.vn/tin-chi-tiet/-/chi-tiet/hoi-lhpn-viet-nam-80-nam-mot-chang-%C4%91uong-20-10-1930-20-10-2010--14712-2.html",
  }),
  createQuestion({
    id: "oct20-004",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "October 20: Origins",
    question: "Who is celebrated on Vietnamese Women's Day?",
    options: {
      A: "Vietnamese women and their contributions",
      B: "Only famous singers",
      C: "Only sports teams",
      D: "Only foreign visitors",
    },
    correctAnswer: 'A',
    explanation: "The day recognizes the contributions of women across Vietnamese society.",
    sourceUrl: "https://www.hoilhpn.org.vn/tin-chi-tiet/-/chi-tiet/hoi-lhpn-viet-nam-80-nam-mot-chang-%C4%91uong-20-10-1930-20-10-2010--14712-2.html",
  }),
  createQuestion({
    id: "oct20-005",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "October 20: Origins",
    question: "Which organization is closely linked to October 20?",
    options: {
      A: "The Vietnam Women's Union",
      B: "The Olympic Committee",
      C: "The Football Federation",
      D: "The World Bank",
    },
    correctAnswer: 'A',
    explanation: "October 20 is the recognized founding date of the Vietnam Women's Union.",
    sourceUrl: "https://www.hoilhpn.org.vn/tin-chi-tiet/-/chi-tiet/hoi-lhpn-viet-nam-80-nam-mot-chang-%C4%91uong-20-10-1930-20-10-2010--14712-2.html",
  }),
  createQuestion({
    id: "oct20-006",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "October 20: Origins",
    question: "What is one main purpose of the October 20 celebration?",
    options: {
      A: "To honor Vietnamese women",
      B: "To announce school holidays",
      C: "To celebrate a football final",
      D: "To hold a national election",
    },
    correctAnswer: 'A',
    explanation: "The celebration recognizes women's roles and achievements in Vietnam.",
    sourceUrl: "https://www.hoilhpn.org.vn/web/guest/tin-chi-tiet/-/chi-tiet/7-hoat-%C4%91ong-trong-tam-chao-mung-96-nam-thanh-lap-hoi-lhpn-viet-nam-va-ngay-phu-nu-viet-nam-999501-2.html",
  }),
  createQuestion({
    id: "oct20-007",
    type: "multiple-choice",
    difficulty: "standard",
    category: "October 20: Origins",
    question: "Which year is recognized as the founding year of the Vietnam Women's Union?",
    options: {
      A: "1930",
      B: "1946",
      C: "1976",
      D: "2000",
    },
    correctAnswer: 'A',
    explanation: "The Vietnam Women's Union marks October 20, 1930 as its founding date.",
    sourceUrl: "https://www.hoilhpn.org.vn/tin-chi-tiet/-/chi-tiet/hoi-lhpn-viet-nam-80-nam-mot-chang-%C4%91uong-20-10-1930-20-10-2010--14712-2.html",
  }),
  createQuestion({
    id: "oct20-008",
    type: "multiple-choice",
    difficulty: "standard",
    category: "October 20: Origins",
    question: "The Vietnam Women's Union began using its current name in which year?",
    options: {
      A: "1946",
      B: "1930",
      C: "1954",
      D: "1995",
    },
    correctAnswer: 'A',
    explanation: "The Union was established under its current name on October 20, 1946.",
    sourceUrl: "https://www.hoilhpn.org.vn/web/guest/tin-chi-tiet/-/chi-tiet/hoi-lhpn-viet-nam-cac-dau-moc-lich-su-32291-3301.html",
  }),
  createQuestion({
    id: "oct20-009",
    type: "multiple-choice",
    difficulty: "standard",
    category: "October 20: Origins",
    question: "Where was the Vietnam Women's Union publicly launched in 1946?",
    options: {
      A: "Hanoi Opera House Square",
      B: "Ben Thanh Market",
      C: "Hue Imperial City",
      D: "Da Lat Flower Garden",
    },
    correctAnswer: 'A',
    explanation: "The Union held its public launch at Hanoi Opera House Square on October 20, 1946.",
    sourceUrl: "https://www.hoilhpn.org.vn/web/guest/tin-chi-tiet/-/chi-tiet/hoi-lhpn-viet-nam-cac-dau-moc-lich-su-32291-3301.html",
  }),
  createQuestion({
    id: "oct20-010",
    type: "multiple-choice",
    difficulty: "standard",
    category: "October 20: Origins",
    question: "Who became the first chairwoman of the Vietnam Women's Union in 1946?",
    options: {
      A: "Le Thi Xuyen",
      B: "Nguyen Thi Dinh",
      C: "Dang Thuy Tram",
      D: "Vo Thi Sau",
    },
    correctAnswer: 'A',
    explanation: "Le Thi Xuyen was selected as the Union's first chairwoman.",
    sourceUrl: "https://www.hoilhpn.org.vn/tin-chi-tiet/-/chi-tiet/hoi-lhpn-viet-nam-80-nam-mot-chang-%C4%91uong-20-10-1930-20-10-2010--14712-2.html",
  }),
  createQuestion({
    id: "oct20-011",
    type: "multiple-choice",
    difficulty: "standard",
    category: "October 20: Origins",
    question: "Which year did the national women's organizations formally recognize October 20, 1930 as the founding date?",
    options: {
      A: "1976",
      B: "1950",
      C: "1987",
      D: "2013",
    },
    correctAnswer: 'A',
    explanation: "A 1976 unification conference established the date as the Union's founding day.",
    sourceUrl: "https://www.hoilhpn.org.vn/tin-chi-tiet/-/chi-tiet/hoi-lhpn-viet-nam-80-nam-mot-chang-%C4%91uong-20-10-1930-20-10-2010--14712-2.html",
  }),
  createQuestion({
    id: "oct20-012",
    type: "multiple-choice",
    difficulty: "standard",
    category: "October 20: Origins",
    question: "Why does October 20 have a special place in the Vietnam Women's Union's history?",
    options: {
      A: "It marks the organization's recognized founding date",
      B: "It marks Vietnam's Independence Day",
      C: "It is the opening day of the National Assembly",
      D: "It is the country's New Year's Day",
    },
    correctAnswer: 'A',
    explanation: "October 20 is linked to the origins and development of organized Vietnamese women's movements.",
    sourceUrl: "https://www.hoilhpn.org.vn/tin-chi-tiet/-/chi-tiet/hoi-lhpn-viet-nam-80-nam-mot-chang-%C4%91uong-20-10-1930-20-10-2010--14712-2.html",
  }),
  createQuestion({
    id: "oct20-013",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "October 20: Activities",
    question: "Which small gift is often used to celebrate October 20?",
    options: {
      A: "A bouquet of flowers",
      B: "A train ticket",
      C: "A parking fine",
      D: "A passport",
    },
    correctAnswer: 'A',
    explanation: "Flowers are a popular, thoughtful way to show appreciation on the day.",
    sourceUrl: "https://www.hoilhpn.org.vn/web/guest/tin-chi-tiet/-/chi-tiet/%C4%91ang-uy-tw-hoi-lhpn-viet-nam-to-chuc-sinh-hoat-chuyen-%C4%91e-nhung-sac-mau-hanh-phuc-ky-niem-95-nam-thanh-lap-hoi-681701-7.html",
  }),
  createQuestion({
    id: "oct20-014",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "October 20: Activities",
    question: "What can English Club members write for October 20?",
    options: {
      A: "A thank-you card",
      B: "An exam warning",
      C: "A complaint about teammates",
      D: "An unrelated invoice",
    },
    correctAnswer: 'A',
    explanation: "A personal thank-you card can recognize someone's support on Vietnamese Women's Day.",
  }),
  createQuestion({
    id: "oct20-015",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "October 20: Activities",
    question: "Which school activity fits an October 20 celebration?",
    options: {
      A: "A flower-arranging contest",
      B: "A random tax inspection",
      C: "A surprise fire drill",
      D: "A compulsory test",
    },
    correctAnswer: 'A',
    explanation: "Flower-arranging contests are among activities organized for October 20.",
    sourceUrl: "https://www.hoilhpn.org.vn/web/guest/tin-chi-tiet/-/chi-tiet/%C4%91ang-uy-tw-hoi-lhpn-viet-nam-to-chuc-sinh-hoat-chuyen-%C4%91e-nhung-sac-mau-hanh-phuc-ky-niem-95-nam-thanh-lap-hoi-681701-7.html",
  }),
  createQuestion({
    id: "oct20-016",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "October 20: Activities",
    question: "What might an English Club perform at an October 20 party?",
    options: {
      A: "Songs celebrating women",
      B: "A weather emergency alert",
      C: "A road construction notice",
      D: "A bank advertisement",
    },
    correctAnswer: 'A',
    explanation: "Songs and cultural performances help make a celebration lively.",
    sourceUrl: "https://www.hoilhpn.org.vn/web/guest/tin-chi-tiet/-/chi-tiet/7-hoat-%C4%91ong-trong-tam-chao-mung-96-nam-thanh-lap-hoi-lhpn-viet-nam-va-ngay-phu-nu-viet-nam-999501-2.html",
  }),
  createQuestion({
    id: "oct20-017",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "October 20: Activities",
    question: "Which message belongs on an October 20 poster?",
    options: {
      A: "Thank you for inspiring us!",
      B: "No one deserves appreciation.",
      C: "You are not welcome here.",
      D: "Only famous people matter.",
    },
    correctAnswer: 'A',
    explanation: "A respectful message celebrating women suits the day.",
  }),
  createQuestion({
    id: "oct20-018",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "October 20: Activities",
    question: "What can club members create to honor women in their community?",
    options: {
      A: "An appreciation wall",
      B: "A list of punishments",
      C: "A fake news story",
      D: "A locked notice board",
    },
    correctAnswer: 'A',
    explanation: "An appreciation wall can display sincere messages of gratitude.",
  }),
  createQuestion({
    id: "oct20-019",
    type: "multiple-choice",
    difficulty: "standard",
    category: "October 20: Activities",
    question: "Which activity lets members learn about inspiring Vietnamese women on October 20?",
    options: {
      A: "Sharing short stories about their achievements",
      B: "Memorizing random passwords",
      C: "Reading only sports scores",
      D: "Skipping the event",
    },
    correctAnswer: 'A',
    explanation: "A short storytelling session connects celebration to historical and everyday role models.",
    sourceUrl: "https://www.hoilhpn.org.vn/web/guest/tin-chi-tiet/-/chi-tiet/7-hoat-%C4%91ong-trong-tam-chao-mung-96-nam-thanh-lap-hoi-lhpn-viet-nam-va-ngay-phu-nu-viet-nam-999501-2.html",
  }),
  createQuestion({
    id: "oct20-020",
    type: "multiple-choice",
    difficulty: "standard",
    category: "October 20: Activities",
    question: "What can an October 20 recognition ceremony celebrate?",
    options: {
      A: "Women's achievements and contributions",
      B: "Who owns the newest phone",
      C: "Who spends the most money",
      D: "Who has the loudest ringtone",
    },
    correctAnswer: 'A',
    explanation: "Award ceremonies can recognize contributions by women across different fields.",
    sourceUrl: "https://www.hoilhpn.org.vn/web/guest/tin-chi-tiet/-/chi-tiet/chuoi-cac-hoat-%C4%91ong-ky-niem-96-nam-thanh-lap-hoi-lhpn-viet-nam-va-ngay-phu-nu-viet-nam-20-10-999701-403.html",
  }),
  createQuestion({
    id: "oct20-021",
    type: "multiple-choice",
    difficulty: "standard",
    category: "October 20: Activities",
    question: "Which activity can support women and children during an October 20 event?",
    options: {
      A: "A charity donation drive",
      B: "A contest to waste food",
      C: "A game of ignoring others",
      D: "A competition to spread rumors",
    },
    correctAnswer: 'A',
    explanation: "Charity activities can combine celebration with practical support for women and children.",
    sourceUrl: "https://www.hoilhpn.org.vn/web/guest/tin-chi-tiet/-/chi-tiet/7-hoat-%C4%91ong-trong-tam-chao-mung-96-nam-thanh-lap-hoi-lhpn-viet-nam-va-ngay-phu-nu-viet-nam-999501-2.html",
  }),
  createQuestion({
    id: "oct20-022",
    type: "multiple-choice",
    difficulty: "standard",
    category: "October 20: Activities",
    question: "Which October 20 activity can highlight women in science, education, and art?",
    options: {
      A: "A photo and story exhibition",
      B: "An unrelated product price list",
      C: "A parking schedule",
      D: "A blank notice board",
    },
    correctAnswer: 'A',
    explanation: "Exhibitions help visitors discover the contributions of women in many fields.",
    sourceUrl: "https://baotangphunu.org.vn/en/about/",
  }),
  createQuestion({
    id: "oct20-023",
    type: "multiple-choice",
    difficulty: "standard",
    category: "October 20: Activities",
    question: "What is a meaningful way to open a club's October 20 celebration?",
    options: {
      A: "Thank female guests and explain the day's meaning",
      B: "Tell guests to remain silent all day",
      C: "Ignore the people being honored",
      D: "Read an unrelated phone manual",
    },
    correctAnswer: 'A',
    explanation: "A friendly introduction should welcome guests and explain the celebration.",
    sourceUrl: "https://www.hoilhpn.org.vn/web/guest/tin-chi-tiet/-/chi-tiet/7-hoat-%C4%91ong-trong-tam-chao-mung-96-nam-thanh-lap-hoi-lhpn-viet-nam-va-ngay-phu-nu-viet-nam-999501-2.html",
  }),
  createQuestion({
    id: "oct20-024",
    type: "multiple-choice",
    difficulty: "standard",
    category: "October 20: Activities",
    question: "Which activity encourages everyone to appreciate women beyond giving presents?",
    options: {
      A: "A group discussion about women's contributions",
      B: "Comparing the prices of gifts only",
      C: "Ranking people by appearance",
      D: "Excluding quiet members",
    },
    correctAnswer: 'A',
    explanation: "A short discussion can recognize achievements and the value of respect.",
    sourceUrl: "https://www.hoilhpn.org.vn/web/guest/tin-chi-tiet/-/chi-tiet/7-hoat-%C4%91ong-trong-tam-chao-mung-96-nam-thanh-lap-hoi-lhpn-viet-nam-va-ngay-phu-nu-viet-nam-999501-2.html",
  }),
  createQuestion({
    id: "oct20-025",
    type: "multiple-choice",
    difficulty: "challenge",
    category: "October 20: Activities",
    question: "The club has a small October 20 budget. Which plan is most thoughtful?",
    options: {
      A: "Make handmade cards and share personal messages",
      B: "Cancel every chance to say thanks",
      C: "Borrow money for luxury gifts",
      D: "Copy the same rude joke to everyone",
    },
    correctAnswer: 'A',
    explanation: "Creativity and sincere appreciation matter more than expensive gifts.",
  }),
  createQuestion({
    id: "oct20-026",
    type: "multiple-choice",
    difficulty: "challenge",
    category: "October 20: Activities",
    question: "A member feels left out during the October 20 event. What should the team do?",
    options: {
      A: "Invite them to join an activity they feel comfortable with",
      B: "Laugh at them",
      C: "Force them to perform alone",
      D: "Ignore their concerns",
    },
    correctAnswer: 'A',
    explanation: "An inclusive celebration makes everyone feel respected.",
  }),
  createQuestion({
    id: "oct20-027",
    type: "multiple-choice",
    difficulty: "challenge",
    category: "October 20: Activities",
    question: "Your team wants to post October 20 photos online. What should it do first?",
    options: {
      A: "Ask for permission from people in the photos",
      B: "Post private pictures without asking",
      C: "Share everyone's phone numbers",
      D: "Tag strangers as participants",
    },
    correctAnswer: 'A',
    explanation: "Respecting consent and privacy is a thoughtful part of any event.",
  }),
  createQuestion({
    id: "oct20-028",
    type: "multiple-choice",
    difficulty: "challenge",
    category: "October 20: Activities",
    question: "For an October 20 tribute speech, which approach is most respectful?",
    options: {
      A: "Celebrate women's achievements in different roles",
      B: "Say women can do only housework",
      C: "Judge people only by appearance",
      D: "Tell women not to pursue careers",
    },
    correctAnswer: 'A',
    explanation: "A good tribute recognizes women in families, workplaces, education, and public life.",
    sourceUrl: "https://www.hoilhpn.org.vn/web/guest/tin-chi-tiet/-/chi-tiet/7-hoat-%C4%91ong-trong-tam-chao-mung-96-nam-thanh-lap-hoi-lhpn-viet-nam-va-ngay-phu-nu-viet-nam-999501-2.html",
  }),
  createQuestion({
    id: "oct20-029",
    type: "multiple-choice",
    difficulty: "challenge",
    category: "October 20: Activities",
    question: "A classmate wants to thank her teacher on October 20. Which action is best?",
    options: {
      A: "Write a sincere note about how the teacher helped",
      B: "Demand an expensive reward",
      C: "Share a private story without permission",
      D: "Make fun of the teacher's work",
    },
    correctAnswer: 'A',
    explanation: "Personal appreciation is appropriate without requiring costly gifts.",
  }),
  createQuestion({
    id: "oct20-030",
    type: "multiple-choice",
    difficulty: "challenge",
    category: "October 20: Activities",
    question: "The MC asks what an October 20 celebration should achieve. What is the best answer?",
    options: {
      A: "Appreciation, connection, and respect for Vietnamese women",
      B: "Expensive presents for every guest",
      C: "The same hobbies for every woman",
      D: "A competition about looks only",
    },
    correctAnswer: 'A',
    explanation: "The spirit of the celebration is respect, recognition and positive community connections.",
    sourceUrl: "https://www.hoilhpn.org.vn/web/guest/tin-chi-tiet/-/chi-tiet/7-hoat-%C4%91ong-trong-tam-chao-mung-96-nam-thanh-lap-hoi-lhpn-viet-nam-va-ngay-phu-nu-viet-nam-999501-2.html",
  }),
  createQuestion({
    id: "oct20-031",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "Vietnamese Women",
    question: "Which two sisters led a famous uprising in Vietnam?",
    options: {
      A: "Trung Trac and Trung Nhi",
      B: "Marie Curie and Ada Lovelace",
      C: "Queen Victoria and Elizabeth II",
      D: "Venus and Serena Williams",
    },
    correctAnswer: 'A',
    explanation: "The Trung Sisters led an uprising against Eastern Han rule in 40 CE.",
    sourceUrl: "https://baotanglichsu.vn/VI/Articles/3098/13485/cuoc-khoi-nghia-hai-ba-trung-nam-40-43-sau-cong-nguyen.html",
  }),
  createQuestion({
    id: "oct20-032",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "Vietnamese Women",
    question: "Which Vietnamese heroine is widely known as Lady Trieu?",
    options: {
      A: "Trieu Thi Trinh",
      B: "Nguyen Thi Binh",
      C: "Le Thi Xuyen",
      D: "Dang Thuy Tram",
    },
    correctAnswer: 'A',
    explanation: "Lady Trieu (Trieu Thi Trinh) led resistance against Wu rule in 248 CE.",
    sourceUrl: "https://baotanglichsu.vn/vi/Articles/3098/14281/cuoc-khoi-nghia-cua-trieu-thitrinh.html",
  }),
  createQuestion({
    id: "oct20-033",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "Vietnamese Women",
    question: "Which Vietnamese woman is associated with the 'Long-Haired Army' in Ben Tre?",
    options: {
      A: "Nguyen Thi Dinh",
      B: "Ho Xuan Huong",
      C: "Le Thi Xuyen",
      D: "Xuan Quynh",
    },
    correctAnswer: 'A',
    explanation: "Nguyen Thi Dinh was an important leader connected with Ben Tre's Long-Haired Army movement.",
    sourceUrl: "https://www.hoilhpn.org.vn/web/guest/tin-chi-tiet/-/chi-tiet/nu-tuong-nguyen-thi-%C4%91inh-linh-hon-cua-phong-trao-%C4%91ong-khoi-32687-1801.html",
  }),
  createQuestion({
    id: "oct20-034",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "Vietnamese Women",
    question: "Who was the first chairwoman of the Vietnam Women's Union?",
    options: {
      A: "Le Thi Xuyen",
      B: "Vo Thi Sau",
      C: "Ba Trieu",
      D: "Nguyen Thi Binh",
    },
    correctAnswer: 'A',
    explanation: "Le Thi Xuyen became the Union's first chairwoman in 1946.",
    sourceUrl: "https://www.hoilhpn.org.vn/tin-chi-tiet/-/chi-tiet/hoi-lhpn-viet-nam-80-nam-mot-chang-%C4%91uong-20-10-1930-20-10-2010--14712-2.html",
  }),
  createQuestion({
    id: "oct20-035",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "Vietnamese Women",
    question: "Which Vietnamese wartime doctor wrote a well-known diary?",
    options: {
      A: "Dang Thuy Tram",
      B: "Trung Nhi",
      C: "Ly Chieu Hoang",
      D: "Ho Xuan Huong",
    },
    correctAnswer: 'A',
    explanation: "Dr. Dang Thuy Tram's diary tells of her life and service during wartime.",
    sourceUrl: "https://www.hoilhpn.org.vn/web/guest/tin-chi-tiet/-/chi-tiet/tu-cuon-nhat-ky-cua-mot-nguoi-con-gai-ha-noi-6693-1.html",
  }),
  createQuestion({
    id: "oct20-036",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "Vietnamese Women",
    question: "Which young Vietnamese heroine is linked to Dat Do and Con Dao?",
    options: {
      A: "Vo Thi Sau",
      B: "Nguyen Thi Dinh",
      C: "Le Thi Xuyen",
      D: "Ba Huyen Thanh Quan",
    },
    correctAnswer: 'A',
    explanation: "Vo Thi Sau was a young revolutionary from Dat Do, remembered for her courage.",
    sourceUrl: "https://www.hoilhpn.org.vn/en/tin-chi-tiet/-/chi-tiet/vo-thi-sau-9297-101.html",
  }),
  createQuestion({
    id: "oct20-037",
    type: "multiple-choice",
    difficulty: "standard",
    category: "Vietnamese Women",
    question: "Who was the older sister among the Trung Sisters?",
    options: {
      A: "Trung Trac",
      B: "Trung Nhi",
      C: "Ba Trieu",
      D: "Nguyen Thi Minh Khai",
    },
    correctAnswer: 'A',
    explanation: "Trung Trac is remembered as the older sister of Trung Nhi.",
    sourceUrl: "https://baotanglichsu.vn/VI/Articles/3098/13485/cuoc-khoi-nghia-hai-ba-trung-nam-40-43-sau-cong-nguyen.html",
  }),
  createQuestion({
    id: "oct20-038",
    type: "multiple-choice",
    difficulty: "standard",
    category: "Vietnamese Women",
    question: "In which year did Lady Trieu lead her famous uprising?",
    options: {
      A: "248 CE",
      B: "40 CE",
      C: "938 CE",
      D: "1946",
    },
    correctAnswer: 'A',
    explanation: "Lady Trieu's uprising against Eastern Wu rule began in 248 CE.",
    sourceUrl: "https://baotanglichsu.vn/vi/Articles/3098/14281/cuoc-khoi-nghia-cua-trieu-thitrinh.html",
  }),
  createQuestion({
    id: "oct20-039",
    type: "multiple-choice",
    difficulty: "standard",
    category: "Vietnamese Women",
    question: "Which Vietnamese woman is remembered for her role in the 1973 Paris Peace Agreement?",
    options: {
      A: "Nguyen Thi Binh",
      B: "Xuan Quynh",
      C: "Le Thi Xuyen",
      D: "Vo Thi Sau",
    },
    correctAnswer: 'A',
    explanation: "Nguyen Thi Binh represented the Provisional Revolutionary Government at the Paris negotiations.",
    sourceUrl: "https://hoilhpn.org.vn/tin-chi-tiet/-/chi-tiet/-su-gia-hoa-binh-tren-ban-%C4%91am-phan-hiep-%C4%91inh-paris-53309-1801.html",
  }),
  createQuestion({
    id: "oct20-040",
    type: "multiple-choice",
    difficulty: "standard",
    category: "Vietnamese Women",
    question: "Which Vietnamese leader helped found the Vietnamese Women's Museum?",
    options: {
      A: "Nguyen Thi Dinh",
      B: "Trung Nhi",
      C: "Ho Xuan Huong",
      D: "Nguyen Thi Binh",
    },
    correctAnswer: 'A',
    explanation: "Nguyen Thi Dinh helped establish the Vietnamese Women's Museum, which was founded in 1987.",
    sourceUrl: "https://baotangphunu.org.vn/en/about/",
  }),
  createQuestion({
    id: "oct20-041",
    type: "multiple-choice",
    difficulty: "standard",
    category: "Vietnamese Women",
    question: "Which Vietnamese poet is called the 'Queen of Nom Poetry'?",
    options: {
      A: "Ho Xuan Huong",
      B: "Vo Thi Sau",
      C: "Dang Thuy Tram",
      D: "Nguyen Thi Dinh",
    },
    correctAnswer: 'A',
    explanation: "Ho Xuan Huong is celebrated for her distinctive poetry in the Nom script.",
    sourceUrl: "https://hoilhpn.org.vn/tin-chi-tiet/-/chi-tiet/ho-xuan-huong-ba-chua-tho-nom-cuoi-the-ky-xviii-%C4%91au-the-ky-xix--123-4529.html",
  }),
  createQuestion({
    id: "oct20-042",
    type: "multiple-choice",
    difficulty: "standard",
    category: "Vietnamese Women",
    question: "Which ruler is often described as Vietnam's only female monarch?",
    options: {
      A: "Ly Chieu Hoang",
      B: "Le Thi Xuyen",
      C: "Nguyen Thi Dinh",
      D: "Ba Trieu",
    },
    correctAnswer: 'A',
    explanation: "Ly Chieu Hoang is often described as Vietnam's only female monarch in its dynastic history.",
    sourceUrl: "https://www.hoilhpn.org.vn/CmsView-EcoIT-portlet/html/print_cms.jsp?articleId=6277",
  }),
  createQuestion({
    id: "oct20-043",
    type: "image-choice",
    difficulty: "warm-up",
    category: "October 20: Picture Quiz",
    question: "In this October 20 picture, what gift is being prepared?",
    options: {
      A: "A flower bouquet",
      B: "A school bus",
      C: "A bicycle helmet",
      D: "A football trophy",
    },
    correctAnswer: 'A',
    explanation: "A flower bouquet is a traditional way to express thanks on October 20.",
    image: "/questions/october20/bouquet.svg",
    imageCredit: "Original October 20 celebration illustration",
  }),
  createQuestion({
    id: "oct20-044",
    type: "image-choice",
    difficulty: "warm-up",
    category: "October 20: Picture Quiz",
    question: "Which October 20 activity is shown in this picture?",
    options: {
      A: "Writing a greeting card",
      B: "Fixing a bicycle",
      C: "Cooking a restaurant meal",
      D: "Taking a math exam",
    },
    correctAnswer: 'A',
    explanation: "A personal greeting card is a thoughtful October 20 message.",
    image: "/questions/october20/greeting-card.svg",
    imageCredit: "Original October 20 celebration illustration",
  }),
  createQuestion({
    id: "oct20-045",
    type: "image-choice",
    difficulty: "warm-up",
    category: "October 20: Picture Quiz",
    question: "Which activity could the English Club perform on October 20?",
    options: {
      A: "A musical performance",
      B: "A traffic inspection",
      C: "A bank audit",
      D: "A laboratory evacuation",
    },
    correctAnswer: 'A',
    explanation: "Music and performances can add energy to a Women's Day event.",
    image: "/questions/october20/singing.svg",
    imageCredit: "Original October 20 celebration illustration",
  }),
  createQuestion({
    id: "oct20-046",
    type: "image-choice",
    difficulty: "warm-up",
    category: "October 20: Picture Quiz",
    question: "What could this October 20 display celebrate?",
    options: {
      A: "Photos of inspiring Vietnamese women",
      B: "Classroom parking rules",
      C: "An empty timetable",
      D: "Unrelated shopping prices",
    },
    correctAnswer: 'A',
    explanation: "A photo wall can honor women whose work made a difference.",
    image: "/questions/october20/photo-wall.svg",
    imageCredit: "Original October 20 celebration illustration",
  }),
  createQuestion({
    id: "oct20-047",
    type: "image-choice",
    difficulty: "warm-up",
    category: "October 20: Picture Quiz",
    question: "What part of an October 20 event is shown?",
    options: {
      A: "An award ceremony",
      B: "A sports injury",
      C: "A rainy weather forecast",
      D: "A bus repair",
    },
    correctAnswer: 'A',
    explanation: "A recognition ceremony celebrates women's contributions and achievements.",
    image: "/questions/october20/award.svg",
    imageCredit: "Original October 20 celebration illustration",
  }),
  createQuestion({
    id: "oct20-048",
    type: "image-choice",
    difficulty: "warm-up",
    category: "October 20: Picture Quiz",
    question: "What is happening at this October 20 podium?",
    options: {
      A: "A thank-you speech",
      B: "A driving lesson",
      C: "A cooking test",
      D: "A swimming competition",
    },
    correctAnswer: 'A',
    explanation: "A thank-you speech can open or close a meaningful event.",
    image: "/questions/october20/speech.svg",
    imageCredit: "Original October 20 celebration illustration",
  }),
  createQuestion({
    id: "oct20-049",
    type: "image-choice",
    difficulty: "standard",
    category: "October 20: Picture Quiz",
    question: "Which October 20 activity does this picture suggest?",
    options: {
      A: "Sharing stories about women heroes",
      B: "Reading a parking ticket",
      C: "Announcing a football transfer",
      D: "Checking train fares",
    },
    correctAnswer: 'A',
    explanation: "Storytelling helps students discover inspiring figures from Vietnamese history.",
    image: "/questions/october20/storytelling.svg",
    imageCredit: "Original October 20 celebration illustration",
  }),
  createQuestion({
    id: "oct20-050",
    type: "image-choice",
    difficulty: "standard",
    category: "October 20: Picture Quiz",
    question: "What kind of October 20 activity is suggested?",
    options: {
      A: "A charity donation drive",
      B: "Throwing away useful supplies",
      C: "A commercial loan meeting",
      D: "Selling parking tickets",
    },
    correctAnswer: 'A',
    explanation: "Supporting people in need can give a celebration lasting value.",
    image: "/questions/october20/charity.svg",
    imageCredit: "Original October 20 celebration illustration",
  }),
  createQuestion({
    id: "oct20-051",
    type: "image-choice",
    difficulty: "standard",
    category: "October 20: Picture Quiz",
    question: "Which popular October 20 contest is suggested?",
    options: {
      A: "Flower arranging",
      B: "Car racing",
      C: "Mountain climbing",
      D: "Chess boxing",
    },
    correctAnswer: 'A',
    explanation: "Flower-arranging contests appear in women's celebration activities.",
    sourceUrl: "https://www.hoilhpn.org.vn/web/guest/tin-chi-tiet/-/chi-tiet/%C4%91ang-uy-tw-hoi-lhpn-viet-nam-to-chuc-sinh-hoat-chuyen-%C4%91e-nhung-sac-mau-hanh-phuc-ky-niem-95-nam-thanh-lap-hoi-681701-7.html",
    image: "/questions/october20/flower-art.svg",
    imageCredit: "Original October 20 celebration illustration",
  }),
  createQuestion({
    id: "oct20-052",
    type: "image-choice",
    difficulty: "standard",
    category: "October 20: Picture Quiz",
    question: "Which October 20 memory-making activity is shown?",
    options: {
      A: "Taking a group photo",
      B: "Repairing a computer",
      C: "Studying an earthquake map",
      D: "Fixing a street lamp",
    },
    correctAnswer: 'A',
    explanation: "A group photo can capture a club's Women's Day celebration.",
    image: "/questions/october20/group-photo.svg",
    imageCredit: "Original October 20 celebration illustration",
  }),
  createQuestion({
    id: "oct20-053",
    type: "image-choice",
    difficulty: "standard",
    category: "October 20: Picture Quiz",
    question: "Where could a club learn more about women's lives and achievements?",
    options: {
      A: "The Vietnamese Women's Museum",
      B: "A parking garage",
      C: "An airport cargo desk",
      D: "A sports equipment store",
    },
    correctAnswer: 'A',
    explanation: "The Vietnamese Women's Museum presents Vietnamese women's history, culture, and contributions.",
    sourceUrl: "https://baotangphunu.org.vn/en/about/",
    image: "/questions/october20/museum.svg",
    imageCredit: "Original October 20 celebration illustration",
  }),
  createQuestion({
    id: "oct20-054",
    type: "image-choice",
    difficulty: "standard",
    category: "October 20: Picture Quiz",
    question: "What can the club record as an October 20 surprise?",
    options: {
      A: "A thank-you video",
      B: "An unrelated commercial",
      C: "A traffic violation",
      D: "A phone sales contract",
    },
    correctAnswer: 'A',
    explanation: "A short appreciation video can include messages for teachers, mothers and female club members.",
    image: "/questions/october20/video-message.svg",
    imageCredit: "Original October 20 celebration illustration",
  })
];

/**
 * Backward compatibility alias.
 */
export const QUIZ_QUESTIONS = questionBank;

// ==========================================
// Question Bank Helpers & Utilities
// ==========================================

/**
 * Check if a selected option key matches the question's correct answer.
 */
export function isCorrectAnswer(question: Question, selectedKey: OptionKey | null): boolean {
  if (!selectedKey) return false;
  return question.correctAnswer === selectedKey;
}

/**
 * Retrieve a question by its unique identifier.
 */
export function getQuestionById(bank: Question[], id: number | string): Question | undefined {
  return bank.find((q) => q.id === id);
}

/**
 * Find an option object inside a question by its option key ('A' | 'B' | 'C' | 'D').
 */
export function getOptionByKey(question: Question, key: OptionKey): QuestionOption | undefined {
  return question.options.find((opt) => opt.key === key);
}

/**
 * Reorder questions based on an array of question IDs.
 * Missing IDs are appended to the end preserving original order.
 */
export function reorderQuestions(bank: Question[], newIdOrder: (number | string)[]): Question[] {
  const map = new Map<number | string, Question>(bank.map((q) => [q.id, q]));
  const reordered: Question[] = [];

  for (const id of newIdOrder) {
    const item = map.get(id);
    if (item) {
      reordered.push(item);
      map.delete(id);
    }
  }

  // Append remaining questions
  for (const remaining of map.values()) {
    reordered.push(remaining);
  }

  return reordered;
}

/**
 * Return a randomly shuffled copy of the question bank.
 */
export function shuffleQuestions(bank: Question[]): Question[] {
  const copy = [...bank];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Filter questions by question type.
 */
export function filterQuestionsByType(bank: Question[], type: QuestionType): Question[] {
  return bank.filter((q) => q.type === type);
}


/**
 * Randomize option order while preserving the correct answer.
 * This prevents players from memorizing answer positions between rounds.
 */
export function shuffleQuestionOptions(question: Question): Question {
  const shuffled = [...question.options];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const optionKeys: OptionKey[] = ['A', 'B', 'C', 'D'];
  let correctAnswer: OptionKey = 'A';

  const options = shuffled.map((option, index) => {
    const key = optionKeys[index];
    if (option.key === question.correctAnswer) {
      correctAnswer = key;
    }
    return { key, text: option.text };
  });

  return {
    ...question,
    options,
    correctAnswer,
  };
}

/**
 * Build a balanced round from a larger question bank.
 * Questions are distributed across categories before the final shuffle.
 */
/**
 * Each round of ten has 3 historical/date facts, 3 celebration activities,
 * 2 notable Vietnamese women, and 2 original celebration images.
 * The mix is intentionally accessible: five warm-ups, four standard, one final challenge.
 */
export const ROUND_PLAN = [
  { category: 'October 20: Origins', difficulty: 'warm-up', count: 2 },
  { category: 'October 20: Origins', difficulty: 'standard', count: 1 },
  { category: 'October 20: Activities', difficulty: 'warm-up', count: 1 },
  { category: 'October 20: Activities', difficulty: 'standard', count: 1 },
  { category: 'October 20: Activities', difficulty: 'challenge', count: 1 },
  { category: 'Vietnamese Women', difficulty: 'warm-up', count: 1 },
  { category: 'Vietnamese Women', difficulty: 'standard', count: 1 },
  { category: 'October 20: Picture Quiz', difficulty: 'warm-up', count: 1 },
  { category: 'October 20: Picture Quiz', difficulty: 'standard', count: 1 },
] as const;

export function buildQuizRound(
  bank: Question[] = questionBank,
  count: number = QUESTIONS_PER_ROUND
): Question[] {
  const safeCount = Math.max(0, Math.min(Math.floor(count), bank.length));
  if (safeCount === 0) return [];

  const randomized = shuffleQuestions(bank);
  const selected: Question[] = [];
  const used = new Set<Question['id']>();

  const pick = (filter: (q: Question) => boolean, number: number) => {
    for (const q of randomized) {
      if (selected.length >= safeCount || number <= 0) break;
      if (!used.has(q.id) && filter(q)) {
        selected.push(q);
        used.add(q.id);
        number--;
      }
    }
  };

  if (safeCount === QUESTIONS_PER_ROUND) {
    for (const slot of ROUND_PLAN) {
      pick(
        (q) => q.category === slot.category && q.difficulty === slot.difficulty,
        slot.count
      );
    }
  } else {
    // Smaller custom sessions still distribute questions across topics.
    const categories = Array.from(new Set(randomized.map(q => q.category || 'Other')));
    while (selected.length < safeCount) {
      const before = selected.length;
      for (const category of categories) {
        pick(q => (q.category || 'Other') === category, 1);
        if (selected.length === safeCount) break;
      }
      if (selected.length === before) break;
    }
  }

  // If the data is incomplete, fill the remaining slots without duplicates.
  pick(() => true, safeCount - selected.length);

  // Visual variety even when a custom bank is supplied.
  if (!selected.some(q => q.image)) {
    const visual = randomized.find(q => q.image && !used.has(q.id));
    if (visual && selected.length > 0) {
      const sameCategory = selected.findIndex(q => q.category === visual.category);
      selected[sameCategory >= 0 ? sameCategory : selected.length - 1] = visual;
    }
  }

  // Keep questions unpredictable, but build confidence before the final challenge.
  // Each difficulty group is shuffled independently.
  const order = ['warm-up', 'standard', 'challenge'];
  const ordered = order.flatMap(level =>
    shuffleQuestions(selected.filter(q => q.difficulty === level))
  );
  const remaining = selected.filter(q => !q.difficulty);
  return [...ordered, ...shuffleQuestions(remaining)].map(shuffleQuestionOptions);
}
