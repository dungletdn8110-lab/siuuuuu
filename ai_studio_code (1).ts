import { Question } from './types';

export const QUESTIONS_BANK: Question[] = [
  // --- NHÓM A: CÂU HỎI HÀNH ĐỘNG CỦA ANH VÀ PHÁP ---
  {
    id: 'A1',
    category: 'A',
    difficulty: 'medium',
    question: 'Vị vua Xiêm nào lên ngôi năm 1851 và được biết đến với tên Rama IV?',
    options: [
      { key: 'A', text: 'Rama I' },
      { key: 'B', text: 'Rama III' },
      { key: 'C', text: 'Rama IV' },
      { key: 'D', text: 'Rama V' },
    ],
    correctAnswer: 'C',
    explanation: 'Rama IV (vua Mongkut) trị vì từ 1851 đến 1868, giai đoạn Xiêm chủ động tăng cường quan hệ với phương Tây.'
  },
  {
    id: 'A2',
    category: 'A',
    difficulty: 'medium',
    question: 'Hiệp ước Bowring năm 1855 được ký giữa Xiêm và nước nào?',
    options: [
      { key: 'A', text: 'Pháp' },
      { key: 'B', text: 'Anh' },
      { key: 'C', text: 'Hà Lan' },
      { key: 'D', text: 'Bồ Đào Nha' },
    ],
    correctAnswer: 'B',
    explanation: 'Hiệp ước mở rộng thương mại với Anh và đặt ra các điều khoản có lợi cho Anh, hạn chế một phần tự chủ kinh tế của Xiêm.'
  },
  {
    id: 'A3',
    category: 'A',
    difficulty: 'hard',
    question: 'Vị vua nào gắn liền với các cuộc cải cách hành chính và hiện đại hóa Xiêm từ cuối thế kỉ XIX?',
    options: [
      { key: 'A', text: 'Rama II' },
      { key: 'B', text: 'Rama III' },
      { key: 'C', text: 'Rama IV' },
      { key: 'D', text: 'Rama V' },
    ],
    correctAnswer: 'D',
    explanation: 'Rama V (vua Chulalongkorn) thúc đẩy cải cách toàn diện bộ máy nhà nước, hành chính, tài chính và quân đội.'
  },
  {
    id: 'A4',
    category: 'A',
    difficulty: 'hard',
    question: 'Đến cuối thế kỉ XIX, ba khu vực thuộc địa quan trọng của Pháp ở Đông Dương là những nơi nào?',
    options: [
      { key: 'A', text: 'Việt Nam, Campuchia và Lào' },
      { key: 'B', text: 'Xiêm, Miến Điện và Mã Lai' },
      { key: 'C', text: 'Indonesia, Philippines và Singapore' },
      { key: 'D', text: 'Xiêm, Campuchia và Philippines' },
    ],
    correctAnswer: 'A',
    explanation: 'Pháp thiết lập quyền cai trị tại Việt Nam, Campuchia và mở rộng sang Lào trong thập niên 1890 hình thành Liên bang Đông Dương.'
  },
  {
    id: 'A5',
    category: 'A',
    difficulty: 'hard',
    question: 'Đến năm 1886, quốc gia nào ở Đông Nam Á đã bị Anh hoàn tất việc chinh phục và sáp nhập sau các cuộc chiến tranh Anh–Miến?',
    options: [
      { key: 'A', text: 'Xiêm' },
      { key: 'B', text: 'Miến Điện' },
      { key: 'C', text: 'Campuchia' },
      { key: 'D', text: 'Đại Nam' },
    ],
    correctAnswer: 'B',
    explanation: 'Sau chiến tranh Anh–Miến lần thứ 3 (1885), Anh sáp nhập Miến Điện vào lãnh thổ Ấn Độ thuộc Anh từ năm 1886.'
  },
  {
    id: 'A6',
    category: 'A',
    difficulty: 'hard',
    question: 'Cuộc khủng hoảng Xiêm–Pháp năm 1893 gắn với sự kiện quân Pháp gây sức ép tại cửa sông nào gần Bangkok?',
    options: [
      { key: 'A', text: 'Sông Mekong' },
      { key: 'B', text: 'Sông Hồng' },
      { key: 'C', text: 'Sông Chao Phraya' },
      { key: 'D', text: 'Sông Irrawaddy' },
    ],
    correctAnswer: 'C',
    explanation: 'Sự kiện tàu pháo Pháp tiến vào cửa sông Chao Phraya (sự kiện Paknam) năm 1893 uy hiếp kinh đô Bangkok.'
  },

  // --- NHÓM B: CÂU HỎI PHẢN HỒI ĐÀM PHÁN CỦA XIÊM ---
  {
    id: 'B1',
    category: 'B',
    difficulty: 'medium',
    question: 'Hiệp ước Bowring năm 1855 tác động trực tiếp đến lĩnh vực nào của Xiêm?',
    options: [
      { key: 'A', text: 'Thương mại và quan hệ kinh tế với Anh' },
      { key: 'B', text: 'Thành lập Liên Hợp Quốc' },
      { key: 'C', text: 'Gia nhập ASEAN' },
      { key: 'D', text: 'Chấm dứt mọi quan hệ với phương Tây' },
    ],
    correctAnswer: 'A',
    explanation: 'Hiệp ước tạo bước ngoặt lớn về thương mại tự do nhưng hạn chế quyền đánh thuế quan và tư pháp của Xiêm.'
  },
  {
    id: 'B2',
    category: 'B',
    difficulty: 'medium',
    question: 'Mục tiêu quan trọng của các cuộc cải cách dưới thời Rama V là gì?',
    options: [
      { key: 'A', text: 'Mở rộng chế độ thuộc địa của Pháp' },
      { key: 'B', text: 'Hiện đại hóa đất nước và bảo vệ nền độc lập' },
      { key: 'C', text: 'Chấm dứt mọi quan hệ ngoại giao' },
      { key: 'D', text: 'Chuyển toàn bộ quyền lực cho Anh' },
    ],
    correctAnswer: 'B',
    explanation: 'Cải cách bộ máy, xây dựng hạ tầng và tăng cường quyền lực trung ương để tránh bị các cường quốc can thiệp.'
  },
  {
    id: 'B3',
    category: 'B',
    difficulty: 'hard',
    question: 'Việc cải tổ hệ thống hành chính tập trung dưới thời Rama V có tác dụng chủ yếu nào?',
    options: [
      { key: 'A', text: 'Làm bộ máy nhà nước phân tán hơn' },
      { key: 'B', text: 'Tăng khả năng quản lý lãnh thổ và củng cố quyền lực trung ương' },
      { key: 'C', text: 'Trao quyền cai trị Xiêm cho Pháp' },
      { key: 'D', text: 'Xóa bỏ mọi hoạt động thương mại' },
    ],
    correctAnswer: 'B',
    explanation: 'Chuyển từ chế độ thủ lĩnh địa phương bán độc lập sang hệ thống tỉnh huyện do các bộ của trung ương điều hành.'
  },
  {
    id: 'B4',
    category: 'B',
    difficulty: 'hard',
    question: 'Trong cuộc khủng hoảng năm 1893, Xiêm phải nhượng lại các vùng lãnh thổ nằm về phía nào của sông Mekong cho Pháp?',
    options: [
      { key: 'A', text: 'Phía đông' },
      { key: 'B', text: 'Phía tây' },
      { key: 'C', text: 'Phía nam' },
      { key: 'D', text: 'Không có vùng nào' },
    ],
    correctAnswer: 'A',
    explanation: 'Xiêm phải ký hiệp ước ngày 3/10/1893 nhượng toàn bộ quyền hạn ở phía đông sông Mekong (Lào) cho Pháp.'
  },
  {
    id: 'B5',
    category: 'B',
    difficulty: 'hard',
    question: 'Vì sao việc ký các hiệp ước thương mại với phương Tây có thể đem lại cả lợi ích lẫn rủi ro cho Xiêm?',
    options: [
      { key: 'A', text: 'Chỉ làm Xiêm mất hoàn toàn mọi quan hệ quốc tế' },
      { key: 'B', text: 'Có thể thúc đẩy thương mại nhưng đồng thời hạn chế một số quyền tự chủ' },
      { key: 'C', text: 'Tự động khiến Xiêm trở thành cường quốc thuộc địa' },
      { key: 'D', text: 'Không tạo ra bất kỳ thay đổi nào' },
    ],
    correctAnswer: 'B',
    explanation: 'Thúc đẩy giao thương, thu thuế và hòa nhập kinh tế nhưng đi kèm điều khoản tối huệ quốc và quyền ngoại giao đặc quyền bất bình đẳng.'
  },
  {
    id: 'B6',
    category: 'B',
    difficulty: 'hard',
    question: 'Việc phát triển đường sá, đường sắt, giáo dục và bộ máy hành chính có ý nghĩa chiến lược gì đối với Xiêm?',
    options: [
      { key: 'A', text: 'Chỉ nhằm phục vụ du lịch' },
      { key: 'B', text: 'Tăng năng lực quản lý, hiện đại hóa và khả năng chống lại sức ép bên ngoài' },
      { key: 'C', text: 'Bảo đảm không bao giờ phải nhượng bộ lãnh thổ' },
      { key: 'D', text: 'Thay thế hoàn toàn ngoại giao bằng quân sự' },
    ],
    correctAnswer: 'B',
    explanation: 'Tăng tốc độ điều động lực lượng, bảo vệ biên cương và chứng minh với phương Tây rằng Xiêm là một nhà nước văn minh có chủ quyền.'
  },

  // --- NHÓM C: CÂU HỎI PHÒNG THỦ CỦA XIÊM ---
  {
    id: 'C1',
    category: 'C',
    difficulty: 'hard',
    question: 'Sự kiện Paknam năm 1893 thuộc cuộc khủng hoảng giữa Xiêm và nước nào?',
    options: [
      { key: 'A', text: 'Anh' },
      { key: 'B', text: 'Pháp' },
      { key: 'C', text: 'Hà Lan' },
      { key: 'D', text: 'Tây Ban Nha' },
    ],
    correctAnswer: 'B',
    explanation: 'Hai pháo hạm Inconstant và Comète của Pháp vượt qua pháo đài Paknam tiến vào Bangkok uy hiếp chính quyền Xiêm.'
  },
  {
    id: 'C2',
    category: 'C',
    difficulty: 'hard',
    question: 'Đâu là một yếu tố địa chính trị quan trọng giúp Xiêm có thể theo đuổi chính sách ngoại giao cân bằng?',
    options: [
      { key: 'A', text: 'Xiêm nằm giữa các khu vực ảnh hưởng của Anh và Pháp' },
      { key: 'B', text: 'Xiêm nằm hoàn toàn ngoài Đông Nam Á' },
      { key: 'C', text: 'Anh và Pháp không có thuộc địa trong khu vực' },
      { key: 'D', text: 'Xiêm kiểm soát toàn bộ Ấn Độ' },
    ],
    correctAnswer: 'A',
    explanation: 'Vị trí đệm giữa Miến Điện/Mã Lai (Anh) và Đông Dương (Pháp) giúp Xiêm vận dụng sự kiềm chế lẫn nhau giữa hai thế lực.'
  },
  {
    id: 'C3',
    category: 'C',
    difficulty: 'hard',
    question: 'Xiêm được xem là trường hợp đặc biệt trong lịch sử Đông Nam Á cuối thế kỉ XIX vì lý do nào?',
    options: [
      { key: 'A', text: 'Không có bất kỳ xung đột nào với phương Tây' },
      { key: 'B', text: 'Duy trì được nền độc lập chính thức trong khi nhiều nước láng giềng trở thành thuộc địa' },
      { key: 'C', text: 'Đã chinh phục toàn bộ Đông Dương' },
      { key: 'D', text: 'Không tiến hành cải cách' },
    ],
    correctAnswer: 'B',
    explanation: 'Nhờ chính sách ngoại giao mềm dẻo, chủ động cải cách và khai thác mâu thuẫn đế quốc, Xiêm là nước duy nhất giữ độc lập chủ quyền.'
  },

  // --- NHÓM D: CÂU HỎI ĐỐI ĐẦU ANH–PHÁP ---
  {
    id: 'D1',
    category: 'D',
    difficulty: 'very-hard',
    question: 'Hiệp ước năm 1893 giữa Xiêm và Pháp gắn với hệ quả nào sau đây?',
    options: [
      { key: 'A', text: 'Xiêm sáp nhập toàn bộ Lào' },
      { key: 'B', text: 'Xiêm từ bỏ yêu sách đối với các vùng lãnh thổ Lào ở phía đông sông Mekong' },
      { key: 'C', text: 'Pháp từ bỏ toàn bộ Đông Dương' },
      { key: 'D', text: 'Anh sáp nhập Bangkok' },
    ],
    correctAnswer: 'B',
    explanation: 'Xiêm nhượng toàn bộ quyền hạn tả ngạn sông Mekong cho Pháp, thiết lập quyền kiểm soát của Pháp đối với xứ Lào.'
  },
  {
    id: 'D2',
    category: 'D',
    difficulty: 'very-hard',
    question: 'Tuyên bố Anh–Pháp năm 1896 về Xiêm thường được nhắc đến với ý nghĩa nào?',
    options: [
      { key: 'A', text: 'Anh và Pháp công nhận Xiêm là chủ nhân của toàn bộ Đông Nam Á' },
      { key: 'B', text: 'Anh và Pháp thỏa thuận về việc bảo vệ một vùng đệm tại Xiêm, nhằm điều chỉnh cạnh tranh ảnh hưởng ở khu vực' },
      { key: 'C', text: 'Anh chuyển toàn bộ Miến Điện cho Xiêm' },
      { key: 'D', text: 'Pháp từ bỏ mọi quyền lợi tại Đông Dương' },
    ],
    correctAnswer: 'B',
    explanation: 'Hai cường quốc ký tuyên ước Luân Đôn 1896 cam kết không can thiệp quân sự vào lưu vực sông Menam (Chao Phraya), biến nó thành vùng đệm an toàn.'
  },
  {
    id: 'D3',
    category: 'D',
    difficulty: 'very-hard',
    question: 'Đâu là cách giải thích chính xác nhất về việc Xiêm duy trì độc lập chính thức cuối thế kỉ XIX?',
    options: [
      { key: 'A', text: 'Xiêm hoàn toàn không chịu sức ép từ phương Tây' },
      { key: 'B', text: 'Xiêm kết hợp cải cách, ngoại giao và khai thác sự cạnh tranh giữa Anh và Pháp, nhưng vẫn phải nhượng bộ một số lãnh thổ và quyền lợi' },
      { key: 'C', text: 'Xiêm chiến thắng quân sự mọi cường quốc châu Âu' },
      { key: 'D', text: 'Anh và Pháp không quan tâm đến Đông Nam Á' },
    ],
    correctAnswer: 'B',
    explanation: 'Độc lập được giữ vững nhờ chiến lược "ngoại giao cây tre", nhượng bộ một phần lãnh thổ biên viễn để bảo vệ sự tồn vong của trung tâm đất nước.'
  },

  // --- NHÓM E: CÂU HỎI DỰ PHÒNG PHÂN ĐỊNH ---
  {
    id: 'E1',
    category: 'E',
    difficulty: 'very-hard',
    question: 'Vua Rama V trị vì Xiêm trong khoảng thời gian nào?',
    options: [
      { key: 'A', text: '1782–1809' },
      { key: 'B', text: '1809–1824' },
      { key: 'C', text: '1851–1868' },
      { key: 'D', text: '1868–1910' },
    ],
    correctAnswer: 'D',
    explanation: 'Vua Rama V (Chulalongkorn) trị vì 42 năm từ năm 1868 đến khi qua đời năm 1910.'
  },
  {
    id: 'E2',
    category: 'E',
    difficulty: 'very-hard',
    question: 'Đâu là mô tả đúng nhất về hệ quả của các hiệp ước bất bình đẳng đối với Xiêm trong thế kỉ XIX?',
    options: [
      { key: 'A', text: 'Xiêm luôn giữ toàn quyền kiểm soát thuế quan và tư pháp trong mọi hiệp ước' },
      { key: 'B', text: 'Một số hiệp ước làm giảm quyền tự chủ về thuế quan và trao quyền đặc biệt cho người nước ngoài' },
      { key: 'C', text: 'Các hiệp ước tự động xóa bỏ mọi hoạt động thương mại' },
      { key: 'D', text: 'Các hiệp ước khiến Xiêm lập tức trở thành thuộc địa chính thức của Pháp' },
    ],
    correctAnswer: 'B',
    explanation: 'Các hiệp ước ngoại giao đặt ra mức thuế cố định 3% và trao quyền lãnh sự tài phán cho công dân ngoại quốc.'
  },
  {
    id: 'E3',
    category: 'E',
    difficulty: 'very-hard',
    question: 'Nhận định nào phân biệt chính xác nhất giữa cải cách trong nước và ngoại giao đối ngoại của Xiêm?',
    options: [
      { key: 'A', text: 'Cải cách trong nước tăng năng lực nhà nước; ngoại giao giúp Xiêm ứng phó với sức ép và cạnh tranh giữa các cường quốc' },
      { key: 'B', text: 'Cải cách trong nước và ngoại giao hoàn toàn không liên quan đến việc duy trì độc lập' },
      { key: 'C', text: 'Chỉ quân đội quyết định toàn bộ kết quả lịch sử' },
      { key: 'D', text: 'Ngoại giao có nghĩa là từ bỏ mọi cải cách' },
    ],
    correctAnswer: 'A',
    explanation: 'Hai nhân tố bổ trợ chặt chẽ: nội lực vững vàng tạo cơ sở cho ngoại giao linh hoạt giữ vững nền tự chủ.'
  }
];