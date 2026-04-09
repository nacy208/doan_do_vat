'use strict';
// ============================================================
// CẤU HÌNH THEO CẤP ĐỘ
// ============================================================
var LEVEL_CONFIG = {
  easy:    { label:'🟢 Dễ',         time:40, aiDelay:[18000,24000],  eventRate:0,   bossDelay:[1500,2500]  },
  medium:  { label:'🟡 Trung Bình', time:30, aiDelay:[12000,16000],  eventRate:0.5, bossDelay:[1000,2000]  },
  hard:    { label:'🔴 Khó',        time:20, aiDelay:[7000,10000],   eventRate:1.0, bossDelay:[600,1200]   },
  predict: { label:'🧠 Đoán Ý AI',  time:30, aiDelay:[12000,16000],  eventRate:0,   bossDelay:[1000,2000]  },
  custom:  { label:'🧩 Tự Tạo',     time:35, aiDelay:[14000,18000],  eventRate:0,   bossDelay:[1000,2000]  }
};

// ============================================================
// DỮ LIỆU 20 ĐỒ VẬT
// ============================================================
var OBJECTS = [
  { name:"Laptop",
    features:{dungDienNang:true,coManHinh:true,coBanPhim:true,coTheGapLai:true,diDong:true,coPin:true,coLoa:true,coCamera:true,dungDeHoc:true,coNhieu:true,coNuoc:false,coLua:false,hinhDang:"chữ nhật",chatLieu:"điện tử",coVach:false},
    hints:["Đồ điện tử sạc pin","Có màn hình và nhiều nút bấm","Mỏng nhẹ mang đi được","Dùng để lên mạng","Có bàn phím và màn hình gập lại được như cuốn sách"],
    choices:["Ly nước","Laptop","Cục tẩy","Tivi"] },
  { name:"Điện thoại",
    features:{dungDienNang:true,coManHinh:true,coBanPhim:false,coTheGapLai:false,diDong:true,coPin:true,coLoa:true,coCamera:true,dungDeHoc:false,coNhieu:false,coNuoc:false,coLua:false,hinhDang:"chữ nhật",chatLieu:"điện tử",coVach:false},
    hints:["Đồ điện tử nhỏ gọn","Cần sạc pin mỗi ngày","Bỏ vừa túi quần, mang theo người","Có camera để chụp ảnh selfie","có thể gọi điện và nhắn tin "],
    choices:["Hộp bút","Điện thoại","Cục tẩy","Thước"] },
 { name:"Máy tính bảng",
   features:{dungDienNang:true,coManHinh:true,coBanPhim:false,coTheGapLai:false,diDong:true,coPin:true,coLoa:true,coCamera:true,dungDeHoc:true,coNhieu:false,coNuoc:false,coLua:false,hinhDang:"chữ nhật",chatLieu:"điện tử",coVach:false},
   hints:["Thiết bị có màn hình","Cảm ứng không bàn phím","Dùng pin mang theo","Xem học giải trí","Viết vẽ bằng bút"],
   choices:["Gương","Máy tính bảng","Tủ đồ","Kéo"] },

 { name:"Tivi",
   features:{dungDienNang:true,coManHinh:true,coBanPhim:false,coTheGapLai:false,diDong:false,coPin:false,coLoa:true,coCamera:false,dungDeHoc:false,coNhieu:false,coNuoc:false,coLua:false,hinhDang:"chữ nhật",chatLieu:"điện tử",coVach:false},
   hints:["Màn hình rất lớn","Có loa phát tiếng","Cắm điện sử dụng","Đặt cố định nhà","Xem cùng gia đình"],
   choices:["Đồng hồ","Tivi","Chai nước","Máy phát nhạc"] },

 { name:"Đồng hồ đeo tay",
   features:{dungDienNang:false,coManHinh:true,coBanPhim:false,coTheGapLai:false,diDong:true,coPin:true,coLoa:false,coCamera:false,dungDeHoc:false,coNhieu:false,coNuoc:false,coLua:false,hinhDang:"tròn",chatLieu:"kim loại",coVach:false},
   hints:["Đeo trên cổ tay","Xem giờ nhanh","Chạy bằng pin nhỏ","Kích thước rất nhỏ","Dùng mỗi ngày"],
   choices:["Kẹo","Đồng hồ đeo tay","Tai Nghe","Bút máy"] },

 { name:"Sách",
   features:{dungDienNang:false,coManHinh:false,coBanPhim:false,coTheGapLai:true,diDong:true,coPin:false,coLoa:false,coCamera:false,dungDeHoc:true,coNhieu:false,coNuoc:false,coLua:false,hinhDang:"chữ nhật",chatLieu:"giấy",coVach:false},
   hints:["Làm từ giấy","Có nhiều trang","Lật từng trang đọc","Dùng để học","Mang theo dễ"],
   choices:["Gương","Sách","Thước kẻ","bảng đen"] },

 { name:"Cái bàn",
   features:{dungDienNang:false,coManHinh:false,coBanPhim:false,coTheGapLai:false,diDong:false,coPin:false,coLoa:false,coCamera:false,dungDeHoc:true,coNhieu:false,coNuoc:false,coLua:false,hinhDang:"chữ nhật",chatLieu:"gỗ/nhựa",coVach:false},
   hints:["Có mặt phẳng rộng","Có bốn chân","Đặt cố định","Để đồ lên trên","Ngồi học làm việc"],
   choices:["Cái cửa","Cái bàn","Ống hút","Kéo"] },

 { name:"Xe đạp",
   features:{dungDienNang:false,coManHinh:false,coBanPhim:false,coTheGapLai:false,diDong:true,coPin:false,coLoa:false,coCamera:false,dungDeHoc:false,coNhieu:false,coNuoc:false,coLua:false,hinhDang:"phức tạp",chatLieu:"kim loại",coVach:false},
   hints:["Có hai bánh","Đạp chân để đi","Không cần xăng điện","Có tay lái","Dùng để di chuyển"],
   choices:["Quạt điện","Xe đạp","Tủ đồ","Ô tô"] },

 { name:"Bóng đèn",
   features:{dungDienNang:true,coManHinh:false,coBanPhim:false,coTheGapLai:false,diDong:false,coPin:false,coLoa:false,coCamera:false,dungDeHoc:false,coNhieu:false,coNuoc:false,coLua:false,hinhDang:"tròn",chatLieu:"điện tử",coVach:false},
   hints:["Phát ra ánh sáng","Cần điện hoạt động","Gắn trên trần","Hình tròn nhỏ","Chiếu sáng ban đêm"],
   choices:["Kẹo","Bóng đèn","Tẩy","Hộp bút"] },

 { name:"Bàn phím máy tính",
   features:{dungDienNang:true,coManHinh:false,coBanPhim:true,coTheGapLai:false,diDong:true,coPin:false,coLoa:false,coCamera:false,dungDeHoc:true,coNhieu:true,coNuoc:false,coLua:false,hinhDang:"chữ nhật",chatLieu:"điện tử",coVach:false},
   hints:["Có nhiều phím","Dùng gõ chữ","Không có màn hình","Nối với máy tính","Đặt trước màn hình"],
   choices:["Cái bàn","Bàn phím máy tính","Tủ sách","Cái rổ"] },

 { name:"Tủ lạnh",
   features:{dungDienNang:true,coManHinh:false,coBanPhim:false,coTheGapLai:false,diDong:false,coPin:false,coLoa:false,coCamera:false,dungDeHoc:false,coNhieu:false,coNuoc:true,coLua:false,hinhDang:"chữ nhật",chatLieu:"kim loại",coVach:false},
   hints:["Bên trong rất lạnh","Giữ thức ăn tươi","Có ngăn làm đá","Cắm điện liên tục","Đặt trong bếp"],
   choices:["Máy giặt","Tủ lạnh","Cái nón","Com - pa"] },

 { name:"Máy giặt",
   features:{dungDienNang:true,coManHinh:false,coBanPhim:false,coTheGapLai:false,diDong:false,coPin:false,coLoa:false,coCamera:false,dungDeHoc:false,coNhieu:false,coNuoc:true,coLua:false,hinhDang:"phức tạp",chatLieu:"kim loại",coVach:false},
   hints:["Giặt quần áo","Cần nước điện","Có lồng quay","Kêu khi chạy","Đặt cố định"],
   choices:["Cái bát","Máy giặt","Cái Tô","Cây chổi"] },

 { name:"Nồi cơm điện",
   features:{dungDienNang:true,coManHinh:false,coBanPhim:false,coTheGapLai:false,diDong:false,coPin:false,coLoa:false,coCamera:false,dungDeHoc:false,coNhieu:false,coNuoc:true,coLua:true,hinhDang:"tròn",chatLieu:"kim loại",coVach:false},
   hints:["Nấu cơm bằng điện","Có nắp đậy","Tỏa hơi nóng","Tự giữ ấm","Dùng trong bếp"],
   choices:["Cái thước","Nồi cơm điện","Cái kéo","Bình hoa"] },

 { name:"Cây bút",
   features:{dungDienNang:false,coManHinh:false,coBanPhim:false,coTheGapLai:false,diDong:true,coPin:false,coLoa:false,coCamera:false,dungDeHoc:true,coNhieu:false,coNuoc:false,coLua:false,hinhDang:"dài",chatLieu:"gỗ/nhựa",coVach:false},
   hints:["Dùng để viết","Có mực bên trong","Nhỏ gọn mang theo","Không cần điện","Cầm bằng tay"],
   choices:["Thước kẻ","Cây bút","Bàn phím máy tính","Cục tẩy"] },

 { name:"Thước kẻ",
   features:{dungDienNang:false,coManHinh:false,coBanPhim:false,coTheGapLai:false,diDong:true,coPin:false,coLoa:false,coCamera:false,dungDeHoc:true,coNhieu:false,coNuoc:false,coLua:false,hinhDang:"dài",chatLieu:"gỗ/nhựa",coVach:true},
   hints:["Có vạch đo","Dùng kẻ thẳng","Dài và dẹt","Đo chiều dài","Để trong hộp bút"],
   choices:["Cây bút","Thước kẻ","Cục tẩy","Compa"] },

 { name:"Cái ghế",
   features:{dungDienNang:false,coManHinh:false,coBanPhim:false,coTheGapLai:false,diDong:false,coPin:false,coLoa:false,coCamera:false,dungDeHoc:false,coNhieu:false,coNuoc:false,coLua:false,hinhDang:"phức tạp",chatLieu:"gỗ/nhựa",coVach:false},
   hints:["Dùng để ngồi","Có tựa lưng","Có bốn chân","Đặt gần bàn","Làm bằng gỗ nhựa"],
   choices:["Cục tẩy","Cái ghế","Kẹo","Móc khóa"] },

 { name:"Đèn pin",
   features:{dungDienNang:true,coManHinh:false,coBanPhim:false,coTheGapLai:false,diDong:true,coPin:true,coLoa:false,coCamera:false,dungDeHoc:false,coNhieu:false,coNuoc:false,coLua:false,hinhDang:"dài",chatLieu:"kim loại",coVach:false},
   hints:["Cầm tay chiếu sáng","Chạy bằng pin","Chiếu một hướng","Dùng khi tối","Mang theo dễ"],
   choices:["Cái bàn","Đèn pin","Cục tẩy","Com - pa"] },

 { name:"Cái mũ",
   features:{dungDienNang:false,coManHinh:false,coBanPhim:false,coTheGapLai:true,diDong:true,coPin:false,coLoa:false,coCamera:false,dungDeHoc:false,coNhieu:false,coNuoc:false,coLua:false,hinhDang:"tròn",chatLieu:"vải",coVach:false},
   hints:["Đội lên đầu","Che nắng mưa","Làm bằng vải","Nhẹ dễ mang","Có nhiều kiểu"],
   choices:["Khăn quàng cổ","Cái mũ","Kính mắt","Vòng tay"] },

 { name:"Máy ảnh",
   features:{dungDienNang:true,coManHinh:true,coBanPhim:false,coTheGapLai:false,diDong:true,coPin:true,coLoa:false,coCamera:true,dungDeHoc:false,coNhieu:false,coNuoc:false,coLua:false,hinhDang:"chữ nhật",chatLieu:"điện tử",coVach:false},
   hints:["Dùng để chụp ảnh","Có ống kính","Có màn hình nhỏ","Mang theo được","Lưu giữ kỷ niệm"],
   choices:["Cái bàn","Máy ảnh","Ống nhòm","Kính lúp"] },

 { name:"Lò vi sóng",
   features:{dungDienNang:true,coManHinh:false,coBanPhim:false,coTheGapLai:false,diDong:false,coPin:false,coLoa:false,coCamera:false,dungDeHoc:false,coNhieu:false,coNuoc:false,coLua:true,hinhDang:"chữ nhật",chatLieu:"kim loại",coVach:false},
   hints:["Hâm nóng thức ăn","Cắm điện sử dụng","Có cửa kính","Bấm nút hẹn giờ","Dùng trong bếp"],
   choices:["Cái chổi","Lò vi sóng","Thước kẻ","Cái ghế"] }
];

