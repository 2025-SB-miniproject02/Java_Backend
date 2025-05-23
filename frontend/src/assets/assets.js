import logo from "./logo.png";
import search_icon from "./search_icon.svg";
import remove_icon from "./remove_icon.svg";
import arrow_right_icon_colored from "./arrow_right_icon_colored.svg";
import star_icon from "./star_icon.svg";
import star_dull_icon from "./star_dull_icon.svg";
import cart_icon from "./cart_icon.svg";
import nav_cart_icon from "./nav_cart_icon.svg";
import add_icon from "./add_icon.svg";
import refresh_icon from "./refresh_icon.svg";
import product_list_icon from "./product_list_icon.svg";
import order_icon from "./order_icon.svg";
import upload_area from "./upload_area.png";
import profile_icon from "./profile_icon.png";
import menu_icon from "./menu_icon.svg";
import delivery_truck_icon from "./delivery_truck_icon.svg";
import leaf_icon from "./leaf_icon.svg";
import coin_icon from "./coin_icon.svg";
import box_icon from "./box_icon.svg";
import trust_icon from "./trust_icon.svg";
import black_arrow_icon from "./black_arrow_icon.svg";
import white_arrow_icon from "./white_arrow_icon.svg";

// 메인 베너 이미지
import main_banner_bg from "./main_banner_bg.png";
import main_banner_bg_sm from "./main_banner_bg_sm.png";

// 하단 베너 이미지
import bottom_banner_image from "./bottom_banner_image.png";
import bottom_banner_image_sm from "./bottom_banner_image_sm.png";

// 카테고리 이미지
import nov_image from "./nov.png";
import essay_image from "./essay.png";
import improve_image from "./improve.png";
import cooking_image from "./cooking.png";
import economy_image from "./economy.png";
import examination_image from "./examination.png";
import kid_image from "./kid.png";


// 상품 이미지
import nov01 from "./nov01_군주론(무삭제 완역본).jpg";
import nov02_01 from "./nov02_아침에는_죽음을_생각하는_것이_좋다.jpg";
import nov02_02 from "./nov02_아침에는_죽음을_생각하는_것이_좋다02.jpg";
import nov03 from "./nov03_홍학의_자리.jpg";
import nov04 from "./nov04_퀸의_대각선1.jpg";
import nov05 from "./nov05_모순.jpg";
import essay01 from "./essay01_게으른_게_아니라_충전_중입니다.jpg";
import essay02 from "./essay02_햇빛은_찬란하고_인생은_귀하니까요.jpg";
import essay03 from "./essay03_우리끼리도_잘_살아.jpg";
import econ01 from "./econ01_위기의_시대_돈의_미래.jpg";
import econ02 from "./econ02_2025년_달라지는_부동산과_세금.jpg";
import selimpro01 from "./selimpro01_왓칭_Watching.jpg";
import cook01 from "./cook01_도시락의_시간.jpg";
import cook02 from "./cook02_널리케이크의_한식_디저트_클래스.jpg";
import exam01 from "./exam01_2025_시나공_정보처리기사_필기_기본서.jpg";
import kid01 from "./kid01_찰리와_초콜릿_공장_(반양장).jpg";
import kid02 from "./kid02_모모.jpg";





export const assets = {
  logo,
  search_icon,
  remove_icon,
  arrow_right_icon_colored,
  star_icon,
  star_dull_icon,
  cart_icon,
  nav_cart_icon,
  add_icon,
  refresh_icon,
  product_list_icon,
  order_icon,
  upload_area,
  profile_icon,
  menu_icon,
  delivery_truck_icon,
  leaf_icon,
  coin_icon,
  trust_icon,
  black_arrow_icon,
  white_arrow_icon,
  main_banner_bg,
  main_banner_bg_sm,
  bottom_banner_image,
  bottom_banner_image_sm,
  box_icon,
};

export const categories = [
  {
    text: "인문/소설",
    path: "Novel",
    image: nov_image,
    bgColor: "#FEF6DA",
  },
  {
    text: "수필/에세이",
    path: "Essay",
    image: essay_image,
    bgColor: "#FEE0E0",
  },
  {
    text: "경제경영",
    path: "Economy",
    image: economy_image,
    bgColor: "#F0F5DE",
  },
  {
    text: "자기계발",
    path: "Self-improvement",
    image: improve_image,
    bgColor: "#E1F5EC",
  },
  {
    text: "요리/살림",
    path: "Cooking",
    image: cooking_image,
    bgColor: "#FEE6CD",
  },
  {
    text: "수험서/자격증",
    path: "Examination",
    image: examination_image,
    bgColor: "#E0F6FE",
  },
  {
    text: "어린이",
    path: "Kid",
    image: kid_image,
    bgColor: "#F1E3F9",
  },
];

