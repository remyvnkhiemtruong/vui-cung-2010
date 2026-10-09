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
export const QUESTIONS_PER_ROUND = 12;
export const questionBank: Question[] = [
  createQuestion({
    "id": "teacher-20oct-01",
    "type": "multiple-choice",
    "difficulty": "warm-up",
    "category": "October 20: Origins",
    "question": "When was Vietnamese Women's Day established?",
    "options": {
      "A": "20/10/1930",
      "B": "20/10/1940",
      "C": "20/10/1950",
      "D": "20/10/1960"
    },
    "correctAnswer": "A",
    "explanation": "The source document identifies October 20, 1930 as the date. It is also the recognized founding date of the Vietnamese women's organization."
  }),
  createQuestion({
    "id": "teacher-20oct-02",
    "type": "multiple-choice",
    "difficulty": "warm-up",
    "category": "Vietnamese Women",
    "question": "How many young women lost their lives at Dong Loc Junction?",
    "options": {
      "A": "9",
      "B": "10",
      "C": "11",
      "D": "12"
    },
    "correctAnswer": "B",
    "explanation": "The source document records ten young women who lost their lives at Dong Loc Junction."
  }),
  createQuestion({
    "id": "teacher-20oct-03",
    "type": "multiple-choice",
    "difficulty": "warm-up",
    "category": "Vietnamese Women",
    "question": "Who was the first female emperor (ruler) of Vietnam?",
    "options": {
      "A": "Ly Chieu Hoang",
      "B": "Y Lan Nguyen Phi",
      "C": "Dang Thi Hue",
      "D": "Vo Mi Nuong"
    },
    "correctAnswer": "A",
    "explanation": "Ly Chieu Hoang is recognized as Vietnam's first and only reigning female monarch. The wording specifies 'female' to make the intended meaning clear."
  }),
  createQuestion({
    "id": "teacher-20oct-04",
    "type": "multiple-choice",
    "difficulty": "warm-up",
    "category": "Vietnamese Women",
    "question": "Who is known as the first female general in Vietnamese history?",
    "options": {
      "A": "Ho Xuan Huong",
      "B": "Nguyen Thi Minh Khai",
      "C": "Trung Trac",
      "D": "Bui Thi Xuan"
    },
    "correctAnswer": "C",
    "explanation": "The supplied question names Trung Trac as the correct choice."
  }),
  createQuestion({
    "id": "teacher-20oct-05",
    "type": "multiple-choice",
    "difficulty": "standard",
    "category": "October 20: Origins",
    "question": "What are the four fundamental virtues of traditional Vietnamese women?",
    "options": {
      "A": "Industriousness - Beauty - Eloquence - Virtue",
      "B": "Courage - Sport - Wealth - Fame",
      "C": "Wealth - Fame - Status - Luxury",
      "D": "Speed - Strength - Talent - Luck"
    },
    "correctAnswer": "A",
    "explanation": "The four traditional virtues are commonly expressed in English as Industriousness, Beauty, Eloquence and Virtue."
  }),
  createQuestion({
    "id": "teacher-20oct-06",
    "type": "image-choice",
    "difficulty": "standard",
    "category": "October 20: Picture Quiz",
    "question": "What kind of problem is this woman facing?",
    "options": {
      "A": "Infidelity",
      "B": "Domestic Violence",
      "C": "Housework",
      "D": "Raising children?"
    },
    "correctAnswer": "B",
    "explanation": "The image depicts violence against a woman; the supplied answer is Domestic Violence.",
    "image": "/questions/teacher-docx/domestic-violence.webp",
    "imageCredit": "Original photo cropped from the teacher's supplied Word document"
  }),
  createQuestion({
    "id": "teacher-20oct-07",
    "type": "image-choice",
    "difficulty": "standard",
    "category": "October 20: Picture Quiz",
    "question": "What kind of work is this woman doing?",
    "options": {
      "A": "Homework",
      "B": "Housework",
      "C": "Cooking",
      "D": "Feeding"
    },
    "correctAnswer": "B",
    "explanation": "The woman is cleaning the house. The supplied answer is Housework.",
    "image": "/questions/teacher-docx/housework.webp",
    "imageCredit": "Original photo cropped from the teacher's supplied Word document"
  }),
  createQuestion({
    "id": "teacher-20oct-08",
    "type": "multiple-choice",
    "difficulty": "standard",
    "category": "October 20: Activities",
    "question": "I am always right in every argument, especially on October 20th. Who am I?",
    "options": {
      "A": "The referee",
      "B": "The wife / The girlfriend!",
      "C": "The coach",
      "D": "The history teacher"
    },
    "correctAnswer": "B",
    "explanation": "This is a light-hearted riddle in the supplied document; the intended answer is 'The wife / The girlfriend!'."
  }),
  createQuestion({
    "id": "teacher-20oct-09",
    "type": "multiple-choice",
    "difficulty": "challenge",
    "category": "October 20: Origins",
    "question": "President Ho Chi Minh praised Vietnamese women as 'Heroic, Indomitable, Loyal and _______'. Which final quality completes the tribute?",
    "options": {
      "A": "Intelligent",
      "B": "Resourceful/Capable",
      "C": "Kind-hearted",
      "D": "Brave"
    },
    "correctAnswer": "B",
    "explanation": "The final quality is 'Resourceful and Capable'. This is an English rendering of the four qualities in the original tribute."
  }),
  createQuestion({
    "id": "teacher-20oct-10",
    "type": "multiple-choice",
    "difficulty": "challenge",
    "category": "Vietnamese Women",
    "question": "Who was the first female general of the Vietnam People's Army, famous for leading the \"Long-Haired Army\" in Ben Tre?",
    "options": {
      "A": "Nguyen Thi Binh",
      "B": "Nguyen Thi Dinh",
      "C": "Vo Thi Thang",
      "D": "Nguyen Thi Minh Khai"
    },
    "correctAnswer": "B",
    "explanation": "The document identifies Nguyen Thi Dinh, associated with the Long-Haired Army in Ben Tre."
  }),
  createQuestion({
    "id": "teacher-20oct-11",
    "type": "multiple-choice",
    "difficulty": "challenge",
    "category": "Vietnamese Women",
    "question": "Who wrote the famous wartime diary Last Night I Dreamed of Peace, which documented her heroic work as a doctor during the war before her death in 1970?",
    "options": {
      "A": "Vo Thi Sau",
      "B": "Dang Thuy Tram",
      "C": "Le Thi Hong Phong",
      "D": "Nguyen Thi Chien"
    },
    "correctAnswer": "B",
    "explanation": "Dang Thuy Tram wrote the wartime diary later published in English as Last Night I Dreamed of Peace."
  }),
  createQuestion({
    "id": "teacher-20oct-12",
    "type": "multiple-choice",
    "difficulty": "challenge",
    "category": "October 20: Activities",
    "question": "What is the main purpose of celebrating October 20th in schools and workplaces across Vietnam?",
    "options": {
      "A": "To organize sports tournaments",
      "B": "To honor female contributions, express gratitude, and promote gender equality",
      "C": "To mark the start of the winter holiday season",
      "D": "To hold elections for public leadership positions"
    },
    "correctAnswer": "B",
    "explanation": "October 20 honors women's contributions, expresses gratitude and supports gender equality."
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

/**
 * All game modes draw only the 12 questions supplied in the teacher's DOCX.
 * Each live room receives one unique shuffled deck, shared by all players.
 */
export function buildQuizRound(bank: Question[] = questionBank, count: number = QUESTIONS_PER_ROUND): Question[] {
  const safeCount = Math.max(0, Math.min(Math.floor(count), bank.length));
  return shuffleQuestions(bank).slice(0, safeCount).map(shuffleQuestionOptions);
}

export function buildContinuousQuiz(bank: Question[] = questionBank): Question[] {
  const ids = new Set<Question['id']>();
  for (const q of bank) {
    if (ids.has(q.id)) throw new Error('Duplicate question ID: '+q.id);
    ids.add(q.id);
  }
  return buildQuizRound(bank, bank.length);
}

/** A new solo round starts a fresh cycle only after all DOCX questions were shown. */
export function buildUnseenSoloRound(
  bank: Question[], seenIds: ReadonlyArray<string>, count: number = QUESTIONS_PER_ROUND
): {questions: Question[]; seenIds: string[]; cycleComplete: boolean} {
  const seen=new Set(seenIds);
  let available=bank.filter(q=>!seen.has(String(q.id)));
  const cycleComplete=available.length===0;
  if(cycleComplete){seen.clear();available=bank}
  const questions=buildQuizRound(available,Math.min(count,available.length));
  for(const q of questions)seen.add(String(q.id));
  return {questions,seenIds:Array.from(seen),cycleComplete};
}