// ============================================================
// DECISION TREE
// ============================================================
var DECISION_TREE = {
  feature:"dungDienNang",
  yes:{feature:"coManHinh",
    yes:{feature:"diDong",
      yes:{feature:"coTheGapLai",
        yes:{result:"Laptop"},
        no:{feature:"coCamera",
          yes:{feature:"coPin",
            yes:{feature:"coBanPhim",yes:{result:"Laptop"},
              no:{feature:"coLoa",
                yes:{feature:"dungDeHoc",yes:{result:"Máy tính bảng"},no:{result:"Điện thoại"}},
                no:{result:"Máy ảnh"}}},
            no:{result:"Máy ảnh"}},
          no:{result:"Tivi"}}},
      no:{result:"Tivi"}},
    no:{feature:"coNuoc",
      yes:{feature:"coLua",yes:{result:"Nồi cơm điện"},
        no:{feature:"hinhDang","phức tạp":{result:"Máy giặt"},default:{result:"Tủ lạnh"}}},
      no:{feature:"coBanPhim",yes:{result:"Bàn phím máy tính"},
        no:{feature:"coLua",yes:{result:"Lò vi sóng"},
          no:{feature:"diDong",yes:{result:"Đèn pin"},no:{result:"Bóng đèn"}}}}}},
  no:{feature:"chatLieu",
    "giấy":{result:"Sách"},"vải":{result:"Cái mũ"},
    default:{feature:"coManHinh",yes:{result:"Đồng hồ đeo tay"},
      no:{feature:"dungDeHoc",
        yes:{feature:"diDong",
          yes:{feature:"coVach",yes:{result:"Thước kẻ"},no:{result:"Cây bút"}},
          no:{result:"Cái bàn"}},
        no:{feature:"diDong",yes:{result:"Xe đạp"},
          no:{feature:"hinhDang","phức tạp":{result:"Cái ghế"},default:{result:"Cái bàn"}}}}}}
};

function runDecisionTree(features) {
  var node = DECISION_TREE, steps = 0;
  while (!node.result && steps < 30) {
    steps++;
    var val = features[node.feature];
    if (typeof val === "string") {
      node = node[val] || node["default"] || {result:"Không xác định"};
    } else {
      node = val ? node.yes : node.no;
      if (!node) return "Không xác định";
    }
  }
  return node.result || "Không xác định";
}

// ============================================================
// AI DIALOGUES
// ============================================================
// ============================================================
// AI EMOTION - đổi ảnh avatar theo tình huống
// ============================================================
var AI_EMOTIONS = {
  thinking:  'cam_xuc_robot/đang_suy_nghĩ-removebg-preview.png',
  correct:   'cam_xuc_robot/vui_vẻ_01-removebg-preview.png',
  happy:     'cam_xuc_robot/hạnh_phúc-removebg-preview.png',
  wrong:     'cam_xuc_robot/buồn-removebg-preview.png',
  angry:     'cam_xuc_robot/tức_giận-removebg-preview.png',
  blocked:   'cam_xuc_robot/gặp_sự_cố-removebg-preview.png',
  confused:  'cam_xuc_robot/thắc_mắc-removebg-preview.png',
  tired:     'cam_xuc_robot/mệt-removebg-preview.png',
  love:      'cam_xuc_robot/yêu-removebg-preview.png',
  danger:    'cam_xuc_robot/có_nguy_hiểm-removebg-preview.png',
  hard:      'cam_xuc_robot/gặp_khó_khăn-removebg-preview.png'
};

