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
 * Content is normalized in English and expanded beyond the original 12-question source.
 */
export const QUESTIONS_PER_ROUND = 10;
export const questionBank: Question[] = [
  createQuestion({
    id: "club-001",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "20/10 Celebration",
    question: "When is Vietnamese Women's Day?",
    options: {
      A: "October 20",
      B: "March 8",
      C: "November 20",
      D: "January 1",
    },
    correctAnswer: 'A',
    explanation: "Vietnamese Women's Day is celebrated on October 20 every year.",
    sourceUrl: "https://sotuphap.hochiminhcity.gov.vn/tin-tuc-su-kien?_101_INSTANCE_emZ19pfF3Yyq_assetEntryId=1782220&_101_INSTANCE_emZ19pfF3Yyq_struts_action=%2Fasset_publisher%2Fview_content&_101_INSTANCE_emZ19pfF3Yyq_type=content&_101_INSTANCE_emZ19pfF3Yyq_urlTitle=&enableXemTheoNgay=true&p_p_auth=KeI6L92v&p_p_col_count=1&p_p_col_id=column-4&p_p_id=101_INSTANCE_emZ19pfF3Yyq&p_p_lifecycle=0",
  }),
  createQuestion({
    id: "club-002",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "20/10 Celebration",
    question: "When is International Women's Day?",
    options: {
      A: "March 8",
      B: "October 20",
      C: "December 25",
      D: "May 1",
    },
    correctAnswer: 'A',
    explanation: "International Women's Day takes place on March 8.",
    sourceUrl: "https://www.unesco.org/en/days/women",
  }),
  createQuestion({
    id: "club-003",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "20/10 Celebration",
    question: "Which greeting sounds best on October 20?",
    options: {
      A: "Happy Vietnamese Women's Day!",
      B: "Happy New Year!",
      C: "Happy Halloween!",
      D: "Happy Birthday, Vietnam!",
    },
    correctAnswer: 'A',
    explanation: "A short, sincere greeting is a lovely way to celebrate.",
  }),
  createQuestion({
    id: "club-004",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "20/10 Celebration",
    question: "What does 'appreciate' mean?",
    options: {
      A: "To be thankful for someone",
      B: "To forget someone",
      C: "To argue with someone",
      D: "To avoid someone",
    },
    correctAnswer: 'A',
    explanation: "'Appreciate' means to value someone or something.",
  }),
  createQuestion({
    id: "club-005",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "20/10 Celebration",
    question: "Which gift costs nothing but can make someone smile?",
    options: {
      A: "A kind compliment",
      B: "An expensive phone",
      C: "A large television",
      D: "A new motorbike",
    },
    correctAnswer: 'A',
    explanation: "A sincere compliment can be just as meaningful as a gift.",
  }),
  createQuestion({
    id: "club-006",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "20/10 Celebration",
    question: "What is a 'role model'?",
    options: {
      A: "Someone who inspires you",
      B: "Someone who sells tickets",
      C: "A type of music",
      D: "A sports stadium",
    },
    correctAnswer: 'A',
    explanation: "A role model is someone whose good actions inspire others.",
  }),
  createQuestion({
    id: "club-007",
    type: "multiple-choice",
    difficulty: "standard",
    category: "20/10 Celebration",
    question: "In which year was the first organization behind today's Vietnam Women's Union founded?",
    options: {
      A: "1930",
      B: "1945",
      C: "1975",
      D: "2000",
    },
    correctAnswer: 'A',
    explanation: "The organization traces its founding to October 20, 1930.",
    sourceUrl: "https://sotuphap.hochiminhcity.gov.vn/tin-tuc-su-kien?_101_INSTANCE_emZ19pfF3Yyq_assetEntryId=1782220&_101_INSTANCE_emZ19pfF3Yyq_struts_action=%2Fasset_publisher%2Fview_content&_101_INSTANCE_emZ19pfF3Yyq_type=content&_101_INSTANCE_emZ19pfF3Yyq_urlTitle=&enableXemTheoNgay=true&p_p_auth=KeI6L92v&p_p_col_count=1&p_p_col_id=column-4&p_p_id=101_INSTANCE_emZ19pfF3Yyq&p_p_lifecycle=0",
  }),
  createQuestion({
    id: "club-008",
    type: "multiple-choice",
    difficulty: "standard",
    category: "20/10 Celebration",
    question: "Which message best celebrates women in an English club?",
    options: {
      A: "Your ideas make our team stronger.",
      B: "You must always agree with me.",
      C: "Only boys should lead.",
      D: "Girls cannot solve hard problems.",
    },
    correctAnswer: 'A',
    explanation: "A good message recognizes effort, talent, and teamwork.",
  }),
  createQuestion({
    id: "club-009",
    type: "multiple-choice",
    difficulty: "standard",
    category: "20/10 Celebration",
    question: "What does 'gender equality' mean?",
    options: {
      A: "Equal rights and opportunities",
      B: "The same hobbies for everyone",
      C: "Everyone wearing the same clothes",
      D: "Only women having leadership roles",
    },
    correctAnswer: 'A',
    explanation: "Equality is about fair rights and opportunities, not identical personalities.",
  }),
  createQuestion({
    id: "club-010",
    type: "multiple-choice",
    difficulty: "standard",
    category: "20/10 Celebration",
    question: "Which sentence politely thanks a teacher?",
    options: {
      A: "Thank you for supporting us.",
      B: "You should do better.",
      C: "You owe us a prize.",
      D: "I don't need your help.",
    },
    correctAnswer: 'A',
    explanation: "Expressing gratitude is a useful real-life English skill.",
  }),
  createQuestion({
    id: "club-011",
    type: "multiple-choice",
    difficulty: "standard",
    category: "20/10 Celebration",
    question: "Your friend is nervous about speaking English. What should you say?",
    options: {
      A: "Take your time. You've got this!",
      B: "Stop trying.",
      C: "Your English is terrible.",
      D: "Don't speak again.",
    },
    correctAnswer: 'A',
    explanation: "Encouragement builds confidence and a friendly club atmosphere.",
  }),
  createQuestion({
    id: "club-012",
    type: "multiple-choice",
    difficulty: "standard",
    category: "20/10 Celebration",
    question: "What does the phrase 'make a difference' mean?",
    options: {
      A: "Create a positive change",
      B: "Find a spelling mistake",
      C: "Be late for a meeting",
      D: "Change your phone number",
    },
    correctAnswer: 'A',
    explanation: "'Make a difference' often means to have a helpful impact.",
  }),
  createQuestion({
    id: "club-013",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "English Challenge",
    question: "What is the plural of 'woman'?",
    options: {
      A: "Women",
      B: "Womans",
      C: "Womanes",
      D: "Womens",
    },
    correctAnswer: 'A',
    explanation: "'Woman' is singular; 'women' is plural.",
  }),
  createQuestion({
    id: "club-014",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "English Challenge",
    question: "Choose the correct sentence.",
    options: {
      A: "She is a student.",
      B: "She are a student.",
      C: "She am a student.",
      D: "She be a student.",
    },
    correctAnswer: 'A',
    explanation: "Use 'is' with 'she' in the present simple.",
  }),
  createQuestion({
    id: "club-015",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "English Challenge",
    question: "Which word means 'very brave'?",
    options: {
      A: "Courageous",
      B: "Sleepy",
      C: "Silent",
      D: "Hungry",
    },
    correctAnswer: 'A',
    explanation: "'Courageous' is similar in meaning to 'brave'.",
  }),
  createQuestion({
    id: "club-016",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "English Challenge",
    question: "What is the opposite of 'kind'?",
    options: {
      A: "Unkind",
      B: "Friendly",
      C: "Gentle",
      D: "Caring",
    },
    correctAnswer: 'A',
    explanation: "Adding 'un-' can give some adjectives their opposite meaning.",
  }),
  createQuestion({
    id: "club-017",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "English Challenge",
    question: "Complete: 'We ___ proud of our team.'",
    options: {
      A: "are",
      B: "is",
      C: "am",
      D: "be",
    },
    correctAnswer: 'A',
    explanation: "Use 'are' with 'we'.",
  }),
  createQuestion({
    id: "club-018",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "English Challenge",
    question: "What does 'grateful' mean?",
    options: {
      A: "Thankful",
      B: "Angry",
      C: "Bored",
      D: "Afraid",
    },
    correctAnswer: 'A',
    explanation: "'Grateful' and 'thankful' have similar meanings.",
  }),
  createQuestion({
    id: "club-019",
    type: "multiple-choice",
    difficulty: "standard",
    category: "English Challenge",
    question: "Complete: 'She is ___ engineer.'",
    options: {
      A: "an",
      B: "a",
      C: "the an",
      D: "no article",
    },
    correctAnswer: 'A',
    explanation: "Use 'an' before a vowel sound, as in 'engineer'.",
  }),
  createQuestion({
    id: "club-020",
    type: "multiple-choice",
    difficulty: "standard",
    category: "English Challenge",
    question: "Complete: 'We are proud ___ her.'",
    options: {
      A: "of",
      B: "at",
      C: "to",
      D: "in",
    },
    correctAnswer: 'A',
    explanation: "The correct phrase is 'proud of someone'.",
  }),
  createQuestion({
    id: "club-021",
    type: "multiple-choice",
    difficulty: "standard",
    category: "English Challenge",
    question: "Complete: 'My sister ___ English every day.'",
    options: {
      A: "studies",
      B: "study",
      C: "studying",
      D: "studys",
    },
    correctAnswer: 'A',
    explanation: "In the present simple, 'study' becomes 'studies' with 'she'.",
  }),
  createQuestion({
    id: "club-022",
    type: "multiple-choice",
    difficulty: "standard",
    category: "English Challenge",
    question: "Complete: 'This is the woman ___ helped me.'",
    options: {
      A: "who",
      B: "which",
      C: "where",
      D: "when",
    },
    correctAnswer: 'A',
    explanation: "'Who' refers to a person in a relative clause.",
  }),
  createQuestion({
    id: "club-023",
    type: "multiple-choice",
    difficulty: "standard",
    category: "English Challenge",
    question: "What does 'look up to someone' mean?",
    options: {
      A: "Admire them",
      B: "Stand next to them",
      C: "Look at the ceiling",
      D: "Give them a book",
    },
    correctAnswer: 'A',
    explanation: "'Look up to' means to respect or admire someone.",
  }),
  createQuestion({
    id: "club-024",
    type: "multiple-choice",
    difficulty: "standard",
    category: "English Challenge",
    question: "What does 'break the ice' mean at a party?",
    options: {
      A: "Help people feel comfortable",
      B: "Make ice cubes",
      C: "Break a glass",
      D: "Leave the room",
    },
    correctAnswer: 'A',
    explanation: "This idiom means to make a social situation friendlier.",
  }),
  createQuestion({
    id: "club-025",
    type: "multiple-choice",
    difficulty: "challenge",
    category: "English Challenge",
    question: "Complete: 'If I ___ more free time, I would volunteer.'",
    options: {
      A: "had",
      B: "have",
      C: "has",
      D: "having",
    },
    correctAnswer: 'A',
    explanation: "Use 'if + past simple' for an imaginary present situation.",
  }),
  createQuestion({
    id: "club-026",
    type: "multiple-choice",
    difficulty: "challenge",
    category: "English Challenge",
    question: "What does 'once in a blue moon' mean?",
    options: {
      A: "Very rarely",
      B: "Every evening",
      C: "Once a week",
      D: "Twice a day",
    },
    correctAnswer: 'A',
    explanation: "A 'blue moon' is an idiom for something that happens rarely.",
  }),
  createQuestion({
    id: "club-027",
    type: "multiple-choice",
    difficulty: "challenge",
    category: "English Challenge",
    question: "Complete: 'Her hard work finally ___ off.'",
    options: {
      A: "paid",
      B: "payed",
      C: "pay",
      D: "paysed",
    },
    correctAnswer: 'A',
    explanation: "'Pay off' means to bring a good result; its past form is 'paid off'.",
  }),
  createQuestion({
    id: "club-028",
    type: "multiple-choice",
    difficulty: "challenge",
    category: "English Challenge",
    question: "Complete: 'Despite ___ tired, she finished the project.'",
    options: {
      A: "being",
      B: "be",
      C: "was",
      D: "is",
    },
    correctAnswer: 'A',
    explanation: "After 'despite', use a noun or -ing form, as in 'despite being tired'.",
  }),
  createQuestion({
    id: "club-029",
    type: "multiple-choice",
    difficulty: "challenge",
    category: "English Challenge",
    question: "Choose the most natural compliment.",
    options: {
      A: "You handled that really well.",
      B: "You very well handled that.",
      C: "You did really good that.",
      D: "You handled goodly that.",
    },
    correctAnswer: 'A',
    explanation: "The adverb 'really' naturally modifies 'well' in this compliment.",
  }),
  createQuestion({
    id: "club-030",
    type: "multiple-choice",
    difficulty: "challenge",
    category: "English Challenge",
    question: "Complete: 'Neither Hoa nor Mai ___ late today.'",
    options: {
      A: "is",
      B: "are",
      C: "were",
      D: "be",
    },
    correctAnswer: 'A',
    explanation: "With two singular nouns linked by 'neither...nor', we normally use a singular verb.",
  }),
  createQuestion({
    id: "club-031",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "Inspiring Women",
    question: "Which scientist is famous for her research on radioactivity?",
    options: {
      A: "Marie Curie",
      B: "Jane Austen",
      C: "Amelia Earhart",
      D: "Serena Williams",
    },
    correctAnswer: 'A',
    explanation: "Marie Curie was a pioneering physicist and chemist.",
    sourceUrl: "https://www.nobelprize.org/prizes/physics/1903/marie-curie/questions-and-answers/",
  }),
  createQuestion({
    id: "club-032",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "Inspiring Women",
    question: "Malala Yousafzai is known for supporting girls' ___.",
    options: {
      A: "education",
      B: "car racing",
      C: "space travel",
      D: "fashion shows",
    },
    correctAnswer: 'A',
    explanation: "Malala campaigns for every girl's right to an education.",
    sourceUrl: "https://www.nobelprize.org/prizes/peace/2014/yousafzai/biographical/",
  }),
  createQuestion({
    id: "club-033",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "Inspiring Women",
    question: "Which athlete is famous for winning major tennis titles?",
    options: {
      A: "Serena Williams",
      B: "Marie Curie",
      C: "Florence Nightingale",
      D: "Amelia Earhart",
    },
    correctAnswer: 'A',
    explanation: "Serena Williams is one of the most successful tennis players.",
  }),
  createQuestion({
    id: "club-034",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "Inspiring Women",
    question: "Amelia Earhart became famous as a ___.",
    options: {
      A: "pilot",
      B: "chef",
      C: "novelist",
      D: "scientist",
    },
    correctAnswer: 'A',
    explanation: "Amelia Earhart was a pioneering American pilot.",
    sourceUrl: "https://www.si.edu/object/amelia-earhart:nasm_A19500108000",
  }),
  createQuestion({
    id: "club-035",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "Inspiring Women",
    question: "The Trung Sisters in Vietnamese history were ___.",
    options: {
      A: "two sisters",
      B: "two brothers",
      C: "a married couple",
      D: "a group of musicians",
    },
    correctAnswer: 'A',
    explanation: "Trung Trac and Trung Nhi were sisters who led an uprising.",
  }),
  createQuestion({
    id: "club-036",
    type: "multiple-choice",
    difficulty: "warm-up",
    category: "Inspiring Women",
    question: "Jane Austen is best known for writing ___.",
    options: {
      A: "novels",
      B: "computer programs",
      C: "physics formulas",
      D: "sports rules",
    },
    correctAnswer: 'A',
    explanation: "Jane Austen was an English novelist known for social and romantic fiction.",
  }),
  createQuestion({
    id: "club-037",
    type: "multiple-choice",
    difficulty: "standard",
    category: "Inspiring Women",
    question: "Who was the first woman to receive a Nobel Prize?",
    options: {
      A: "Marie Curie",
      B: "Malala Yousafzai",
      C: "Amelia Earhart",
      D: "Florence Nightingale",
    },
    correctAnswer: 'A',
    explanation: "Marie Curie received the Nobel Prize in Physics in 1903.",
    sourceUrl: "https://www.nobelprize.org/prizes/physics/1903/marie-curie/questions-and-answers/",
  }),
  createQuestion({
    id: "club-038",
    type: "multiple-choice",
    difficulty: "standard",
    category: "Inspiring Women",
    question: "Which NASA mathematician appears in the story 'Hidden Figures'?",
    options: {
      A: "Katherine Johnson",
      B: "Jane Austen",
      C: "Marie Curie",
      D: "Rosa Parks",
    },
    correctAnswer: 'A',
    explanation: "Katherine Johnson helped calculate trajectories for NASA space missions.",
    sourceUrl: "https://www.nasa.gov/centers-and-facilities/langley/katherine-johnson-biography/",
  }),
  createQuestion({
    id: "club-039",
    type: "multiple-choice",
    difficulty: "standard",
    category: "Inspiring Women",
    question: "At what age did Malala Yousafzai win the Nobel Peace Prize?",
    options: {
      A: "17",
      B: "12",
      C: "25",
      D: "35",
    },
    correctAnswer: 'A',
    explanation: "Malala was 17 when she shared the 2014 Nobel Peace Prize.",
    sourceUrl: "https://www.nobelprize.org/prizes/peace/2014/yousafzai/biographical/",
  }),
  createQuestion({
    id: "club-040",
    type: "multiple-choice",
    difficulty: "standard",
    category: "Inspiring Women",
    question: "Which pilot flew solo across the Atlantic Ocean in 1932?",
    options: {
      A: "Amelia Earhart",
      B: "Serena Williams",
      C: "Marie Curie",
      D: "Malala Yousafzai",
    },
    correctAnswer: 'A',
    explanation: "Amelia Earhart became the first woman to fly solo across the Atlantic.",
    sourceUrl: "https://www.si.edu/object/amelia-earhart:nasm_A19500108000",
  }),
  createQuestion({
    id: "club-041",
    type: "multiple-choice",
    difficulty: "standard",
    category: "Inspiring Women",
    question: "Which historical sisters led an uprising in Vietnam in 40 CE?",
    options: {
      A: "The Trung Sisters",
      B: "The Brontë Sisters",
      C: "The Williams Sisters",
      D: "The Kardashians",
    },
    correctAnswer: 'A',
    explanation: "Trung Trac and Trung Nhi led an uprising in 40 CE.",
  }),
  createQuestion({
    id: "club-042",
    type: "multiple-choice",
    difficulty: "standard",
    category: "Inspiring Women",
    question: "Marie Curie won Nobel Prizes in which two subjects?",
    options: {
      A: "Physics and Chemistry",
      B: "Music and Literature",
      C: "Peace and Medicine",
      D: "History and Art",
    },
    correctAnswer: 'A',
    explanation: "Curie won in Physics (1903) and Chemistry (1911).",
    sourceUrl: "https://www.nobelprize.org/prizes/physics/1903/marie-curie/questions-and-answers/",
  }),
  createQuestion({
    id: "club-043",
    type: "image-choice",
    difficulty: "warm-up",
    category: "Picture Round",
    question: "What can you see in the picture?",
    options: {
      A: "A bouquet of flowers",
      B: "A birthday cake",
      C: "A school bus",
      D: "A football",
    },
    correctAnswer: 'A',
    explanation: "A bouquet is a group of flowers given as a gift.",
    image: "/questions/english-club/flowers.svg",
    imageCredit: "Original English Club illustration",
  }),
  createQuestion({
    id: "club-044",
    type: "image-choice",
    difficulty: "warm-up",
    category: "Picture Round",
    question: "What activity does this picture suggest?",
    options: {
      A: "Reading",
      B: "Swimming",
      C: "Cooking",
      D: "Cycling",
    },
    correctAnswer: 'A',
    explanation: "Reading is a fun way to build English vocabulary.",
    image: "/questions/english-club/book.svg",
    imageCredit: "Original English Club illustration",
  }),
  createQuestion({
    id: "club-045",
    type: "image-choice",
    difficulty: "warm-up",
    category: "Picture Round",
    question: "What does this symbol usually represent?",
    options: {
      A: "Education",
      B: "Travel",
      C: "Cooking",
      D: "Shopping",
    },
    correctAnswer: 'A',
    explanation: "A graduation cap is a familiar symbol of academic achievement.",
    image: "/questions/english-club/graduation.svg",
    imageCredit: "Original English Club illustration",
  }),
  createQuestion({
    id: "club-046",
    type: "image-choice",
    difficulty: "warm-up",
    category: "Picture Round",
    question: "Which activity matches this picture?",
    options: {
      A: "Singing",
      B: "Painting",
      C: "Running",
      D: "Gardening",
    },
    correctAnswer: 'A',
    explanation: "A microphone is commonly used for singing and public speaking.",
    image: "/questions/english-club/microphone.svg",
    imageCredit: "Original English Club illustration",
  }),
  createQuestion({
    id: "club-047",
    type: "image-choice",
    difficulty: "warm-up",
    category: "Picture Round",
    question: "What can you see in this picture?",
    options: {
      A: "A laptop",
      B: "A washing machine",
      C: "A refrigerator",
      D: "A bicycle",
    },
    correctAnswer: 'A',
    explanation: "A laptop is a portable computer.",
    image: "/questions/english-club/laptop.svg",
    imageCredit: "Original English Club illustration",
  }),
  createQuestion({
    id: "club-048",
    type: "image-choice",
    difficulty: "warm-up",
    category: "Picture Round",
    question: "Which activity is shown by these objects?",
    options: {
      A: "Cleaning",
      B: "Flying",
      C: "Skiing",
      D: "Fishing",
    },
    correctAnswer: 'A',
    explanation: "A broom and bucket are common cleaning tools.",
    image: "/questions/english-club/cleaning.svg",
    imageCredit: "Original English Club illustration",
  }),
  createQuestion({
    id: "club-049",
    type: "image-choice",
    difficulty: "standard",
    category: "Picture Round",
    question: "What is the picture most closely connected with?",
    options: {
      A: "The world",
      B: "A single classroom",
      C: "A kitchen",
      D: "A basketball court",
    },
    correctAnswer: 'A',
    explanation: "A globe represents Earth and connects to world cultures.",
    image: "/questions/english-club/globe.svg",
    imageCredit: "Original English Club illustration",
  }),
  createQuestion({
    id: "club-050",
    type: "image-choice",
    difficulty: "standard",
    category: "Picture Round",
    question: "Which word best matches the picture?",
    options: {
      A: "Teamwork",
      B: "Loneliness",
      C: "Competition",
      D: "Silence",
    },
    correctAnswer: 'A',
    explanation: "Teamwork means working together toward a shared goal.",
    image: "/questions/english-club/teamwork.svg",
    imageCredit: "Original English Club illustration",
  }),
  createQuestion({
    id: "club-051",
    type: "image-choice",
    difficulty: "standard",
    category: "Picture Round",
    question: "What does this image commonly stand for?",
    options: {
      A: "A new idea",
      B: "A rainy day",
      C: "A loud noise",
      D: "An old building",
    },
    correctAnswer: 'A',
    explanation: "A light bulb is often used as a symbol of ideas and creativity.",
    image: "/questions/english-club/lightbulb.svg",
    imageCredit: "Original English Club illustration",
  }),
  createQuestion({
    id: "club-052",
    type: "image-choice",
    difficulty: "standard",
    category: "Picture Round",
    question: "Which hobby is suggested by the picture?",
    options: {
      A: "Photography",
      B: "Swimming",
      C: "Dancing",
      D: "Cooking",
    },
    correctAnswer: 'A',
    explanation: "Photography is the art of taking pictures.",
    image: "/questions/english-club/camera.svg",
    imageCredit: "Original English Club illustration",
  }),
  createQuestion({
    id: "club-053",
    type: "image-choice",
    difficulty: "standard",
    category: "Picture Round",
    question: "Which quality does this picture best suggest?",
    options: {
      A: "Kindness",
      B: "Jealousy",
      C: "Confusion",
      D: "Anger",
    },
    correctAnswer: 'A',
    explanation: "A heart is often a symbol of love, care, and kindness.",
    image: "/questions/english-club/heart.svg",
    imageCredit: "Original English Club illustration",
  }),
  createQuestion({
    id: "club-054",
    type: "image-choice",
    difficulty: "standard",
    category: "Picture Round",
    question: "Which good habit is linked to the picture?",
    options: {
      A: "Being on time",
      B: "Forgetting homework",
      C: "Talking loudly",
      D: "Making excuses",
    },
    correctAnswer: 'A',
    explanation: "Being punctual means arriving at the expected time.",
    image: "/questions/english-club/clock.svg",
    imageCredit: "Original English Club illustration",
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
 * English Club game-show blueprint for ten quick questions:
 * 3 celebration, 3 language, 2 role models, 2 visual prompts.
 * 5 warm-ups, 4 standard questions and 1 challenge.
 */
export const ROUND_PLAN = [
  { category: '20/10 Celebration', difficulty: 'warm-up', count: 2 },
  { category: '20/10 Celebration', difficulty: 'standard', count: 1 },
  { category: 'English Challenge', difficulty: 'warm-up', count: 1 },
  { category: 'English Challenge', difficulty: 'standard', count: 1 },
  { category: 'English Challenge', difficulty: 'challenge', count: 1 },
  { category: 'Inspiring Women', difficulty: 'warm-up', count: 1 },
  { category: 'Inspiring Women', difficulty: 'standard', count: 1 },
  { category: 'Picture Round', difficulty: 'warm-up', count: 1 },
  { category: 'Picture Round', difficulty: 'standard', count: 1 },
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
