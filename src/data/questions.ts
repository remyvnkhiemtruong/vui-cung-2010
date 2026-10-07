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
 * Content is normalized in Vietnamese and expanded beyond the original 12-question source.
 */
export const QUESTIONS_PER_ROUND = 15;
export const questionBank: Question[] = [
  createQuestion({
    id: 1,
    type: "multiple-choice",
    question: "Ngày nào được lấy làm Ngày thành lập Hội Liên hiệp Phụ nữ Việt Nam?",
    options: {
      A: "20/10/1930",
      B: "20/10/1946",
      C: "8/3/1930",
      D: "2/9/1945",
    },
    correctAnswer: "A",
    explanation: "Hội nghị thống nhất Hội năm 1976 quyết định lấy ngày 20/10/1930 làm Ngày thành lập Hội Liên hiệp Phụ nữ Việt Nam.",
    category: "20/10 & Hội LHPN",
  }),
  createQuestion({
    id: 2,
    type: "multiple-choice",
    question: "Có bao nhiêu nữ thanh niên xung phong đã anh dũng hy sinh tại Ngã ba Đồng Lộc ngày 24/7/1968?",
    options: {
      A: "8",
      B: "9",
      C: "10",
      D: "12",
    },
    correctAnswer: "C",
    explanation: "Mười nữ thanh niên xung phong của Tiểu đội 4 đã hy sinh tại Ngã ba Đồng Lộc khi đang làm nhiệm vụ bảo đảm giao thông.",
    category: "Lịch sử & Nhân vật",
  }),
  createQuestion({
    id: 3,
    type: "multiple-choice",
    question: "Ai được biết đến là nữ hoàng duy nhất trong lịch sử các triều đại phong kiến Việt Nam?",
    options: {
      A: "Lý Chiêu Hoàng",
      B: "Ỷ Lan",
      C: "Dương Vân Nga",
      D: "Ngọc Hân công chúa",
    },
    correctAnswer: "A",
    explanation: "Lý Chiêu Hoàng là nữ hoàng duy nhất trong lịch sử quân chủ Việt Nam; cách hỏi này chính xác hơn câu cũ “vị vua đầu tiên của Việt Nam”.",
    category: "Lịch sử & Nhân vật",
  }),
  createQuestion({
    id: 4,
    type: "multiple-choice",
    question: "Cuộc khởi nghĩa Hai Bà Trưng bùng nổ vào năm nào?",
    options: {
      A: "Năm 40",
      B: "Năm 248",
      C: "Năm 544",
      D: "Năm 938",
    },
    correctAnswer: "A",
    explanation: "Tháng 2 năm Canh Tý (năm 40), Trưng Trắc cùng Trưng Nhị phát động khởi nghĩa chống ách đô hộ Đông Hán.",
    category: "Lịch sử & Nhân vật",
  }),
  createQuestion({
    id: 5,
    type: "multiple-choice",
    question: "“Tứ đức” thường được nhắc đến trong quan niệm truyền thống về người phụ nữ Việt Nam là gì?",
    options: {
      A: "Công – Dung – Ngôn – Hạnh",
      B: "Nhân – Lễ – Nghĩa – Trí",
      C: "Cần – Kiệm – Liêm – Chính",
      D: "Trung – Hiếu – Tiết – Nghĩa",
    },
    correctAnswer: "A",
    explanation: "Bốn phẩm chất thường được gọi là Công, Dung, Ngôn, Hạnh.",
    category: "Văn hóa & Tri thức",
  }),
  createQuestion({
    id: 6,
    type: "image-choice",
    question: "Hình ảnh này gợi đến vấn đề xã hội nào cần được phòng ngừa và lên tiếng?",
    options: {
      A: "Tranh luận thông thường",
      B: "Bạo lực gia đình",
      C: "Khác biệt sở thích",
      D: "Phân công việc học",
    },
    correctAnswer: "B",
    image: "/questions/domestic-violence.png",
    explanation: "Bạo lực gia đình có thể gây tổn hại hoặc nguy cơ tổn hại về thể chất, tinh thần, tình dục hoặc kinh tế đối với thành viên gia đình.",
    category: "Bình đẳng & Kỹ năng",
  }),
  createQuestion({
    id: 7,
    type: "image-choice",
    question: "Thông điệp phù hợp nhất khi nói về công việc nhà trong gia đình là gì?",
    options: {
      A: "Chỉ phụ nữ mới nên làm",
      B: "Nên được chia sẻ phù hợp giữa các thành viên",
      C: "Không cần phân công",
      D: "Chỉ người lớn tuổi làm",
    },
    correctAnswer: "B",
    image: "/questions/housework.png",
    explanation: "Chia sẻ việc nhà hợp lý thể hiện sự tôn trọng, trách nhiệm và tinh thần bình đẳng giữa các thành viên.",
    category: "Bình đẳng & Kỹ năng",
  }),
  createQuestion({
    id: 8,
    type: "text-choice",
    question: "Hành động nào thể hiện sự tôn trọng ý nghĩa ngày 20/10 một cách phù hợp nhất?",
    options: {
      A: "Chỉ tặng quà đắt tiền",
      B: "Gửi lời chúc chân thành và trân trọng những đóng góp hằng ngày",
      C: "Trêu chọc bằng định kiến giới",
      D: "Ép mọi người phải tham gia hoạt động",
    },
    correctAnswer: "B",
    explanation: "Tinh thần cốt lõi là sự trân trọng, biết ơn và ứng xử bình đẳng, không phụ thuộc vào giá trị vật chất.",
    category: "20/10 & Hội LHPN",
  }),
  createQuestion({
    id: 9,
    type: "multiple-choice",
    question: "Trong tám chữ vàng Bác Hồ tặng phụ nữ Việt Nam: “Anh hùng, Bất khuất, Trung hậu, ______”, từ còn thiếu là gì?",
    options: {
      A: "Đảm đang",
      B: "Dũng cảm",
      C: "Thông minh",
      D: "Nhân ái",
    },
    correctAnswer: "A",
    explanation: "Cụm từ đầy đủ là “Anh hùng, Bất khuất, Trung hậu, Đảm đang”.",
    category: "20/10 & Hội LHPN",
  }),
  createQuestion({
    id: 10,
    type: "multiple-choice",
    question: "Nữ tướng nào gắn liền với phong trào “Đội quân tóc dài” ở Bến Tre?",
    options: {
      A: "Nguyễn Thị Bình",
      B: "Nguyễn Thị Định",
      C: "Võ Thị Thắng",
      D: "Nguyễn Thị Minh Khai",
    },
    correctAnswer: "B",
    explanation: "Nguyễn Thị Định là gương mặt tiêu biểu của phong trào Đồng khởi Bến Tre và “Đội quân tóc dài”.",
    category: "Lịch sử & Nhân vật",
  }),
  createQuestion({
    id: 11,
    type: "multiple-choice",
    question: "Nhật ký nổi tiếng được xuất bản với tên “Nhật ký Đặng Thùy Trâm” là của ai?",
    options: {
      A: "Võ Thị Sáu",
      B: "Đặng Thùy Trâm",
      C: "Nguyễn Thị Bình",
      D: "Nguyễn Thị Minh Khai",
    },
    correctAnswer: "B",
    explanation: "Bác sĩ Đặng Thùy Trâm để lại những trang nhật ký chiến trường giàu giá trị lịch sử và nhân văn.",
    category: "Văn hóa & Tri thức",
  }),
  createQuestion({
    id: 12,
    type: "multiple-choice",
    question: "Ý nghĩa phù hợp nhất của các hoạt động kỷ niệm 20/10 trong trường học và cơ quan là gì?",
    options: {
      A: "Chỉ tổ chức văn nghệ",
      B: "Tôn vinh đóng góp của phụ nữ, bày tỏ sự trân trọng và lan tỏa bình đẳng giới",
      C: "Chỉ tổ chức thi đấu thể thao",
      D: "Thay thế Ngày Quốc tế Phụ nữ 8/3",
    },
    correctAnswer: "B",
    explanation: "20/10 là dịp tôn vinh phụ nữ Việt Nam, đồng thời giáo dục sự tôn trọng và bình đẳng.",
    category: "20/10 & Hội LHPN",
  }),
  createQuestion({
    id: 13,
    type: "multiple-choice",
    question: "Năm 1976, Hội nghị thống nhất tổ chức phụ nữ trong cả nước đã quyết định điều gì liên quan đến ngày 20/10?",
    options: {
      A: "Lấy 20/10/1930 làm Ngày thành lập Hội LHPN Việt Nam",
      B: "Đổi ngày 20/10 thành 8/3",
      C: "Bãi bỏ hoạt động kỷ niệm 20/10",
      D: "Chỉ tổ chức 20/10 ở miền Bắc",
    },
    correctAnswer: "A",
    explanation: "Hội nghị thống nhất tháng 6/1976 quyết định lấy ngày 20/10/1930 làm Ngày thành lập Hội Liên hiệp Phụ nữ Việt Nam.",
    category: "20/10 & Hội LHPN",
  }),
  createQuestion({
    id: 14,
    type: "multiple-choice",
    question: "Trong Cương lĩnh đầu tiên của Đảng năm 1930, nội dung nào thể hiện sớm quan điểm về bình đẳng giới?",
    options: {
      A: "Nam nữ bình quyền",
      B: "Mọi người cùng tuổi nghỉ hưu",
      C: "Mọi gia đình có cùng thu nhập",
      D: "Chỉ phụ nữ tham gia đoàn thể",
    },
    correctAnswer: "A",
    explanation: "Tài liệu lịch sử của Hội LHPN Việt Nam ghi nhận Cương lĩnh đầu tiên của Đảng năm 1930 nêu chủ trương “nam nữ bình quyền”.",
    category: "20/10 & Hội LHPN",
  }),
  createQuestion({
    id: 15,
    type: "multiple-choice",
    question: "Phong trào phụ nữ nổi bật ở miền Bắc trong thời kỳ chống Mỹ được nhắc đến với tên gọi nào?",
    options: {
      A: "Ba đảm đang",
      B: "Ba sẵn sàng",
      C: "Năm xung phong",
      D: "Tuổi trẻ giữ nước",
    },
    correctAnswer: "A",
    explanation: "Phong trào “Ba đảm đang” của phụ nữ miền Bắc là một phong trào yêu nước rộng khắp trong thời kỳ chống Mỹ.",
    category: "20/10 & Hội LHPN",
  }),
  createQuestion({
    id: 16,
    type: "multiple-choice",
    question: "Phong trào phụ nữ miền Nam được Bác Hồ biểu dương cùng với “Ba đảm đang” của phụ nữ miền Bắc là phong trào nào?",
    options: {
      A: "5 tốt",
      B: "5 xung kích",
      C: "3 trách nhiệm",
      D: "4 đồng hành",
    },
    correctAnswer: "A",
    explanation: "Tài liệu của Hội LHPN Việt Nam ghi lại Bác Hồ đánh giá cao phong trào “5 tốt” của phụ nữ miền Nam và “Ba đảm đang” của phụ nữ miền Bắc.",
    category: "20/10 & Hội LHPN",
  }),
  createQuestion({
    id: 17,
    type: "multiple-choice",
    question: "Bà Triệu (Triệu Thị Trinh) lãnh đạo cuộc khởi nghĩa chống quân Ngô vào năm nào?",
    options: {
      A: "Năm 40",
      B: "Năm 248",
      C: "Năm 542",
      D: "Năm 905",
    },
    correctAnswer: "B",
    explanation: "Khởi nghĩa Bà Triệu bùng nổ năm 248 tại Cửu Chân và lan rộng ra nhiều nơi.",
    category: "Lịch sử & Nhân vật",
  }),
  createQuestion({
    id: 18,
    type: "multiple-choice",
    question: "Trưng Nhị có quan hệ như thế nào với Trưng Trắc?",
    options: {
      A: "Em gái",
      B: "Mẹ",
      C: "Con gái",
      D: "Chị dâu",
    },
    correctAnswer: "A",
    explanation: "Trưng Trắc và Trưng Nhị là hai chị em; các tài liệu lịch sử thường gọi Trưng Nhị là em của Trưng Trắc.",
    category: "Lịch sử & Nhân vật",
  }),
  createQuestion({
    id: 19,
    type: "multiple-choice",
    question: "Nữ sĩ nào được biết đến với danh xưng “Bà chúa thơ Nôm”?",
    options: {
      A: "Hồ Xuân Hương",
      B: "Xuân Quỳnh",
      C: "Đoàn Thị Điểm",
      D: "Bà Huyện Thanh Quan",
    },
    correctAnswer: "A",
    explanation: "Hồ Xuân Hương được biết đến rộng rãi với danh xưng “Bà chúa thơ Nôm”.",
    category: "Văn hóa & Tri thức",
  }),
  createQuestion({
    id: 20,
    type: "multiple-choice",
    question: "Bài thơ “Sóng” là sáng tác nổi tiếng của nữ thi sĩ nào?",
    options: {
      A: "Xuân Quỳnh",
      B: "Hồ Xuân Hương",
      C: "Anh Thơ",
      D: "Lâm Thị Mỹ Dạ",
    },
    correctAnswer: "A",
    explanation: "“Sóng” là một trong những bài thơ nổi tiếng nhất của Xuân Quỳnh.",
    category: "Văn hóa & Tri thức",
  }),
  createQuestion({
    id: 21,
    type: "multiple-choice",
    question: "Ngày Quốc tế Phụ nữ được kỷ niệm vào ngày nào hằng năm?",
    options: {
      A: "8/3",
      B: "20/10",
      C: "28/6",
      D: "20/11",
    },
    correctAnswer: "A",
    explanation: "Ngày Quốc tế Phụ nữ là 8/3; còn 20/10 là ngày gắn với phụ nữ Việt Nam và Hội LHPN Việt Nam.",
    category: "Văn hóa & Tri thức",
  }),
  createQuestion({
    id: 22,
    type: "multiple-choice",
    question: "Luật Bình đẳng giới của Việt Nam được Quốc hội thông qua vào năm nào?",
    options: {
      A: "2004",
      B: "2006",
      C: "2013",
      D: "2022",
    },
    correctAnswer: "B",
    explanation: "Luật Bình đẳng giới số 73/2006/QH11 được Quốc hội khóa XI thông qua năm 2006.",
    category: "Bình đẳng & Kỹ năng",
  }),
  createQuestion({
    id: 23,
    type: "multiple-choice",
    question: "Hiến pháp năm 2013 quy định tại Điều 26 nội dung nào sau đây?",
    options: {
      A: "Công dân nam, nữ bình đẳng về mọi mặt và nghiêm cấm phân biệt đối xử về giới",
      B: "Chỉ nam giới có quyền tham gia quản lý nhà nước",
      C: "Phụ nữ không được tự chọn nghề nghiệp",
      D: "Mỗi giới phải học ngành riêng",
    },
    correctAnswer: "A",
    explanation: "Điều 26 Hiến pháp 2013 khẳng định công dân nam, nữ bình đẳng về mọi mặt và nghiêm cấm phân biệt đối xử về giới.",
    category: "Bình đẳng & Kỹ năng",
  }),
  createQuestion({
    id: 24,
    type: "multiple-choice",
    question: "Theo Luật Bình đẳng giới, nội dung nào phù hợp với bình đẳng giới trong lĩnh vực lao động?",
    options: {
      A: "Nam, nữ được đối xử bình đẳng về việc làm, tiền công, tiền thưởng và điều kiện lao động",
      B: "Cùng công việc nhưng mặc định nam được trả lương cao hơn",
      C: "Chỉ nữ mới được hưởng bảo hiểm xã hội",
      D: "Chỉ nam mới được đề bạt",
    },
    correctAnswer: "A",
    explanation: "Luật quy định nam, nữ bình đẳng trong tuyển dụng và được đối xử bình đẳng tại nơi làm việc về việc làm, tiền công, tiền thưởng, bảo hiểm xã hội và điều kiện lao động.",
    category: "Bình đẳng & Kỹ năng",
  }),
  createQuestion({
    id: 25,
    type: "multiple-choice",
    question: "Theo Luật Bình đẳng giới, trong giáo dục và đào tạo, nam và nữ có quyền nào sau đây?",
    options: {
      A: "Bình đẳng trong lựa chọn ngành, nghề học tập và tiếp cận chính sách giáo dục",
      B: "Chỉ học các ngành được quy định theo giới",
      C: "Nữ phải học muộn hơn nam",
      D: "Nam được ưu tiên mặc định ở mọi ngành",
    },
    correctAnswer: "A",
    explanation: "Luật Bình đẳng giới quy định nam, nữ bình đẳng về độ tuổi đi học, lựa chọn ngành nghề và tiếp cận các chính sách giáo dục, đào tạo.",
    category: "Bình đẳng & Kỹ năng",
  }),
  createQuestion({
    id: 26,
    type: "multiple-choice",
    question: "Luật Phòng, chống bạo lực gia đình năm 2022 có hiệu lực từ thời điểm nào?",
    options: {
      A: "01/01/2023",
      B: "01/07/2023",
      C: "20/10/2023",
      D: "01/01/2024",
    },
    correctAnswer: "B",
    explanation: "Luật Phòng, chống bạo lực gia đình năm 2022 có hiệu lực thi hành từ ngày 01/07/2023.",
    category: "Bình đẳng & Kỹ năng",
  }),
  createQuestion({
    id: 27,
    type: "multiple-choice",
    question: "Theo quy định hiện hành, bạo lực gia đình có thể gây tổn hại ở những phương diện nào?",
    options: {
      A: "Chỉ thể chất",
      B: "Thể chất, tinh thần, tình dục hoặc kinh tế",
      C: "Chỉ kinh tế",
      D: "Chỉ khi có thương tích nhìn thấy được",
    },
    correctAnswer: "B",
    explanation: "Pháp luật tiếp cận bạo lực gia đình theo nhiều dạng tổn hại, không chỉ giới hạn ở bạo lực thể chất.",
    category: "Bình đẳng & Kỹ năng",
  }),
  createQuestion({
    id: 28,
    type: "text-choice",
    question: "Nếu một người cố tình kiểm soát toàn bộ tiền bạc để làm thành viên khác phụ thuộc và không thể tự quyết các nhu cầu thiết yếu, đây có thể là dạng bạo lực nào?",
    options: {
      A: "Bạo lực kinh tế",
      B: "Hoạt động tiết kiệm bình thường",
      C: "Phân công học tập",
      D: "Giao tiếp tích cực",
    },
    correctAnswer: "A",
    explanation: "Kiểm soát tài sản, thu nhập hoặc tạo sự phụ thuộc về kinh tế có thể thuộc nhóm hành vi bạo lực gia đình theo quy định pháp luật.",
    category: "Bình đẳng & Kỹ năng",
  }),
  createQuestion({
    id: 29,
    type: "text-choice",
    question: "Khi biết một người có nguy cơ bị bạo lực gia đình, cách ứng xử nào phù hợp nhất?",
    options: {
      A: "Đổ lỗi cho người bị bạo lực",
      B: "Khuyên giữ kín bằng mọi giá",
      C: "Ưu tiên an toàn, lắng nghe và hỗ trợ tìm người/cơ quan đáng tin cậy",
      D: "Đăng ngay thông tin riêng tư lên mạng",
    },
    correctAnswer: "C",
    explanation: "Cách hỗ trợ phù hợp cần đặt sự an toàn và quyền riêng tư của người bị bạo lực lên trước, đồng thời kết nối họ với nguồn trợ giúp đáng tin cậy.",
    category: "Bình đẳng & Kỹ năng",
  }),
  createQuestion({
    id: 30,
    type: "multiple-choice",
    question: "Ai được bầu làm Hội trưởng Hội Liên hiệp Phụ nữ Việt Nam khi tổ chức này chính thức thành lập với tên gọi hiện nay vào năm 1946?",
    options: {
      A: "Lê Thị Xuyến",
      B: "Nguyễn Thị Định",
      C: "Hà Thị Quế",
      D: "Nguyễn Thị Bình",
    },
    correctAnswer: "A",
    explanation: "Ngày 20/10/1946, Hội Liên hiệp Phụ nữ Việt Nam với tên gọi hiện nay chính thức được thành lập và bà Lê Thị Xuyến được bầu làm Hội trưởng.",
    category: "20/10 & Hội LHPN",
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
    const category = question.category || 'Khác';
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