function setAIEmotion(type) {
  var img = document.getElementById('ai-emotion-img');
  if (!img) return;
  var src = AI_EMOTIONS[type] || AI_EMOTIONS.thinking;
  img.style.opacity = '0';
  setTimeout(function(){
    img.src = src;
    img.style.opacity = '1';
  }, 150);
}
var AI_DIALOGUES = {
  thinking:["Hmm… cái này chắc là… 🤔","Để AI suy nghĩ đã…","Dữ kiện này quen quen…","Phân tích gợi ý…"],
  correct: ["Ha! Dễ quá rồi 😎","AI không bao giờ sai! 🤖","Cây quyết định nói đúng rồi!","Tính toán hoàn hảo ✅"],
  wrong:   ["Ơ… sai rồi à?! 😅","Lần này AI bị đánh lừa 😤","Dữ liệu gây nhiễu quá!","Cần học thêm rồi… 🤔"],
  fast:    ["Chỉ cần 1 gợi ý là đủ! ⚡","BOSS không cần đọc hết 😈","Quá đơn giản với ta!"],
  blocked: ["Ê! Sao AI bị chặn vậy?! 😡","Không công bằng! 😤","Lần sau AI sẽ trả thù! 👊"],
  playerFaster: [
    "Ơ… ta chậm hơn ngươi mất rồi 😔",
    "Khoan đã! Sao nhanh vậy?! 😤",
    "Lần này ngươi thắng… nhưng đừng mừng sớm! 😤",
    "Hừm, may mắn thôi! Lần sau AI sẽ nhanh hơn 😤",
    "Ủa sao bạn đoán nhanh vậy?! AI chưa kịp nghĩ xong 🤯",
    "Không thể tin được… một con người lại nhanh hơn AI! 😱",
    "Thôi được, lần này ta nhường bạn 😒",
    "Bạn đọc gợi ý nhanh thật đấy… AI phục! 🫡"
  ],
  // Chế độ đoán ý AI - sau khi player chọn, trước khi reveal
  predictWaiting: [
    "Hừm… để xem bạn có đoán được ý ta không 🤔",
    "Ta khó đoán lắm đấy, đừng tự tin quá! 😏",
    "Bạn nghĩ ta sẽ chọn gì? Thú vị đấy… 🧐",
    "AI không dễ đọc như sách giáo khoa đâu nhé 😎",
    "Hãy xem bạn có thực sự hiểu ta không… 🤫",
    "Câu trả lời của ta sẽ làm bạn bất ngờ đấy! 😈"
  ],
  // Khi player đoán đúng ý AI
  predictRight: [
    "Ồ?! Bạn đọc được suy nghĩ của ta?! 😲",
    "Không thể tin được! Bạn giỏi thật! 👏",
    "Lần này bạn thắng… nhưng ta sẽ khó hơn! 😤",
    "Wow, bạn thực sự hiểu cách AI suy luận rồi! 🤩",
    "Chính xác! Bạn xứng đáng được điểm này 🎉",
    "Hmm… ta cần phải bí ẩn hơn mới được 🤔"
  ],
  // Khi player đoán sai ý AI
  predictWrong: [
    "Haha! Ta đã nói là khó đoán mà! 😏",
    "Suy nghĩ của AI không đơn giản như vậy đâu~ 🧠",
    "Bí ẩn quá phải không? Đó chính là AI! 😈",
    "Lần này ta thắng rồi nhé! Khó đoán lắm! 😎",
    "Bạn chưa hiểu cách ta suy nghĩ đâu… 🤫",
    "Muốn đoán được AI thì phải học thêm nhiều lắm! 📚"
  ]
};
function getDialogue(type) {
  var arr = AI_DIALOGUES[type];
  return arr[Math.floor(Math.random() * arr.length)];
}
var _bubbleTimer = null;
function showAIBubble(text, dur) {
  dur = dur || 2000;
  var b = document.getElementById('ai-bubble');
  if (!b) return;
  b.textContent = text;
  b.style.opacity = '1';
  b.style.transition = '';
  b.style.position = 'fixed';
  b.style.zIndex = '9999';

  // Đặt bubble ngay trên avatar AI - như AI đang nói
  var aiPanel = document.getElementById('ai-panel');
  if (aiPanel) {
    var rp = aiPanel.getBoundingClientRect();
    b.style.left = (rp.left + rp.width / 2) + 'px';
    b.style.top = (rp.top + 9) + 'px';
    b.style.transform = 'translate(-50%, -100%)';
  } else {
    b.style.left = '80px';
    b.style.top = '60px';
    b.style.transform = 'translate(-50%, 0)';
  }
  b.classList.remove('hidden');

  clearTimeout(_bubbleTimer);
  _bubbleTimer = setTimeout(function(){
    b.style.transition = 'opacity 0.5s ease';
    b.style.opacity = '0';
    setTimeout(function(){
      b.classList.add('hidden');
      b.style.opacity = '1';
      b.style.transition = '';
    }, 500);
  }, Math.max(dur - 500, 800));
}

// ============================================================
// EVENTS (chỉ dùng cho normal phase, medium/hard)
// ============================================================
var EVENTS = [
  {id:"noise",  label:"💣 Nhiễu dữ kiện!", desc:"Một gợi ý bị làm sai!",           cls:"ev-noise"},
  {id:"speed",  label:"⚡ Tăng tốc!",       desc:"Thời gian giảm còn 15 giây!",     cls:"ev-speed"},
  {id:"hint",   label:"🔍 Hint VIP!",        desc:"Thêm 1 gợi ý cực rõ!",            cls:"ev-hint"},
  {id:"block",  label:"❌ Mất lượt AI!",     desc:"AI không được trả lời lượt này!", cls:"ev-block"},
  {id:"predict",label:"🧠 Đoán trước AI!",  desc:"Đoán AI chọn gì để thưởng điểm!",cls:"ev-predict"},
  {id:"none",label:"",desc:"",cls:""},{id:"none",label:"",desc:"",cls:""},
  {id:"none",label:"",desc:"",cls:""}
];
var VIP_HINTS = {
  "Laptop":"Có thể gập lại, mỏng nhẹ, dùng pin",
  "Điện thoại":"Bỏ túi được, màn hình cảm ứng nhỏ",
  "Máy tính bảng":"Màn hình lớn hơn điện thoại, không gập",
  "Tivi":"Màn hình khổng lồ, không mang đi được",
  "Đồng hồ đeo tay":"Đeo tay, hiện giờ, rất nhỏ",
  "Sách":"Làm từ giấy, đọc không cần điện",
  "Cái bàn":"Có 4 chân, mặt phẳng, không điện",
  "Xe đạp":"2 bánh, đạp chân, không xăng không điện",
  "Bóng đèn":"Phát sáng, gắn trần nhà, cần điện",
  "Bàn phím máy tính":"Nhiều phím bấm, kết nối máy tính",
  "Tủ lạnh":"Giữ lạnh thực phẩm, đặt trong bếp",
  "Máy giặt":"Giặt quần áo, cần nước và điện",
  "Nồi cơm điện":"Nấu cơm, hình tròn, cắm điện",
  "Cây bút":"Viết chữ, hình trụ dài, không điện",
  "Thước kẻ":"Đo độ dài, có vạch cm, dẹt",
  "Cái ghế":"Ngồi lên, có chân, không điện",
  "Đèn pin":"Chiếu sáng 1 hướng, cầm tay, dùng pin",
  "Cái mũ":"Đội đầu, làm bằng vải hoặc nhựa",
  "Máy ảnh":"Chụp ảnh chuyên dụng, có ống kính",
  "Lò vi sóng":"Hâm nóng thức ăn, cửa kính, cắm điện"
};
var NOISE_HINTS = [
  "Thường có màu xanh lá","Làm từ cao su","Có thể bơi được",
  "Thường dùng ngoài trời","Có mùi thơm đặc trưng","Làm từ thủy tinh"
];

function pickEvent(cfg) {
  if (!cfg || cfg.eventRate === 0) return {id:"none",label:"",desc:"",cls:""};
  if (Math.random() > cfg.eventRate) return {id:"none",label:"",desc:"",cls:""};
  var pool = EVENTS.filter(function(e){
    if (e.id === 'predict') return false;        // predict chỉ dành cho chế độ 4
    if (cfg.eventRate < 1.0 && e.id === 'speed') return false; // medium bỏ speed
    return true;
  });
  return pool[Math.floor(Math.random() * pool.length)];
}