export const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { text: "Home", url: "#" },
      { text: "Best Sellers", url: "#" },
      { text: "Offers & Deals", url: "#" },
      { text: "Contact Us", url: "#" },
      { text: "FAQs", url: "#" },
    ],
  },
  {
    title: "Need help?",
    links: [
      { text: "Delivery Information", url: "#" },
      { text: "Return & Refund Policy", url: "#" },
      { text: "Payment Methods", url: "#" },
      { text: "Track your Order", url: "#" },
      { text: "Contact Us", url: "#" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { text: "Instagram", url: "#" },
      { text: "Twitter", url: "#" },
      { text: "Facebook", url: "#" },
      { text: "YouTube", url: "#" },
    ],
  },
];

export const features = [
  {
    icon: delivery_truck_icon,
    title: "회원간의 직거래로 빠른 배송",
    description: "Loraem ipsum dolor sit amet consectetur adipiscing elit sed.",
  },
  {
    icon: leaf_icon,
    title: "사용자 친화적인 플랫폼",
    description: "Loraem ipsum dolor sit amet consectetur",
  },
  {
    icon: coin_icon,
    title: "도서 보험으로 안전한 거래",
    description: "Loraem ipsum dolor sit amet",
  },
  {
    icon: trust_icon,
    title: "수천 명이 신뢰하는 플랫폼",
    description: "Loraem ipsum dolor sit amet consectetur adipiscing",
  },
];

