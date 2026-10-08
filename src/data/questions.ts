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
  };
}

/**
 * Official Question Bank for Vietnamese Women's Day Quiz.
 * Content is normalized in English and expanded beyond the original 12-question source.
 */
export const QUESTIONS_PER_ROUND = 10;
export const questionBank: Question[] = [
  createQuestion({
    id: 1,
    type: "multiple-choice",
    question: "Which date is recognized as the founding date of the Vietnam Women's Union?",
    options: {
      A: "October 20, 1930",
      B: "October 20, 1946",
      C: "March 8, 1930",
      D: "September 2, 1945",
    },
    correctAnswer: "A",
    explanation: "The Vietnam Women's Union recognizes October 20, 1930 as its founding date.",
    category: "Vietnamese Women's Day",
  }),
  createQuestion({
    id: 2,
    type: "multiple-choice",
    question: "How many young female volunteers were killed at Dong Loc Junction on July 24, 1968?",
    options: {
      A: "8",
      B: "9",
      C: "10",
      D: "12",
    },
    correctAnswer: "C",
    explanation: "Ten young female volunteers of Squad 4 were killed while helping keep the strategic transport route open.",
    category: "History & Figures",
  }),
  createQuestion({
    id: 3,
    type: "multiple-choice",
    question: "Who is widely recognized as the only woman to rule as monarch in Vietnam's dynastic history?",
    options: {
      A: "Ly Chieu Hoang",
      B: "Queen Mother Y Lan",
      C: "Duong Van Nga",
      D: "Princess Ngoc Han",
    },
    correctAnswer: "A",
    explanation: "Ly Chieu Hoang of the Ly dynasty is widely recognized as the only female monarch in Vietnam's dynastic history.",
    category: "History & Figures",
  }),
  createQuestion({
    id: 4,
    type: "multiple-choice",
    question: "In which year did the Trung Sisters launch their uprising against Eastern Han rule?",
    options: {
      A: "40 CE",
      B: "248 CE",
      C: "544 CE",
      D: "938 CE",
    },
    correctAnswer: "A",
    explanation: "The Trung Sisters launched their uprising in 40 CE and briefly restored Vietnamese self-rule.",
    category: "History & Figures",
  }),
  createQuestion({
    id: 5,
    type: "multiple-choice",
    question: "Which set best represents the traditional 'four virtues' associated with Vietnamese women?",
    options: {
      A: "Diligence – Grace – Speech – Virtue",
      B: "Knowledge – Courage – Beauty – Wealth",
      C: "Loyalty – Strength – Fame – Talent",
      D: "Independence – Power – Rank – Fortune",
    },
    correctAnswer: "A",
    explanation: "The traditional four virtues emphasize skill in work, graceful conduct, appropriate speech, and moral character.",
    category: "Culture & Literature",
  }),
  createQuestion({
    id: 6,
    type: "image-choice",
    question: "This internationally recognized hand gesture is commonly used to signal what?",
    options: {
      A: "A person may be in danger and needs help",
      B: "A request to end a meeting",
      C: "A sports referee signal",
      D: "A greeting for a celebration",
    },
    correctAnswer: "A",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/70/Signal_for_Help_gestures_%28no_text%29.png",
    imageCredit: "Public-domain 'Signal for Help' illustration via Wikimedia Commons",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Signal_for_Help_gestures_(no_text).png",
    explanation: "The Signal for Help is a discreet one-handed gesture that can communicate that someone feels threatened and needs assistance.",
    category: "Equality & Safety",
  }),
  createQuestion({
    id: 7,
    type: "image-choice",
    question: "What type of activity is shown in this image?",
    options: {
      A: "Office work",
      B: "Housework",
      C: "Outdoor sport",
      D: "Classroom study",
    },
    correctAnswer: "B",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c4/House_cleaning.jpg",
    imageCredit: "Russell Lee / U.S. FSA, public domain, via Wikimedia Commons",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:House_cleaning.jpg",
    explanation: "Housework includes routine tasks such as cleaning, cooking, laundry, and maintaining a household.",
    category: "Equality & Safety",
  }),
  createQuestion({
    id: 8,
    type: "text-choice",
    question: "Which action best reflects the spirit of Vietnamese Women's Day?",
    options: {
      A: "Buying the most expensive gift possible",
      B: "Showing sincere appreciation and respect for women's everyday contributions",
      C: "Repeating gender stereotypes as jokes",
      D: "Forcing everyone to join a celebration",
    },
    correctAnswer: "B",
    explanation: "The day is best honored through respect, appreciation, and equal treatment rather than the price of a gift.",
    category: "Vietnamese Women's Day",
  }),
  createQuestion({
    id: 9,
    type: "multiple-choice",
    question: "In the famous eight-word tribute to Vietnamese women, which quality completes the English rendering 'Heroic, Indomitable, Loyal, ______'?",
    options: {
      A: "Resourceful",
      B: "Silent",
      C: "Obedient",
      D: "Wealthy",
    },
    correctAnswer: "A",
    explanation: "The fourth quality is commonly rendered in English as 'resourceful' or 'capable'.",
    category: "Vietnamese Women's Day",
  }),
  createQuestion({
    id: 10,
    type: "image-choice",
    question: "Which Vietnamese woman is strongly associated with the 'Long-Haired Army' movement in Ben Tre?",
    options: {
      A: "Nguyen Thi Binh",
      B: "Nguyen Thi Dinh",
      C: "Vo Thi Thang",
      D: "Nguyen Thi Minh Khai",
    },
    correctAnswer: "B",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/T%C6%B0%E1%BB%A3ng_%C4%91%E1%BB%93ng_Nguy%E1%BB%85n_Th%E1%BB%8B_%C4%90%E1%BB%8Bnh.jpg",
    imageCredit: "Bui Thuy Dao Nguyen / Wikimedia Commons, CC BY-SA 3.0",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Tượng_đồng_Nguyễn_Thị_Định.jpg",
    explanation: "Nguyen Thi Dinh was a leading figure of the Dong Khoi movement and became closely associated with the 'Long-Haired Army' in Ben Tre.",
    category: "History & Figures",
  }),
  createQuestion({
    id: 11,
    type: "multiple-choice",
    question: "Who wrote the wartime diary published in English as 'Last Night I Dreamed of Peace'?",
    options: {
      A: "Vo Thi Sau",
      B: "Dang Thuy Tram",
      C: "Nguyen Thi Binh",
      D: "Nguyen Thi Minh Khai",
    },
    correctAnswer: "B",
    explanation: "Dr. Dang Thuy Tram's wartime diary became widely known in Vietnam and abroad.",
    category: "Culture & Literature",
  }),
  createQuestion({
    id: 12,
    type: "multiple-choice",
    question: "What is the best overall purpose of October 20 activities in schools and workplaces?",
    options: {
      A: "To organize only entertainment events",
      B: "To honor women's contributions, express appreciation, and promote equality",
      C: "To replace International Women's Day",
      D: "To hold public elections",
    },
    correctAnswer: "B",
    explanation: "October 20 activities commonly focus on appreciation, education, and recognition of women's contributions.",
    category: "Vietnamese Women's Day",
  }),
  createQuestion({
    id: 13,
    type: "multiple-choice",
    question: "What did the 1976 national unification conference of women's organizations decide about October 20?",
    options: {
      A: "To recognize October 20, 1930 as the founding date of the Vietnam Women's Union",
      B: "To replace October 20 with March 8",
      C: "To end all October 20 commemorations",
      D: "To celebrate October 20 only in northern Vietnam",
    },
    correctAnswer: "A",
    explanation: "The 1976 conference formally recognized October 20, 1930 as the founding date of the Vietnam Women's Union.",
    category: "Vietnamese Women's Day",
  }),
  createQuestion({
    id: 14,
    type: "multiple-choice",
    question: "Which principle on gender equality appeared in the Communist Party of Vietnam's first political platform in 1930?",
    options: {
      A: "Equal rights for men and women",
      B: "Separate schools for men and women",
      C: "Different voting rights by gender",
      D: "Different legal status by gender",
    },
    correctAnswer: "A",
    explanation: "The first political platform stated the principle of equal rights for men and women.",
    category: "Equality & Safety",
  }),
  createQuestion({
    id: 15,
    type: "multiple-choice",
    question: "What was the name commonly given in English to the major women's patriotic movement in northern Vietnam during the anti-American war?",
    options: {
      A: "Three Responsibilities",
      B: "Three Readinesses",
      C: "Five Volunteers",
      D: "Four Companions",
    },
    correctAnswer: "A",
    explanation: "The women's movement is commonly translated as the 'Three Responsibilities' movement.",
    category: "History & Figures",
  }),
  createQuestion({
    id: 16,
    type: "multiple-choice",
    question: "Which women's movement in southern Vietnam was praised alongside the northern 'Three Responsibilities' movement?",
    options: {
      A: "Five Good Deeds",
      B: "Five Breakthroughs",
      C: "Three Duties",
      D: "Four Partnerships",
    },
    correctAnswer: "A",
    explanation: "Historical materials of the Vietnam Women's Union record the 'Five Good Deeds' movement in the South.",
    category: "History & Figures",
  }),
  createQuestion({
    id: 17,
    type: "multiple-choice",
    question: "In which year did Lady Trieu lead an uprising against Wu rule?",
    options: {
      A: "40 CE",
      B: "248 CE",
      C: "542 CE",
      D: "905 CE",
    },
    correctAnswer: "B",
    explanation: "Lady Trieu led a major uprising in 248 CE.",
    category: "History & Figures",
  }),
  createQuestion({
    id: 18,
    type: "multiple-choice",
    question: "What was the relationship between Trung Nhi and Trung Trac?",
    options: {
      A: "Younger sister",
      B: "Mother",
      C: "Daughter",
      D: "Sister-in-law",
    },
    correctAnswer: "A",
    explanation: "Trung Trac and Trung Nhi were sisters, with Trung Nhi generally identified as the younger sister.",
    category: "History & Figures",
  }),
  createQuestion({
    id: 19,
    type: "multiple-choice",
    question: "Which poet is traditionally known as the 'Queen of Nom Poetry'?",
    options: {
      A: "Ho Xuan Huong",
      B: "Xuan Quynh",
      C: "Doan Thi Diem",
      D: "Ba Huyen Thanh Quan",
    },
    correctAnswer: "A",
    explanation: "Ho Xuan Huong is celebrated for her distinctive Nom poetry and is often called the 'Queen of Nom Poetry'.",
    category: "Culture & Literature",
  }),
  createQuestion({
    id: 20,
    type: "multiple-choice",
    question: "Who wrote the well-known Vietnamese poem 'Waves'?",
    options: {
      A: "Xuan Quynh",
      B: "Ho Xuan Huong",
      C: "Anh Tho",
      D: "Lam Thi My Da",
    },
    correctAnswer: "A",
    explanation: "'Waves' is one of poet Xuan Quynh's best-known works.",
    category: "Culture & Literature",
  }),
  createQuestion({
    id: 21,
    type: "multiple-choice",
    question: "When is International Women's Day observed each year?",
    options: {
      A: "March 8",
      B: "October 20",
      C: "June 28",
      D: "November 20",
    },
    correctAnswer: "A",
    explanation: "International Women's Day is observed on March 8, while October 20 is associated with Vietnamese Women's Day.",
    category: "Culture & Literature",
  }),
  createQuestion({
    id: 22,
    type: "multiple-choice",
    question: "In which year did Vietnam's National Assembly pass the Gender Equality Law?",
    options: {
      A: "2004",
      B: "2006",
      C: "2013",
      D: "2022",
    },
    correctAnswer: "B",
    explanation: "Vietnam's Gender Equality Law No. 73/2006/QH11 was passed in 2006.",
    category: "Equality & Safety",
  }),
  createQuestion({
    id: 23,
    type: "multiple-choice",
    question: "What does Article 26 of Vietnam's 2013 Constitution affirm?",
    options: {
      A: "Male and female citizens have equal rights in all fields and gender discrimination is prohibited",
      B: "Only men may participate in state management",
      C: "Women may not choose their own careers",
      D: "Each gender must study different subjects",
    },
    correctAnswer: "A",
    explanation: "Article 26 affirms gender equality and prohibits gender discrimination.",
    category: "Equality & Safety",
  }),
  createQuestion({
    id: 24,
    type: "multiple-choice",
    question: "Which statement matches Vietnam's Gender Equality Law in the field of employment?",
    options: {
      A: "Men and women should receive equal treatment in employment, pay, bonuses, social insurance, and working conditions",
      B: "Men should automatically receive higher pay for the same work",
      C: "Only women may receive social insurance",
      D: "Only men may be promoted",
    },
    correctAnswer: "A",
    explanation: "The law requires equal treatment of men and women in recruitment and workplace conditions.",
    category: "Equality & Safety",
  }),
  createQuestion({
    id: 25,
    type: "multiple-choice",
    question: "Which educational right is consistent with Vietnam's Gender Equality Law?",
    options: {
      A: "Equal opportunity to choose fields of study and access education policies",
      B: "Study programs assigned by gender",
      C: "Women must begin school later than men",
      D: "Men receive automatic priority in every field",
    },
    correctAnswer: "A",
    explanation: "The law provides equal rights in education, training, choice of study, and access to education policies.",
    category: "Equality & Safety",
  }),
  createQuestion({
    id: 26,
    type: "multiple-choice",
    question: "When did Vietnam's 2022 Law on Domestic Violence Prevention and Control take effect?",
    options: {
      A: "January 1, 2023",
      B: "July 1, 2023",
      C: "October 20, 2023",
      D: "January 1, 2024",
    },
    correctAnswer: "B",
    explanation: "Law No. 13/2022/QH15 took effect on July 1, 2023.",
    category: "Equality & Safety",
  }),
  createQuestion({
    id: 27,
    type: "multiple-choice",
    question: "Under Vietnam's current law, domestic violence may cause or threaten which forms of harm?",
    options: {
      A: "Physical harm only",
      B: "Physical, mental, sexual, or economic harm",
      C: "Economic harm only",
      D: "Only visible bodily injury",
    },
    correctAnswer: "B",
    explanation: "The law recognizes physical, mental, sexual, and economic harm or the risk of such harm.",
    category: "Equality & Safety",
  }),
  createQuestion({
    id: 28,
    type: "text-choice",
    question: "A person deliberately controls all household money so another family member cannot meet basic needs or make reasonable personal decisions. What type of abuse may this represent?",
    options: {
      A: "Economic abuse",
      B: "Normal budgeting",
      C: "Study planning",
      D: "Positive communication",
    },
    correctAnswer: "A",
    explanation: "Controlling income, assets, or access to essential resources can constitute economic abuse.",
    category: "Equality & Safety",
  }),
  createQuestion({
    id: 29,
    type: "text-choice",
    question: "If someone may be experiencing domestic violence, what is the most appropriate first response?",
    options: {
      A: "Blame the person experiencing abuse",
      B: "Tell them to keep it secret at all costs",
      C: "Prioritize safety, listen, and help connect them with trusted support",
      D: "Post their private story online immediately",
    },
    correctAnswer: "C",
    explanation: "A supportive response prioritizes safety, privacy, listening, and access to trustworthy help.",
    category: "Equality & Safety",
  }),
  createQuestion({
    id: 30,
    type: "multiple-choice",
    question: "Who became the first chairwoman of the Vietnam Women's Union in 1946?",
    options: {
      A: "Le Thi Xuyen",
      B: "Nguyen Thi Dinh",
      C: "Ha Thi Que",
      D: "Nguyen Thi Binh",
    },
    correctAnswer: "A",
    explanation: "Le Thi Xuyen became the first chairwoman of the Vietnam Women's Union in 1946.",
    category: "Vietnamese Women's Day",
  }),
  createQuestion({
    id: 31,
    type: "multiple-choice",
    question: "In which year was the Vietnamese Women's Museum established?",
    options: {
      A: "1976",
      B: "1987",
      C: "1995",
      D: "2010",
    },
    correctAnswer: "B",
    explanation: "The Vietnamese Women's Museum was established in 1987 under the Vietnam Women's Union.",
    category: "Culture & Literature",
  }),
  createQuestion({
    id: 32,
    type: "multiple-choice",
    question: "When did the Vietnamese Women's Museum officially open to the public?",
    options: {
      A: "1987",
      B: "1991",
      C: "1995",
      D: "2010",
    },
    correctAnswer: "C",
    explanation: "The museum was established in 1987, began construction in 1991, and officially opened to the public in 1995.",
    category: "Culture & Literature",
  }),
  createQuestion({
    id: 33,
    type: "multiple-choice",
    question: "Who is credited as the founder of the Vietnamese Women's Museum?",
    options: {
      A: "Nguyen Thi Dinh",
      B: "Le Thi Xuyen",
      C: "Nguyen Thi Binh",
      D: "Vo Thi Thang",
    },
    correctAnswer: "A",
    explanation: "The museum identifies Nguyen Thi Dinh as its founder.",
    category: "Culture & Literature",
  }),
  createQuestion({
    id: 34,
    type: "multiple-choice",
    question: "Which organization runs the Vietnamese Women's Museum?",
    options: {
      A: "Vietnam Women's Union",
      B: "Vietnam Football Federation",
      C: "Vietnam Red Cross only",
      D: "A private university",
    },
    correctAnswer: "A",
    explanation: "The Vietnamese Women's Museum is run by the Vietnam Women's Union.",
    category: "Culture & Literature",
  }),
  createQuestion({
    id: 35,
    type: "multiple-choice",
    question: "Which set lists the Vietnamese Women's Museum's three main permanent exhibitions after its 2010 renovation?",
    options: {
      A: "Women in Family – Women in History – Women's Fashion",
      B: "Sports – Technology – Astronomy",
      C: "Agriculture – Shipping – Aviation",
      D: "Cinema – Architecture – Banking",
    },
    correctAnswer: "A",
    explanation: "The museum highlights Women in Family, Women in History, and Women's Fashion as its three main permanent exhibitions.",
    category: "Culture & Literature",
  }),
  createQuestion({
    id: 36,
    type: "multiple-choice",
    question: "Where was the Vietnam Women's Union publicly launched on October 20, 1946?",
    options: {
      A: "At the Hanoi Opera House square",
      B: "At Hue Imperial City",
      C: "At Ben Thanh Market",
      D: "At My Son Sanctuary",
    },
    correctAnswer: "A",
    explanation: "The Union held its public launch at the Hanoi Opera House square on October 20, 1946.",
    category: "Vietnamese Women's Day",
  }),
  createQuestion({
    id: 37,
    type: "multiple-choice",
    question: "Who signed the decree on October 3, 1946 permitting the establishment of the Vietnam Women's Union?",
    options: {
      A: "Huynh Thuc Khang",
      B: "Vo Nguyen Giap",
      C: "Pham Van Dong",
      D: "Ton Duc Thang",
    },
    correctAnswer: "A",
    explanation: "Interior Minister Huynh Thuc Khang signed the decree permitting the Union's establishment on October 3, 1946.",
    category: "Vietnamese Women's Day",
  }),
  createQuestion({
    id: 38,
    type: "multiple-choice",
    question: "Where was the first National Women's Congress held in 1950?",
    options: {
      A: "Dai Tu, Thai Nguyen",
      B: "Da Lat, Lam Dong",
      C: "Vinh, Nghe An",
      D: "Can Tho",
    },
    correctAnswer: "A",
    explanation: "The first National Women's Congress was held in Dai Tu, Thai Nguyen, in the Viet Bac resistance base.",
    category: "Vietnamese Women's Day",
  }),
  createQuestion({
    id: 39,
    type: "multiple-choice",
    question: "Which organization merged with the Vietnam Women's Union at the first National Women's Congress in 1950?",
    options: {
      A: "Women's National Salvation Union",
      B: "Vietnam Red Cross",
      C: "Youth Union",
      D: "Farmers' Union",
    },
    correctAnswer: "A",
    explanation: "The Women's National Salvation Union merged with the Vietnam Women's Union to form a unified national women's organization.",
    category: "Vietnamese Women's Day",
  }),
  createQuestion({
    id: 40,
    type: "text-choice",
    question: "Which school practice best promotes gender equality?",
    options: {
      A: "Giving students equal opportunities regardless of gender",
      B: "Assigning leadership roles only to boys",
      C: "Directing girls away from science by default",
      D: "Separating career choices by gender",
    },
    correctAnswer: "A",
    explanation: "Gender equality in education means students should have fair opportunities to learn, lead, and choose fields of study without gender-based discrimination.",
    category: "Equality & Safety",
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
export function buildQuizRound(
  bank: Question[] = questionBank,
  count: number = QUESTIONS_PER_ROUND
): Question[] {
  const safeCount = Math.max(1, Math.min(count, bank.length));
  const shuffledBank = shuffleQuestions(bank);
  const buckets = new Map<string, Question[]>();

  for (const question of shuffledBank) {
    const category = question.category || 'Other';
    const bucket = buckets.get(category) ?? [];
    bucket.push(question);
    buckets.set(category, bucket);
  }

  const categories = Array.from(buckets.keys());
  for (let i = categories.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [categories[i], categories[j]] = [categories[j], categories[i]];
  }

  const selected: Question[] = [];

  while (selected.length < safeCount) {
    let addedInPass = false;

    for (const category of categories) {
      const bucket = buckets.get(category);
      const next = bucket?.shift();

      if (next) {
        selected.push(next);
        addedInPass = true;
      }

      if (selected.length >= safeCount) {
        break;
      }
    }

    if (!addedInPass) {
      break;
    }
  }

  return shuffleQuestions(selected).map(shuffleQuestionOptions);
}