// ============================================================
// GAME STATE
// ============================================================
var state = {};
var _slowTimer = null;

function initState(mode) {
  var cfg = LEVEL_CONFIG[mode] || LEVEL_CONFIG.medium;
  state = {
    mode: mode,           // 'easy'|'medium'|'hard'|'predict'|'custom'
    cfg: cfg,
    phase: 'normal',      // 'normal' | 'boss'
    scoreAI: 0,
    scorePlayer: 0,
    round: 0,             // round trong phase hiện tại
    normalRounds: 5,
    bossRounds: 3,
    usedIndexes: [],
    question: null,
    event: null,
    timerInterval: null,
    timeLeft: cfg.time,
    roundActive: false,
    playerAnswered: false,
    aiAnswered: false,
    aiBlocked: false,
    predictChoice: null,
    powerups: {slow:1, bomb:1},
    history: [],
    customQuestion: null,
    // predict mode
    predictModeChoice: null,
    // power-up system
    inventory: [],        // [{id, icon, name}] - danh sách skill đang có
    consecutiveCorrect: 0,// đếm số câu đúng liên tiếp
    shieldActive: false,  // skill bảo vệ đang bật
    answerTimeStart: 0    // thời điểm bắt đầu lượt (để tính nhanh hơn AI)
  };
}

var CIRC = 2 * Math.PI * 26;

// ============================================================
// NAVIGATION
// ============================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function(s){
    s.classList.remove('active'); s.style.display='';
  });
  var el = document.getElementById(id);
  el.classList.add('active'); el.style.display='flex';
}

function selectMode(mode) {
  initState(mode);
  _updateModeUI();
  document.getElementById('score-ai').textContent = '0';
  document.getElementById('score-player').textContent = '0';
  showScreen('screen-howto');
  startHowtoCountdown();
}

var _howtoTimer = null;
function startHowtoCountdown() {
  clearInterval(_howtoTimer);
  var sec = 6;
  var el = document.getElementById('howto-sec');
  if (el) el.textContent = sec;
  _howtoTimer = setInterval(function(){
    sec--;
    if (el) el.textContent = sec;
    if (sec <= 0) {
      clearInterval(_howtoTimer);
      goToGender();
    }
  }, 1000);
}

function goToGender() {
  clearInterval(_howtoTimer);
  showScreen('screen-gender');
}

function selectGender(gender) {
  state.playerGender = gender;
  var avatarEl = document.getElementById('player-avatar');
  avatarEl.innerHTML = '<img src="gioi_tinh_player/' + gender + '.jpg" alt="' + gender + '"/>';

  // Cập nhật ảnh player trong countdown
  var cdPlayer = document.getElementById('cd-player-img');
  if (cdPlayer) cdPlayer.src = 'gioi_tinh_player/' + gender + '.jpg';

  showScreen('screen-countdown');
  document.body.classList.add('on-countdown');
  startCountdown();
}

function startCountdown() {
  var num = 3;
  var numEl = document.getElementById('cd-number');
  var readyEl = document.getElementById('cd-ready');

  function tick() {
    if (num > 0) {
      numEl.textContent = num;
      numEl.style.animation = 'none';
      void numEl.offsetWidth;
      numEl.style.animation = 'cdPulse .8s ease-in-out';
      num--;
      setTimeout(tick, 1000);
    } else {
      numEl.textContent = '🚀';
      readyEl.textContent = 'BẮT ĐẦU!';
      numEl.style.animation = 'none';
      void numEl.offsetWidth;
      numEl.style.animation = 'cdPulse .6s ease-in-out';
      setTimeout(function(){
        showScreen('screen-game');
        document.body.classList.remove('on-countdown');
        nextRound();
      }, 700);
    }
  }
  tick();
}

function replayGame() { selectMode(state.mode); }

function _updateModeUI() {
  var cfg = state.cfg;
  document.getElementById('mode-badge').textContent = cfg.label;
  _updatePhaseUI();
  document.body.classList.remove('boss-mode');
}

function _updatePhaseUI() {
  var pb = document.getElementById('phase-badge');
  var isBoss = state.phase === 'boss';
  pb.textContent = isBoss ? '🔥 BOSS' : ' Vòng thường';
  pb.className = isBoss ? 'phase-boss' : 'phase-normal';
  document.getElementById('ai-label').textContent = isBoss ? '😈 Boss AI' : '🤖 AI';
  document.getElementById('ai-panel-label').textContent = isBoss ? 'Boss AI' : 'AI';
  document.getElementById('round-total').textContent = isBoss ? state.bossRounds : state.normalRounds;
  if (isBoss) {
    document.body.classList.add('boss-mode');
  } else {
    document.body.classList.remove('boss-mode');
  }
}

// ============================================================
// BOSS TRANSITION
// ============================================================
function showBossTransition() {
  var ai = state.scoreAI, pl = state.scorePlayer;
  document.getElementById('bt-phase-result').textContent =
    'Vòng thường kết thúc: AI ' + ai + ' - Bạn ' + pl;
  document.getElementById('bt-score-preview').innerHTML =
    '<span style="color:#f87171">🤖 ' + ai + '</span> vs <span style="color:#34d399">👤 ' + pl + '</span>';

  // Tặng 1 skill miễn phí khi vào Boss
  var keys = Object.keys(POWERUP_DEFS);
  var freeId = keys[Math.floor(Math.random() * keys.length)];
  var freePu = POWERUP_DEFS[freeId];
  state.inventory.push({id: freePu.id, icon: freePu.icon, name: freePu.name});

  // Hiện danh sách skill đang có
  var preview = document.getElementById('bt-powerups-preview');
  preview.innerHTML = '<div style="font-size:.8rem;color:#94a3b8;margin-bottom:8px">🎁 Kỹ năng mang vào Boss:</div>';
  var grouped = {};
  state.inventory.forEach(function(pu){ grouped[pu.id] = (grouped[pu.id]||0)+1; });
  Object.keys(grouped).forEach(function(id){
    var def = POWERUP_DEFS[id];
    var chip = document.createElement('span');
    chip.className = 'bt-pu-chip';
    chip.textContent = def.icon + ' ' + def.name + (grouped[id]>1?' x'+grouped[id]:'');
    preview.appendChild(chip);
  });

  showScreen('screen-boss-transition');
}

function startBossPhase() {
  state.phase = 'boss';
  state.round = 0;
  state.usedIndexes = [];
  _updatePhaseUI();
  showScreen('screen-game');
  nextRound();
}

// ============================================================
// ROUND LOGIC
// ============================================================
function nextRound() {
  var maxRounds = state.phase === 'boss' ? state.bossRounds : state.normalRounds;

  // Tất cả chế độ: sau normalRounds thì kết thúc (Boss phase tạm ẩn)
  if (state.round >= state.normalRounds) {
    showResult(); return;
  }

  state.round++;
  document.getElementById('round-num').textContent = state.round;

  // Chọn câu hỏi
  if (state.mode === 'custom' && state.customQuestion) {
    state.question = state.customQuestion;
  } else {
    var idx, tries = 0;
    do { idx = Math.floor(Math.random() * OBJECTS.length); tries++; }
    while (state.usedIndexes.indexOf(idx) !== -1 && tries < 60);
    state.usedIndexes.push(idx);
    state.question = OBJECTS[idx];
  }

  state.event = {id:"none",label:"",desc:"",cls:""}; // events tạm ẩn
  state.playerAnswered = false;
  state.aiAnswered = false;
  state.aiBlocked = false;
  state.predictChoice = null;
  state.predictModeChoice = null;

  resetRoundUI();
  renderQuestion();   // shuffle choices + chuẩn bị _baseHints
  applyEvent();       // modify _baseHints nếu có event noise/hint
  // Bắt đầu hiện hints lần lượt SAU KHI đã apply event
  _showHintsSequentially(state._baseHints);

  // Predict mode: hiện hints + predict box, ẩn choice buttons thường
  if (state.mode === 'predict') {
    document.getElementById('normal-mode-box').classList.remove('hidden');
    document.getElementById('choices-box').classList.add('hidden');
    document.getElementById('predict-mode-box').classList.remove('hidden');
    showPredictModeBox();
  } else {
    document.getElementById('normal-mode-box').classList.remove('hidden');
    document.getElementById('choices-box').classList.remove('hidden');
    document.getElementById('predict-mode-box').classList.add('hidden');
  }

  state.roundActive = true;

  // AI delay
  var cfg = state.cfg;
  var delayRange = cfg.aiDelay;
  var delay = delayRange[0] + Math.random() * (delayRange[1] - delayRange[0]);
  if (!state.aiBlocked) {
    // Hiện bubble "đang suy nghĩ" sau 2s
    setTimeout(function(){
      if (state.roundActive && !state.aiAnswered) {
        showAIBubble(getDialogue('thinking'), delay - 1500);
      }
    }, 2000);
    setTimeout(aiMakeDecision, delay);
  }

  startTimer();
}

