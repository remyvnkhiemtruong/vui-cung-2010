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
    explanation: input.explanation,
    category: input.category,
  };
}

/**
 * Official Question Bank for Vietnamese Women's Day Quiz.
 */
export const questionBank: Question[] = [
  createQuestion({
    id: 1,
    type: 'multiple-choice',
    question: "When was Vietnamese Women's Day established?",
    options: {
      A: "20/10/1930",
      B: "20/10/1940",
      C: "20/10/1950",
      D: "20/10/1960",
    },
    correctAnswer: 'A',
    explanation: "Vietnamese Women's Day was officially established on October 20, 1930.",
    category: "History",
  }),
  createQuestion({
    id: 2,
    type: 'multiple-choice',
    question: 'How many women soldiers sacrificed at “Ngã Ba Đồng Lộc”?',
    options: {
      A: "9",
      B: "10",
      C: "11",
      D: "12",
    },
    correctAnswer: 'B',
    explanation: "10 brave young female youth volunteer soldiers sacrificed their lives at the Dong Loc T-junction in 1968.",
    category: "History",
  }),
  createQuestion({
    id: 3,
    type: 'multiple-choice',
    question: "Who is the first emperor (king) of Vietnam?",
    options: {
      A: "Lý Chiêu Hoàng",
      B: "Ỷ Lan Nguyên Phi",
      C: "Đặng Thị Huệ",
      D: "Võ Mị Nương",
    },
    correctAnswer: 'A',
    explanation: "Lý Chiêu Hoàng was the unique female monarch in the royal dynasties of Vietnam.",
    category: "Monarchy",
  }),
  createQuestion({
    id: 4,
    type: 'multiple-choice',
    question: "Who is known as the first female general in Vietnamese history?",
    options: {
      A: "Hồ Xuân Hương",
      B: "Nguyễn Thị Minh Khai",
      C: "Trưng Trắc",
      D: "Bùi Thị Xuân",
    },
    correctAnswer: 'C',
    explanation: "Hai Ba Trung (Trưng Trắc and Trưng Nhị) led the historic rebellion against Northern domination in 40 AD.",
    category: "National Heroes",
  }),
  createQuestion({
    id: 5,
    type: 'multiple-choice',
    question: "What are the four fundamental virtues of traditional Vietnamese women?",
    options: {
      A: "Industriousness – Beauty – Eloquence – Virtue",
      B: "Intelligence – Courage – Beauty – Kindness",
      C: "Loyalty – Intelligence – Courage – Virtue",
      D: "Beauty – Independence – Intelligence – Strength",
    },
    correctAnswer: 'A',
    explanation: "The traditional four virtues are Công (Industriousness), Dung (Beauty), Ngôn (Eloquence), and Hạnh (Virtue).",
    category: "Tradition & Culture",
  }),
  createQuestion({
    id: 6,
    type: 'image-choice',
    question: "What kind of problem is this woman facing?",
    options: {
      A: "Infidelity",
      B: "Domestic Violence",
      C: "Housework",
      D: "Raising children",
    },
    correctAnswer: 'B',
    image: "/questions/domestic-violence.png",
    explanation: "Domestic violence is a critical social issue addressed to protect women's physical and mental wellbeing.",
    category: "Social Awareness",
  }),
  createQuestion({
    id: 7,
    type: 'image-choice',
    question: "What kind of work is this woman doing?",
    options: {
      A: "Homework",
      B: "Housework",
      C: "Cooking",
      D: "Feeding",
    },
    correctAnswer: 'B',
    image: "/questions/housework.png",
    explanation: "Housework and domestic chores represent important everyday labor that deserves recognition and family sharing.",
    category: "Daily Life",
  }),
  createQuestion({
    id: 8,
    type: 'text-choice',
    question: "I am always right in every argument, especially on October 20th. Who am I?",
    options: {
      A: "The teacher",
      B: "The boss",
      C: "The wife / The girlfriend",
      D: "The friend",
    },
    correctAnswer: 'C',
    explanation: "A playful and loving tribute to all wives and girlfriends on Vietnamese Women's Day!",
    category: "Fun & Trivia",
  }),
  createQuestion({
    id: 9,
    type: 'multiple-choice',
    question: "President Ho Chi Minh awarded Vietnamese women eight golden words honoring their virtues:\n“Anh hùng, Bất khuất, Trung hậu, _______”.\nWhat is the fourth quality?",
    options: {
      A: "Intelligent",
      B: "Resourceful/Capable",
      C: "Kind-hearted",
      D: "Brave",
    },
    correctAnswer: 'B',
    explanation: "The fourth golden virtue is 'Đảm đang' (Resourceful / Capable).",
    category: "Tradition",
  }),
  createQuestion({
    id: 10,
    type: 'multiple-choice',
    question: "Who was the first female general of the Vietnam People's Army, famous for leading the “Long-Haired Army” in Ben Tre?",
    options: {
      A: "Nguyen Thi Binh",
      B: "Nguyen Thi Dinh",
      C: "Vo Thi Thang",
      D: "Nguyen Thi Minh Khai",
    },
    correctAnswer: 'B',
    explanation: "Major General Nguyen Thi Dinh was the legendary deputy commander and leader of the 'Long-Haired Army'.",
    category: "Military History",
  }),
  createQuestion({
    id: 11,
    type: 'multiple-choice',
    question: "Who wrote the famous wartime diary Last Night I Dreamed of Peace, which documented her heroic work as a doctor during the war before her death in 1970?",
    options: {
      A: "Vo Thi Sau",
      B: "Dang Thuy Tram",
      C: "Le Thi Hong Phong",
      D: "Nguyen Thi Chien",
    },
    correctAnswer: 'B',
    explanation: "Dr. Dang Thuy Tram authored the internationally acclaimed diary 'Last Night I Dreamed of Peace'.",
    category: "Literature & Memorial",
  }),
  createQuestion({
    id: 12,
    type: 'multiple-choice',
    question: "What is the main purpose of celebrating October 20th in schools and workplaces across Vietnam?",
    options: {
      A: "To organize sports tournaments",
      B: "To honor female contributions, express gratitude, and promote gender equality",
      C: "To mark the start of the winter holiday season",
      D: "To hold elections for public leadership positions",
    },
    correctAnswer: 'B',
    explanation: "October 20th honors women's tremendous contributions and fosters mutual gratitude and equality.",
    category: "Celebration Purpose",
  }),
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