// 샘플 상품
export const dummyProducts = [
  // 인문/소설
  {
    _id: "gd46g23h",
    name: "군주론(무삭제 완역본)",
    author: "니콜로 마키아벨리",
    publisher: "현대지성",
    category: "Novel",
    price: 7700,
    offerPrice: 5400,
    image: [nov01],
    description: [
      "품질등급 : 최상",
      "헌 상태 : 새것에 가까움",
      "표지 : 변색 없음, 닳은 흔적 없음, 얼룩 없음",
      "책등/책배 : 낙서 없음",
      "내부 : 변색 및 변형 없음",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "gd47g34h",
    name: "아침에는 죽음을 생각하는 것이 좋다",
    author: "김영민",
    publisher: "어크로스",
    category: "Novel",
    price: 15000,
    offerPrice: 8900,
    image: [nov02_01, nov02_02],
    description: [
      "품질등급 : 상",
      "헌 상태 : 사용감 있음",
      "표지 : 변색 없음, 닳은 흔적 없음, 얼룩 없음",
      "책등/책배 : 낙서 없음",
      "내부 : 변색 및 변형 없음",
      "제본상태 : 2cm 이하 찢어짐 있음",
      "- 5쪽 이하의 필기 및 풀이 또는 밑줄 있음",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "gd48g45h",
    name: "홍학의 자리",
    author: "정해연",
    publisher: "엘릭시르",
    category: "Novel",
    price: 14000,
    offerPrice: 9800,
    image: [nov03],
    description: [
      "품질등급 : 최상",
      "헌 상태 : 새것에 가까움",
      "표지 : 변색 없음, 닳은 흔적 없음, 얼룩 없음",
      "책등/책배 : 손상 없음, 낙서 없음",
      "내부 : 변색 및 변형 없음",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "gd49g56h",
    name: "퀸의 대각선1",
    author: "베르나르 베르베르",
    publisher: "열린책들",
    category: "Novel",
    price: 16800,
    offerPrice: 7300,
    image: [nov04],
    description: [
      "품질등급 : 최상",
      "헌 상태 : 새것에 가까움",
      "표지 : 변색 없음, 닳은 흔적 없음, 얼룩 없음",
      "책등/책배 : 손상 없음, 낙서 없음",
      "내부 : 변색 및 변형 없음",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "gd50g67h",
    name: "모순",
    author: "양귀자",
    publisher: "쓰다",
    category: "Novel",
    price: 13000,
    offerPrice: 7900,
    image: [nov05],
    description: [
      "품질등급 : 최상",
      "헌 상태 : 새것에 가까움",
      "표지 : 변색 없음, 닳은 흔적 없음, 얼룩 없음",
      "책등/책배 : 약간의 모서리 해짐",
      "내부 : 변색 및 변형 없음",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },

  // 에세이
  {
    _id: "ek51j12k",
    name: "게으른 게 아니라 충전 중입니다",
    author: "댄싱스네일",
    publisher: "허밍버드",
    category: "Essay",
    price: 14500,
    offerPrice: 8400,
    image: [essay01],
    description: [
      "품질등급 : 중",
      "헌 상태 : 사용감이 많으며 헌 느낌이 나는 책",
      "표지 : 전체적인 변색, 모서리 해짐 있음, 낙서 있음",
      "책등/책배 : 손상 없음, 낙서 없음",
      "내부 : 변색 없음, 5쪽 이하의 필기 및 풀이 또는 밑줄이 있음",
      "제본상태 : 2cm 이하 찢어짐 있음",
      "- 본문 읽기에 지장 없는 부록 없음",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "ek52j23k",
    name: "햇빛은 찬란하고 인생은 귀하니까요",
    author: "장명숙",
    publisher: "김영사",
    category: "Essay",
    price: 14800,
    offerPrice: 9100,
    image: [essay02],
    description: [
      "품질등급 : 상",
      "헌 상태 : 약간의 사용감은 있으나 깨끗한 책",
      "표지 : 희미한 변색이나 작은 얼룩이 있음, 찢어진 흔적 없음",
      "책등/책배 : 손상 없음, 낙서 없음",
      "내부 : 변색 없음, 아주 약간의 접힌 흔적 있음",
      "제본상태 : 제본 탈착 없음",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "ek53j34k",
    name: "우리끼리도 잘 살아",
    author: "한소리",
    publisher: "어떤책",
    category: "Essay",
    price: 15000,
    offerPrice: 5900,
    image: [essay03],
    description: [
      "품질등급 : 상",
      "헌 상태 : 약간의 사용감은 있으나 깨끗한 책",
      "표지 : 희미한 변색이나 작은 얼룩이 있음, 찢어진 흔적 없음",
      "책등/책배 : 손상 없음, 낙서 없음",
      "내부 : 변색 없음, 아주 약간의 접힌 흔적 있음",
      "제본상태 : 제본 탈착 없음",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },

  // 경제/경영
  {
    _id: "ek56j67k",
    name: "위기의 시대, 돈의 미래",
    author: "짐 로저스",
    publisher: "리더스북",
    category: "Economy",
    price: 17500,
    offerPrice: 7600,
    image: [econ01],
    description: [
      "품질등급 : 최상",
      "헌 상태 : 새것에 가까움",
      "표지 : 변색 없음, 찢어진 흔적 없음, 닳은 흔적 없음, 낙서 없음",
      "책등/책배 : 변색 없음, 닳은 흔적 없음",
      "내부 : 변색 없음, 낙서 없음, 변형 없음",
      "제본상태 : 제본 탈착 없음",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "ek57j78k",
    name: "2025년 달라지는 부동산과 세금",
    author: "택스코디(최용규)",
    publisher: "가나북스",
    category: "Economy",
    price: 22000,
    offerPrice: 14100,
    image: [econ02],
    description: [
      "품질등급 : 최상",
      "헌 상태 : 새것에 가까움",
      "표지 : 변색 없음, 찢어진 흔적 없음, 닳은 흔적 없음, 낙서 없음",
      "책등/책배 : 변색 없음, 닳은 흔적 없음",
      "내부 : 변색 없음, 낙서 없음, 변형 없음",
      "제본상태 : 제본 탈착 없음",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },

  // 자기계발
  {
    _id: "ek61j12k",
    name: "왓칭 Watching",
    author: "김상운",
    publisher: "정신세계사",
    category: "Self-improvement",
    price: 13000,
    offerPrice: 7200,
    image: [selimpro01],
    description: [
      "품질등급 : 중",
      "헌 상태 : 사용감이 많으며 헌 느낌이 나는 책",
      "표지 : 전체적인 변색, 모서리 해짐 있음, 낙서 있음",
      "책등/책배 : 손상 없음, 낙서 없음",
      "내부 : 변색 없음, 5쪽 이하의 필기 및 풀이 또는 밑줄이 있음",
      "제본상태 : 2cm 이하 찢어짐 있음",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  
  // 요리/살림
  {
    _id: "ek66j67k",
    name: "도시락의 시간",
    author: "아베 나오미, 아베 사토루",
    publisher: "인디고(글담)",
    category: "Cooking",
    price: 13800,
    offerPrice: 9000,
    image: [cook01],
    description: [
      "품질등급 : 상",
      "헌 상태 : 약간의 사용감은 있으나 깨끗한 책",
      "표지 : 희미한 변색이나 작은 얼룩이 있음, 찢어진 흔적 없음, 약간의 모서리 해짐",
      "책등/책배 : 희미한 변색이나 작은 얼룩이 있음",
      "내부 : 변색 없음, 아주 약간의 접힌 흔적 있음",
      "제본상태 : 제본 탈착 없음",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "ek67j78k",
    name: "널리케이크의 한식 디저트 클래스",
    author: "김주현",
    publisher: "한즈미디어(한스미디어)",
    category: "Cooking",
    price: 22000,
    offerPrice: 14000,
    image: [cook02],
    description: [
      "품질등급 : 최상",
      "헌 상태 : 새것에 가까움",
      "표지 : 변색 없음, 찢어진 흔적 없음, 닳은 흔적 없음, 낙서 없음",
      "책등/책배 : 변색 없음, 닳은 흔적 없음",
      "내부 : 변색 없음, 낙서 없음, 변형 없음",
      "제본상태 : 제본 탈착 없음",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },

  // 수험서/자격증
  {
    _id: "bk01a24z",
    name: "2025 시나공 정보처리기사 필기 기본서",
    author: "길벗 R&D,강윤석,김용갑,김우경,김종일,김정준",
    publisher: "길벗",
    category: "Examination",
    price: 35000,
    offerPrice: 23600,
    image: [exam01],
    description: [
      "품질등급 : 최상",
      "헌 상태 : 새것에 가까움",
      "표지 : 변색 없음, 찢어진 흔적 없음, 닳은 흔적 없음, 낙서 없음",
      "책등/책배 : 변색 없음, 닳은 흔적 없음",
      "내부 : 변색 없음, 낙서 없음, 변형 없음",
      "제본상태 : 제본 탈착 없음",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },

  // 어린이
  {
    _id: "in01f25u",
    name: "찰리와 초콜릿 공장 (반양장)",
    author: "로알드 달 (글),퀸틴 블레이크 (그림)",
    publisher: "시공주니어",
    category: "Kid",
    price: 7000,
    offerPrice: 4500,
    image: [kid01],
    description: [
      "품질등급 : 상",
      "헌 상태 : 약간의 사용감은 있으나 깨끗한 책",
      "표지 : 희미한 변색이나 작은 얼룩이 있음, 찢어진 흔적 없음, 약간의 모서리 해짐",
      "책등/책배 : 희미한 변색이나 작은 얼룩이 있음",
      "내부 : 변색 없음, 아주 약간의 접힌 흔적 있음",
      "제본상태 : 제본 탈착 없음",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "in02g26t",
    name: "모모",
    author: "미하엘 엔데",
    publisher: "비룡소",
    category: "Kid",
    price: 13500,
    offerPrice: 5800,
    image: [kid02],
    description: [
      "품질등급 : 중",
      "헌 상태 : 사용감이 많으며 헌 느낌이 나는 책",
      "표지 : 전체적인 변색, 모서리 해짐 있음, 낙서 있음",
      "책등/책배 : 전체적인 변색, 낙서 있음(이름 포함)",
      "내부 : 변색 없음, 5쪽 이하의 필기 및 풀이 또는 밑줄이 있음",
      "제본상태 : 2cm 이하 찢어짐 있음",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
];

export const dummyAddress = [
  {
    _id: "67b5b9e54ea97f71bbc196a0",
    userId: "67b5880e4d09769c5ca61644",
    firstName: "Great",
    lastName: "Stack",
    email: "user.greatstack@gmail.com",
    street: "Street 123",
    city: "Main City",
    state: "New State",
    zipcode: 123456,
    country: "IN",
    phone: "1234567890",
  },
];

export const dummyOrders = [
  {
    _id: "67e2589a8f87e63366786400",
    userId: "67b5880e4d09769c5ca61644",
    items: [
      {
        product: dummyProducts[3],
        quantity: 2,
        _id: "67e2589a8f87e63366786401",
      },
    ],
    amount: 89,
    address: dummyAddress[0],
    status: "Order Placed",
    paymentType: "Online",
    isPaid: true,
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  },
  {
    _id: "67e258798f87e633667863f2",
    userId: "67b5880e4d09769c5ca61644",
    items: [
      {
        product: dummyProducts[0],
        quantity: 1,
        _id: "67e258798f87e633667863f3",
      },
      {
        product: dummyProducts[1],
        quantity: 1,
        _id: "67e258798f87e633667863f4",
      },
    ],
    amount: 43,
    address: dummyAddress[0],
    status: "Order Placed",
    paymentType: "COD",
    isPaid: false,
    createdAt: "2025-03-25T07:17:13.068Z",
    updatedAt: "2025-03-25T07:17:13.068Z",
  },
];