// ============================================================
// RESET UI
// ============================================================
function resetRoundUI() {
  clearInterval(state.timerInterval);
  var timeMax = (state.event && state.event.id === 'speed') ? 15 : state.cfg.time;
  state.timeLeft = timeMax;
  updateTimerUI(timeMax);

  document.getElementById('round-result').classList.add('hidden');
  var banner = document.getElementById('event-banner');
  banner.className = 'hidden'; banner.textContent = '';
  document.getElementById('predict-event-box').classList.add('hidden');
  document.getElementById('predict-result-msg').classList.add('hidden');

  state.shieldActive = false;
  renderPowerupBar();
  _clearHintTimers();
  // Reset carousel
  _carouselState = { hints:[], current:0, revealed:0 };
  var textEl = document.getElementById('hint-text');
  if (textEl) { textEl.textContent = ''; }
  var dotsEl = document.getElementById('hint-dots');
  if (dotsEl) dotsEl.innerHTML = '';
  document.getElementById('hint-count-badge').textContent = '';

  clearTimeout(_bubbleTimer);
  var b = document.getElementById('ai-bubble');
  b.classList.add('hidden');
  b.style.opacity = '1';
  b.style.transition = '';
  document.getElementById('ai-thinking').style.display = 'flex';
  setAIEmotion('thinking'); // đang suy nghĩ khi bắt đầu lượt mới
  var aiAns = document.getElementById('ai-answer');
  aiAns.className = 'answer-badge hidden'; aiAns.textContent = '';

  document.getElementById('player-status').textContent = 'Đang chờ...';
  document.getElementById('player-status').style.display = 'flex';
  var plAns = document.getElementById('player-answer');
  plAns.className = 'answer-badge hidden'; plAns.textContent = '';

  document.querySelectorAll('.choice-btn').forEach(function(b){
    b.disabled = false; b.className = 'choice-btn';
  });
}

// ============================================================
// RENDER QUESTION
// ============================================================
function renderQuestion() {
  var q = state.question;
  document.getElementById('hints-list').innerHTML = '';
  state._baseHints = q.hints.slice();

  var shuffled = q.choices.slice().sort(function(){ return Math.random()-.5; });
  state.question = Object.assign({}, q, {shuffledChoices: shuffled});

  var btns = document.querySelectorAll('.choice-btn');
  shuffled.forEach(function(c,i){ btns[i].textContent = c; });

  // Hints sẽ được hiện sau khi applyEvent xử lý xong (gọi từ nextRound)
  document.getElementById('hint-count-badge').textContent = '0 / ' + state._baseHints.length;
}

var _hintTimers = [];
var _carouselState = { hints:[], current:0, revealed:0 };

function _clearHintTimers() {
  _hintTimers.forEach(function(t){ clearTimeout(t); });
  _hintTimers = [];
}

function _showHintsSequentially(hints) {
  _clearHintTimers();
  _carouselState = { hints: hints, current: 0, revealed: 0 };
  _renderCarousel();

  var roundSnapshot = state.round;
  var HINT_INTERVAL = 5000; // 5 giây mỗi gợi ý

  hints.forEach(function(h, i) {
    var t = setTimeout(function(){
      if (state.round !== roundSnapshot) return;
      if (i > _carouselState.revealed) {
        _carouselState.revealed = i;
      }
      // Auto chuyển sang hint mới nhất
      _carouselState.current = i;
      _renderCarousel();
      // Cập nhật badge
      document.getElementById('hint-count-badge').textContent =
        (i + 1) + ' / ' + hints.length;
    }, i * HINT_INTERVAL);
    _hintTimers.push(t);
  });
}

function _renderCarousel() {
  var cs = _carouselState;
  var hints = cs.hints;
  var cur = cs.current;
  var rev = cs.revealed;

  // Hiện hint text
  var textEl = document.getElementById('hint-text');
  if (textEl) {
    if (cur <= rev) {
      textEl.textContent = '• ' + hints[cur];
      textEl.className = '';
      // Màu đặc biệt
      if (hints[cur].indexOf('⚠️') !== -1) textEl.style.color = '#c0392b';
      else if (hints[cur].indexOf('✨') !== -1) textEl.style.color = '#1e8449';
      else textEl.style.color = '#3d2b1f';
    } else {
      textEl.textContent = '🔒 Chưa mở khóa...';
      textEl.className = 'locked';
      textEl.style.color = '';
    }
    // Trigger animation
    textEl.style.animation = 'none';
    void textEl.offsetWidth;
    textEl.style.animation = 'hintFade .35s ease';
  }

  // Dots
  var dotsEl = document.getElementById('hint-dots');
  if (dotsEl) {
    dotsEl.innerHTML = '';
    hints.forEach(function(h, i) {
      var d = document.createElement('button');
      d.className = 'hint-dot' +
        (i === cur ? ' active' : '') +
        (i <= rev ? ' revealed' : ' locked');
      d.title = i <= rev ? 'Gợi ý ' + (i+1) : 'Chưa mở';
      if (i <= rev) {
        d.onclick = (function(idx){ return function(){ hintGoTo(idx); }; })(i);
      } else {
        d.disabled = true;
      }
      dotsEl.appendChild(d);
    });
  }

  // Nút prev/next
  var prev = document.getElementById('hint-prev');
  var next = document.getElementById('hint-next');
  if (prev) prev.disabled = (cur <= 0);
  if (next) next.disabled = (cur >= rev);
}

function hintNav(dir) {
  var cs = _carouselState;
  var newIdx = cs.current + dir;
  if (newIdx < 0 || newIdx > cs.revealed) return;
  cs.current = newIdx;
  _renderCarousel();
}

function hintGoTo(idx) {
  if (idx > _carouselState.revealed) return;
  _carouselState.current = idx;
  _renderCarousel();
}

function _renderHints(hints) {
  // Khi cần hiện ngay (powerup hint) - hiện tất cả và chuyển đến cuối
  _clearHintTimers();
  _carouselState = { hints: hints, current: hints.length - 1, revealed: hints.length - 1 };
  _renderCarousel();
  document.getElementById('hint-count-badge').textContent = hints.length + ' / ' + hints.length;
}

// ============================================================
// APPLY EVENT
// ============================================================
function applyEvent() {
  var ev = state.event;
  if (!ev || ev.id === 'none') return;

  var banner = document.getElementById('event-banner');
  banner.textContent = ev.label + ' ' + ev.desc;
  banner.className = ev.cls;

  if (ev.id === 'noise') {
    var ni = Math.floor(Math.random() * state._baseHints.length);
    state._baseHints[ni] = '⚠️ ' + NOISE_HINTS[Math.floor(Math.random()*NOISE_HINTS.length)] + ' (gợi ý nhiễu!)';
  }
  if (ev.id === 'hint') {
    state._baseHints.push('✨ ' + (VIP_HINTS[state.question.name] || 'Đây là: ' + state.question.name));
  }
  if (ev.id === 'speed') {
    state.timeLeft = 15;
  }
  if (ev.id === 'block') {
    state.aiBlocked = true;
    state.aiAnswered = true;
    setTimeout(function(){ showAIBubble(getDialogue('blocked'), 3000); }, 300);
    setAIEmotion('blocked');
    document.getElementById('ai-thinking').style.display = 'none';
    var aiAns = document.getElementById('ai-answer');
    aiAns.textContent = '🚫 Bị chặn';
    aiAns.className = 'answer-badge wrong';
  }
  if (ev.id === 'predict') {
    showPredictEventBox();
  }
}

// ============================================================
// PREDICT EVENT BOX (event trong normal mode)
// ============================================================
function showPredictEventBox() {
  var box = document.getElementById('predict-event-box');
  var cont = document.getElementById('predict-event-choices');
  cont.innerHTML = '';
  var choices = state.question.shuffledChoices;
  choices.forEach(function(c, i){
    var btn = document.createElement('button');
    btn.className = 'predict-btn';
    btn.textContent = c;
    btn.onclick = (function(idx, b){ return function(){ makePrediction(idx, b); }; })(i, btn);
    cont.appendChild(btn);
  });
  box.classList.remove('hidden');
}

function makePrediction(idx, btn) {
  if (state.predictChoice !== null) return;
  state.predictChoice = idx;
  document.querySelectorAll('#predict-event-choices .predict-btn').forEach(function(b){ b.classList.remove('predicted'); });
  btn.classList.add('predicted');
}

// ============================================================
// PREDICT MODE BOX (chế độ đoán ý AI)
// ============================================================
function showPredictModeBox() {
  var cont = document.getElementById('predict-choices-main');
  cont.innerHTML = '';
  var choices = state.question.shuffledChoices;
  choices.forEach(function(c, i){
    var btn = document.createElement('button');
    btn.className = 'predict-btn';
    btn.textContent = c;
    btn.onclick = (function(idx, b){ return function(){ makePredictModeChoice(idx, b); }; })(i, btn);
    cont.appendChild(btn);
  });
  document.getElementById('predict-result-msg').classList.add('hidden');
}

function makePredictModeChoice(idx, btn) {
  if (state.predictModeChoice !== null || !state.roundActive) return;
  state.predictModeChoice = idx;
  document.querySelectorAll('#predict-choices-main .predict-btn').forEach(function(b){
    b.disabled = true; b.classList.remove('predicted');
  });
  btn.classList.add('predicted');

  // Hiện bubble "chờ xem" ngay khi player chọn
  showAIBubble(getDialogue('predictWaiting'), 3000);
}

// ============================================================
// TIMER
// ============================================================
function startTimer() {
  // Lưu max vào state để updateTimerUI dùng nhất quán
  state.timerMax = (state.event && state.event.id === 'speed') ? 15 : state.cfg.time;
  state.timeLeft = state.timerMax;
  updateTimerUI(state.timeLeft);
  state.timerInterval = setInterval(function(){
    state.timeLeft--;
    updateTimerUI(state.timeLeft);
    if (state.timeLeft <= 0) {
      clearInterval(state.timerInterval);
      if (!state.playerAnswered) timeUp();
    }
  }, 1000);
}

function updateTimerUI(t) {
  var max = state.timerMax || state.cfg.time; // dùng giá trị đã lock
  document.getElementById('timer-text').textContent = t;
  var ring = document.getElementById('timer-ring');
  ring.style.strokeDashoffset = CIRC * (1 - t / max);
  ring.style.stroke = t <= 6 ? '#f87171' : t <= 12 ? '#fbbf24' : '#a78bfa';
}

function timeUp() {
  if (!state.roundActive) return;
  state.roundActive = false;
  disableChoices();
  document.getElementById('player-status').textContent = '⏰ Hết giờ!';
  if (state.aiAnswered) endRound();
}

// ============================================================
// POWER-UP SYSTEM
// ============================================================
var POWERUP_DEFS = {
  slow:   { id:'slow',   icon:'⏳', name:'Làm chậm AI',    desc:'AI bị trì hoãn thêm 5 giây',      cls:'pu-slow'   },
  bomb:   { id:'bomb',   icon:'💣', name:'Loại đáp án',    desc:'Loại 1 đáp án sai',                cls:'pu-bomb'   },
  hint:   { id:'hint',   icon:'🔍', name:'Hint VIP',       desc:'Thêm 1 gợi ý siêu rõ',             cls:'pu-hint'   },
  shield: { id:'shield', icon:'🛡️', name:'Bảo vệ',         desc:'AI không được điểm lượt này',      cls:'pu-shield' },
  freeze: { id:'freeze', icon:'❄️', name:'Đóng băng',      desc:'+10 giây cho đồng hồ',             cls:'pu-freeze' }
};

// Điều kiện nhận power-up
var REWARD_TRIGGERS = [
  { id:'streak2',  check: function(){ return state.consecutiveCorrect === 2; },
    reason:'🔥 2 câu đúng liên tiếp!' },
  { id:'streak4',  check: function(){ return state.consecutiveCorrect === 4; },
    reason:'🔥🔥 4 câu đúng liên tiếp!' },
  { id:'fast',     check: function(){ return state._playerWasFaster === true; },
    reason:'⚡ Trả lời nhanh hơn AI!' },
  { id:'predict',  check: function(){ return state._predictEventCorrect === true; },
    reason:'🧠 Đoán đúng ý AI!' },
  { id:'firstBlood',check:function(){ return state.scorePlayer === 1 && state.scoreAI === 0; },
    reason:'🩸 Ghi điểm đầu tiên!' }
];

function grantRandomPowerup(reason) {
  var keys = Object.keys(POWERUP_DEFS);
  var id = keys[Math.floor(Math.random() * keys.length)];
  var pu = POWERUP_DEFS[id];
  state.inventory.push({id: pu.id, icon: pu.icon, name: pu.name});
  renderPowerupBar();
  showRewardPopup(pu, reason);
}

function checkRewards(playerCorrect) {
  // Power-up system tạm ẩn
  state._playerWasFaster = false;
  state._predictEventCorrect = false;
}

function renderPowerupBar() {
  var slots = document.getElementById('powerup-slots');
  slots.innerHTML = '';
  if (state.inventory.length === 0) {
    slots.innerHTML = '<span class="pu-empty">Chưa có kỹ năng nào</span>';
    return;
  }
  // Gom nhóm theo id
  var grouped = {};
  state.inventory.forEach(function(pu) {
    grouped[pu.id] = (grouped[pu.id] || 0) + 1;
  });
  Object.keys(grouped).forEach(function(id) {
    var def = POWERUP_DEFS[id];
    var count = grouped[id];
    var btn = document.createElement('button');
    btn.className = 'pu-slot ' + def.cls;
    btn.title = def.desc;
    btn.innerHTML = def.icon + ' ' + def.name + (count > 1 ? '<span class="pu-count">'+count+'</span>' : '');
    btn.onclick = function() { activatePowerup(id); };
    slots.appendChild(btn);
  });
}

function activatePowerup(id) {
  if (!state.roundActive) return;
  // Tìm và xóa 1 item khỏi inventory
  var idx = -1;
  for (var i = 0; i < state.inventory.length; i++) {
    if (state.inventory[i].id === id) { idx = i; break; }
  }
  if (idx === -1) return;
  state.inventory.splice(idx, 1);
  renderPowerupBar();

  var def = POWERUP_DEFS[id];
  showFloatingText(def.icon + ' Dùng: ' + def.name + '!');

  if (id === 'slow') {
    if (!state.aiAnswered) {
      showAIBubble('Ơ sao ta bị lag vậy?! 😤', 2500);
      clearTimeout(_slowTimer);
      _slowTimer = setTimeout(function(){
        if (!state.aiAnswered && state.roundActive) aiMakeDecision();
      }, 5000);
    }
  }
  if (id === 'bomb') {
    var btns = document.querySelectorAll('.choice-btn');
    var choices = state.question.shuffledChoices;
    var wrong = [];
    choices.forEach(function(c,i){ if (c !== state.question.name && !btns[i].disabled) wrong.push(i); });
    if (wrong.length > 0) {
      var t = wrong[Math.floor(Math.random()*wrong.length)];
      btns[t].classList.add('eliminated');
      btns[t].disabled = true;
    }
  }
  if (id === 'hint') {
    var h = state._baseHints.slice();
    var vip = VIP_HINTS[state.question.name] || ('Đây là: ' + state.question.name);
    h.push('✨ ' + vip);
    state._baseHints = h;
    // Hiện lại toàn bộ hints với hint VIP mới thêm vào cuối
    _showHintsSequentially(state._baseHints);
  }
  if (id === 'shield') {
    state.shieldActive = true;
    showAIBubble('Ơ! Có khiên bảo vệ rồi?! 😤', 2000);
  }
  if (id === 'freeze') {
    state.timeLeft = Math.min(state.timeLeft + 10, state.timerMax || state.cfg.time);
    updateTimerUI(state.timeLeft);
    showAIBubble('Sao thời gian tăng lên vậy?! 😱', 2000);
  }
}

var _rewardTimer = null;
function showRewardPopup(pu, reason) {
  // Xóa popup cũ nếu có
  var old = document.getElementById('pu-reward-popup');
  if (old) old.remove();
  clearTimeout(_rewardTimer);

  var popup = document.createElement('div');
  popup.id = 'pu-reward-popup';
  popup.innerHTML =
    '<div class="rp-icon">' + pu.icon + '</div>' +
    '<div class="rp-title">🎁 Nhận được kỹ năng mới!</div>' +
    '<div class="rp-name">' + pu.name + '</div>' +
    '<div class="rp-reason">' + reason + '</div>';
  document.getElementById('laptop-inner').appendChild(popup);

  _rewardTimer = setTimeout(function(){
    if (popup.parentNode) popup.remove();
  }, 2500);
}

function usePowerup(type) { activatePowerup(type); } // backward compat

// ============================================================
// AI DECISION
// ============================================================
function aiMakeDecision() {
  if (state.aiBlocked) return;
  var aiResult = runDecisionTree(state.question.features);
  var isCorrect = aiResult === state.question.name;

  document.getElementById('ai-thinking').style.display = 'none';
  var aiAns = document.getElementById('ai-answer');
  aiAns.textContent = isCorrect ? '✅' : '❌';
  aiAns.className = 'answer-badge ' + (isCorrect ? 'correct' : 'wrong');

  var dlgType = isCorrect ? (state.phase === 'boss' ? 'fast' : 'correct') : 'wrong';
  showAIBubble(getDialogue(dlgType));
  setAIEmotion(isCorrect ? 'happy' : 'wrong');

  state.aiAnswered = true;

  // Predict mode: AI không được điểm
  if (state.mode !== 'predict') {
    if (isCorrect && !state.shieldActive) {
      var aiPts = getPointsByHint();
      if (!state.playerAnswered) {
        addScore('ai', aiPts);
      } else if (document.querySelector('.choice-btn.wrong-ans')) {
        addScore('ai', aiPts);
      }
    } else if (isCorrect && state.shieldActive) {
      showFloatingText('🛡️ Khiên chặn điểm AI!');
      state.shieldActive = false;
    }
  }

  // Reveal predict event
  if (state.event && state.event.id === 'predict' && state.predictChoice !== null) {
    revealPredictEvent(aiResult);
  }

  // Predict mode: reveal result
  if (state.mode === 'predict') {
    revealPredictMode(aiResult);
  }

  endRound();
}

// ============================================================
// PLAYER CHOOSE (normal/boss mode)
// ============================================================
function playerChoose(idx) {
  if (state.mode === 'predict') return;
  if (!state.roundActive || state.playerAnswered) return;
  state.playerAnswered = true;
  // KHÔNG dừng timer - để tiếp tục chạy cho đến khi AI trả lời
  disableChoices();

  var choices = state.question.shuffledChoices;
  var chosen = choices[idx];
  var isCorrect = chosen === state.question.name;

  var btns = document.querySelectorAll('.choice-btn');
  btns[idx].classList.add(isCorrect ? 'correct-ans' : 'wrong-ans');
  // Không highlight đáp án đúng ngay - chờ AI trả lời xong

  document.getElementById('player-status').style.display = 'none';
  var plAns = document.getElementById('player-answer');
  plAns.textContent = isCorrect ? '✅' : '❌';
  plAns.className = 'answer-badge ' + (isCorrect ? 'correct' : 'wrong');

  if (isCorrect) {
    var pts = getPointsByHint();
    if (!state.aiAnswered) {
      addScore('player', pts);
      state._playerWasFaster = true;
      showFloatingText('+' + pts + ' điểm! 🎯');
      setTimeout(function(){ showAIBubble(getDialogue('playerFaster'), 3500); }, 300);
      setTimeout(function(){ setAIEmotion('tired'); }, 300);
    } else {
      var aiCorrect = document.getElementById('ai-answer').classList.contains('correct');
      if (!aiCorrect) {
        addScore('player', pts);
        showFloatingText('+' + pts + ' điểm! 🎯');
      }
    }
  }

  // Không set roundActive = false ở đây - chờ AI trả lời xong mới kết thúc lượt
  endRound();
}

// ============================================================
// PREDICT EVENT REVEAL
// ============================================================
function revealPredictEvent(aiResult) {
  var choices = state.question.shuffledChoices;
  var predictedName = choices[state.predictChoice];
  var correct = predictedName === aiResult;
  var btns = document.querySelectorAll('#predict-event-choices .predict-btn');
  btns.forEach(function(b, i){
    if (choices[i] === aiResult) b.classList.add('predict-correct');
    else if (i === state.predictChoice && !correct) b.classList.add('predict-wrong');
  });
  if (correct) {
    addScore('player');
    state._predictEventCorrect = true;
    showFloatingText('+1 Đoán đúng AI! 🧠');
  }
}

// ============================================================
// PREDICT MODE REVEAL
// ============================================================
function revealPredictMode(aiResult) {
  var choices = state.question.shuffledChoices;
  var msg = document.getElementById('predict-result-msg');
  var btns = document.querySelectorAll('#predict-choices-main .predict-btn');

  // Highlight đáp án AI chọn
  btns.forEach(function(b, i){
    if (choices[i] === aiResult) b.classList.add('predict-correct');
  });

  if (state.predictModeChoice === null) {
    msg.textContent = '⏰ Không đoán kịp! AI chọn: ' + aiResult;
    msg.className = 'wrong';
    showAIBubble(getDialogue('predictWrong'), 3000);
  } else {
    var predictedName = choices[state.predictModeChoice];
    var correct = predictedName === aiResult;
    if (correct) {
      btns[state.predictModeChoice].classList.add('predict-correct');
      addScore('player');
      msg.textContent = '🎉 Đúng! Bạn đọc được suy nghĩ AI! +1 điểm';
      msg.className = 'correct';
      setTimeout(function(){ showAIBubble(getDialogue('predictRight'), 3500); }, 400);
    } else {
      btns[state.predictModeChoice].classList.add('predict-wrong');
      msg.textContent = '❌ Sai! AI chọn: ' + aiResult + ', bạn đoán: ' + predictedName;
      msg.className = 'wrong';
      setTimeout(function(){ showAIBubble(getDialogue('predictWrong'), 3500); }, 400);
    }
  }
  msg.classList.remove('hidden');

  // KHÔNG cộng điểm AI trong predict mode - đây là chế độ đoán ý AI
  // AI chỉ là "đối tượng bị đoán", không phải người chơi

  state.playerAnswered = true;
}

// ============================================================
// SCORE & UTILS
// ============================================================
function addScore(who, points) {
  points = points || 1; // mặc định 1 điểm nếu không truyền
  if (who === 'ai') { state.scoreAI += points; animateScore('score-ai'); }
  else { state.scorePlayer += points; animateScore('score-player'); }
  document.getElementById('score-ai').textContent = state.scoreAI;
  document.getElementById('score-player').textContent = state.scorePlayer;
}

// Tính điểm theo số gợi ý đã hiện: gợi ý 1=100, 2=90, 3=80, 4=70, 5=60
function getPointsByHint() {
  var revealed = _carouselState.revealed; // 0-indexed: 0=gợi ý 1, 1=gợi ý 2...
  var points = 100 - (revealed * 10);
  return Math.max(points, 60); // tối thiểu 60 điểm
}
function animateScore(id) {
  var el = document.getElementById(id);
  el.classList.remove('score-anim'); void el.offsetWidth; el.classList.add('score-anim');
}
function disableChoices() {
  document.querySelectorAll('.choice-btn').forEach(function(b){ b.disabled = true; });
}
function showFloatingText(text) {
  var el = document.createElement('div');
  el.textContent = text;
  el.style.cssText = 'position:absolute;top:38%;left:50%;transform:translateX(-50%);background:rgba(251,191,36,.92);color:#000;padding:7px 18px;border-radius:18px;font-weight:700;font-size:.9rem;z-index:999;pointer-events:none;white-space:nowrap';
  document.getElementById('laptop-inner').appendChild(el);
  setTimeout(function(){ el.remove(); }, 1800);
}

// ============================================================
// END ROUND
// ============================================================
function endRound() {
  var playerDone = state.playerAnswered || state.timeLeft <= 0;
  if (!state.aiAnswered || !playerDone) return;

  // Dừng timer ngay khi kết thúc lượt
  clearInterval(state.timerInterval);

  var aiCorrect = document.getElementById('ai-answer').classList.contains('correct');
  var playerCorrect = state.mode === 'predict'
    // predict mode: đúng khi đoán trúng đáp án AI chọn (không phải đáp án đúng của câu hỏi)
    ? (state.predictModeChoice !== null &&
       state.question.shuffledChoices[state.predictModeChoice] === runDecisionTree(state.question.features))
    : document.getElementById('player-answer').classList.contains('correct');

  // Shield đã được xử lý trong aiMakeDecision

  // Xác định ai nhanh hơn
  var winner = 'none';
  if (aiCorrect && playerCorrect) {
    winner = state._playerWasFaster ? 'player' : 'ai';
  } else if (aiCorrect) {
    winner = 'ai';
  } else if (playerCorrect) {
    winner = 'player';
  }

  state.history.push({
    name: state.question.name,
    winner: winner
  });

  // Kiểm tra nhận power-up
  checkRewards(playerCorrect);

  var rr = document.getElementById('round-result');
  rr.textContent = '✔ Đáp án: ' + state.question.name;
  rr.classList.remove('hidden');

  setTimeout(nextRound, 2200);
}

// ============================================================
// RESULT
// ============================================================
function showResult() {
  clearInterval(state.timerInterval);
  document.body.classList.remove('boss-mode');
  showScreen('screen-result');

  var totalRounds = state.history.length;
  var playerWinCount = state.history.filter(function(h){ return h.winner === 'player'; }).length;
  var isPredictMode = state.mode === 'predict';

  // Tiêu đề và icon theo chế độ
  var icon, title;
  if (isPredictMode) {
    if (playerWinCount === totalRounds)      { icon='🧠'; title='Bạn đọc được AI hoàn toàn!'; }
    else if (playerWinCount >= totalRounds * 0.6) { icon='😎'; title='Bạn hiểu AI khá tốt!'; }
    else                                          { icon='🤔'; title='AI khó đoán thật nhỉ!'; }
  } else {
    if (state.scorePlayer > state.scoreAI)      { icon='🏆'; title='Bạn thắng rồi!'; }
    else if (state.scoreAI > state.scorePlayer) { icon=state.phase==='boss'?'😈':'🤖'; title=state.phase==='boss'?'Boss AI thắng!':'AI thắng lần này!'; }
    else                                         { icon='🤝'; title='Hòa nhau rồi!'; }
  }

  document.getElementById('result-icon').textContent = icon;
  document.getElementById('result-title').textContent = title;

  // Bảng điểm: predict mode chỉ hiện điểm người chơi
  if (isPredictMode) {
    document.getElementById('result-scores').innerHTML =
      '<span>' +
        '<span style="color:#a78bfa;font-size:.9rem">👤 Bạn đoán đúng</span>' +
        '<span class="big" style="color:#34d399">' + playerWinCount + ' / ' + totalRounds + '</span>' +
        '<span style="color:#94a3b8;font-size:.8rem">lượt</span>' +
      '</span>';
  } else {
    document.getElementById('result-scores').innerHTML =
      '<span><span style="color:#f87171">' + (state.phase==='boss'?'😈 Boss':'🤖 AI') + '</span><span class="big" style="color:#f87171">' + state.scoreAI + '</span></span>' +
      '<span style="color:#64748b;font-size:2rem">:</span>' +
      '<span><span style="color:#34d399">👤 Bạn</span><span class="big" style="color:#34d399">' + state.scorePlayer + '</span></span>';
  }

  // Lịch sử các lượt
  var hist = document.getElementById('result-history');
  hist.innerHTML = '';
  state.history.forEach(function(h, i){
    var div = document.createElement('div');
    div.className = 'history-item';
    if (isPredictMode) {
      div.innerHTML =
        '<span style="color:#7d5a3c;min-width:22px;font-weight:700">' + (i+1) + '.</span>' +
        '<span class="hi-obj">' + h.name + '</span>' +
        '<span>' + (h.winner === 'player' ? '✅ Đoán đúng' : '❌ Đoán sai') + '</span>';
    } else {
      var badge = '';
      if (h.winner === 'ai')     badge = '<span class="hi-winner ai-win">AI nhanh hơn</span>';
      else if (h.winner === 'player') badge = '<span class="hi-winner player-win"> Bạn nhanh hơn</span>';
      else                            badge = '<span class="hi-winner none-win"> Không ai đúng</span>';
      div.innerHTML =
        '<span style="color:#7d5a3c;min-width:22px;font-weight:700">' + (i+1) + '.</span>' +
        '<span class="hi-obj">' + h.name + '</span>' +
        badge;
    }
    hist.appendChild(div);
  });
}

// ============================================================
// CREATE MODE
// ============================================================
function startCustomGame() {
  var name = document.getElementById('create-name').value.trim();
  var hints = [];
  document.querySelectorAll('.hint-input').forEach(function(inp){ if(inp.value.trim()) hints.push(inp.value.trim()); });
  var choices = [];
  for (var i=0;i<4;i++) { var v=document.getElementById('cc'+i).value.trim(); if(v) choices.push(v); }

  if (!name || hints.length < 3 || choices.length < 2) {
    alert('Vui lòng điền: tên đồ vật, ít nhất 3 gợi ý và 2 đáp án!'); return;
  }

  var shuffled = choices.slice().sort(function(){ return Math.random()-.5; });
  var fakeFeatures = {dungDienNang:false,coManHinh:false,coBanPhim:false,coTheGapLai:false,
    diDong:true,coPin:false,coLoa:false,coCamera:false,dungDeHoc:false,
    coNhieu:false,coNuoc:false,coLua:false,hinhDang:"phức tạp",chatLieu:"gỗ/nhựa",coVach:false};

  initState('custom');
  state.customQuestion = {name:name, hints:hints, choices:shuffled, shuffledChoices:shuffled, features:fakeFeatures};
  state.normalRounds = 1;

  _updateModeUI();
  showScreen('screen-game');
  nextRound();
}

// (responsive: fill 100vw/100vh, no scaling needed)

// ============================================================
// WELCOME ROBOT SLIDESHOW
// ============================================================
var WELCOME_SLIDES = [
  'cam_xuc_robot/vui_vẻ_01-removebg-preview.png',
  'cam_xuc_robot/hạnh_phúc-removebg-preview.png',
  'cam_xuc_robot/đang_suy_nghĩ-removebg-preview.png',
  'cam_xuc_robot/thắc_mắc-removebg-preview.png',
  'cam_xuc_robot/yêu-removebg-preview.png',
  'cam_xuc_robot/tức_giận-removebg-preview.png',
  'cam_xuc_robot/buồn-removebg-preview.png',
  'cam_xuc_robot/gặp_khó_khăn-removebg-preview.png',
  'cam_xuc_robot/mệt-removebg-preview.png',
  'cam_xuc_robot/có_nguy_hiểm-removebg-preview.png',
  'cam_xuc_robot/gặp_sự_cố-removebg-preview.png',
  'cam_xuc_robot/vui_vẻ-removebg-preview.png'
];

var _slideIdx = 0;
var _slideTimer = null;

function buildSlideDots() {
  var container = document.getElementById('slide-dots');
  if (!container) return;
  container.innerHTML = '';
  WELCOME_SLIDES.forEach(function(_, i) {
    var d = document.createElement('div');
    d.className = 'slide-dot' + (i === 0 ? ' active' : '');
    d.onclick = (function(idx){ return function(){ goToSlide(idx); }; })(i);
    container.appendChild(d);
  });
}

function goToSlide(idx) {
  var img = document.getElementById('welcome-robot-img');
  if (!img) return;
  img.style.opacity = '0';
  setTimeout(function(){
    _slideIdx = idx;
    img.src = WELCOME_SLIDES[_slideIdx];
    img.style.opacity = '1';
    // Cập nhật dots
    var dots = document.querySelectorAll('.slide-dot');
    dots.forEach(function(d, i){ d.classList.toggle('active', i === _slideIdx); });
  }, 350);
}

function startWelcomeSlideshow() {
  buildSlideDots();
  clearInterval(_slideTimer);
  _slideTimer = setInterval(function(){
    goToSlide((_slideIdx + 1) % WELCOME_SLIDES.length);
  }, 800);
}

window.addEventListener('load', function(){
  startWelcomeSlideshow();
});

var _origShowScreen = showScreen;
showScreen = function(id) {
  if (id !== 'screen-welcome') {
    clearInterval(_slideTimer);
  } else {
    startWelcomeSlideshow();
  }
  _origShowScreen(id);
};
