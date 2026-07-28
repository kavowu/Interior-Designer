import type { LucideIcon } from "lucide-react";
import {
  AirVent,
  Award,
  Droplets,
  Footprints,
  Gift,
  HeartHandshake,
  Microscope,
  Shirt,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  WandSparkles,
} from "lucide-react";

const assetPath = (fileName: string) => `${import.meta.env.BASE_URL}images/${fileName}`;

export const assets = {
  hero: assetPath("hero-bg.png"),
  challengeVisibility: assetPath("challenge-visibility.png"),
  challengeValue: assetPath("challenge-value.png"),
  challengeTrust: assetPath("challenge-trust.png"),
  painDrying: assetPath("pain-drying.png"),
  painKitchen: assetPath("pain-kitchen.png"),
  painShoe: assetPath("pain-shoe.png"),
  painWardrobe: assetPath("pain-wardrobe.png"),
  painBathroom: assetPath("pain-bathroom.png"),
  technology: assetPath("wetop-tech.png"),
  serviceFlow: assetPath("service-flow.png"),
  comparison: assetPath("comparison-visual.png"),
} as const;

export const navigationItems = [
  { label: "三大難題", href: "#challenges" },
  { label: "生活痛點", href: "#pain-points" },
  { label: "提案話術", href: "#scripts" },
  { label: "核心技術", href: "#technology" },
  { label: "服務流程", href: "#service" },
  { label: "價值對比", href: "#comparison" },
  { label: "預約諮詢", href: "#contact" },
] as const;

export type Challenge = {
  number: string;
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  background: string;
  solution: string;
  highlights: string[];
  scriptTitle: string;
  script: string;
};

export const challenges: Challenge[] = [
  {
    number: "難題一",
    title: "如何從眾多設計師中被看見？",
    lead: "客戶在比價、比設計風格時，真正在意的是「這個家，安全嗎？」",
    image: assets.challengeVisibility,
    imageAlt: "如何從眾多設計師中被看見？",
    background:
      "多數設計師只能保證「用綠建材」，卻無法解決「裝修後持續釋放甲醛」的問題。甲醛會持續釋放 3~15 年，這是客戶沒說出口的深層恐懼。",
    solution:
      "WETOP 讓設計師可以說出競爭對手說不出的話：「除了風格與機能，我還幫您規劃了『這個家未來的空氣品質』。一般的空氣清淨機只能過濾飄在空中的粉塵，但 WETOP 能 24 小時主動分解空氣中和附著在牆面、家具表面的甲醛與異味——而且完全不用換耗材。」",
    highlights: [
      "客戶真正的擔憂 — 「這個家，安全嗎？」",
      "一般設計師的極限 — 僅保證綠建材，無法解決持續釋放的甲醛",
      "WETOP 破解 — 24小時主動分解甲醛，不換耗材，差異化一目瞭然",
    ],
    scriptTitle: "競爭對手說不出的話",
    script:
      "「除了風格與機能，我還幫您規劃了『這個家未來的空氣品質』。甲醛會持續釋放3~15年，一般的空氣清淨機只能過濾飄在空中的粉塵，但 WETOP 能24小時主動分解空氣中和附著在牆面、家具表面的甲醛與異味——而且完全不用換耗材。」",
  },
  {
    number: "難題二",
    title: "如何讓客戶覺得「這個設計值得」？",
    lead: "客戶願意為「看得見的價值」付費。WETOP 能融入具體的設計元素，讓客戶「有感」。",
    image: assets.challengeValue,
    imageAlt: "如何讓客戶覺得這個設計值得？",
    background:
      "設計師的專業能力（如空間規劃、美學素養）很難在前期溝通中被客戶量化感知。但當設計能解決具體的生活痛點，價值就不證自明。",
    solution:
      "WETOP 融入具體設計元素，讓客戶直接感受到設計的價值：DIY 電子衣櫥解決「髒衣樹」問題，市售電子衣櫥一台 4~7 萬且不能處理不可水洗衣物，而 WETOP 方案價格不到一半；空調防霉＋節能，分解管線黴菌並讓冷氣可調高 1~2°C，每年省 6~18% 電費；廚房油煙、鞋櫃異味、廁所除霉等全面解決生活痛點。",
    highlights: [
      "DIY 電子衣櫥 — 解決「髒衣樹」，價格不到市售一半，不傷材質",
      "空調防霉＋節能 — 分解管線黴菌，冷氣調高1~2°C，年省6~18%電費",
      "全面痛點解決 — 廚房油煙、鞋櫃異味、廁所除霉一次到位",
    ],
    scriptTitle: "DIY 電子衣櫥提案話術",
    script:
      "「市面上的電子衣櫥一台要4~7萬，而且羊毛大衣、絲質圍巾這些您最在意的衣物，反而不能放進去。我的做法是在您的更衣室規劃一個保養櫃，搭配 WETOP——它用常溫主動分解異味，完全不傷材質，價格不到市售的一半，而且不用換耗材。」",
  },
  {
    number: "難題三",
    title: "如何建立「設計師＝健康顧問」的專業形象？",
    lead: "將 WETOP 納入標準服務流程，讓客戶感受到你不只設計空間，更設計了一種健康的生活方式。",
    image: assets.challengeTrust,
    imageAlt: "如何建立設計師健康顧問的專業形象？",
    background:
      "多數設計師與客戶的關係在交屋後就結束。但如果設計師能持續提供健康生活指導，就能從一次性交易升級為長期信任關係。",
    solution:
      "三階段服務流程讓專業形象深入人心：設計階段在圖面上標示 WETOP 預留位置，說明「這裡我幫您規劃了環境淨化設備」；交屋階段將 WETOP 作為「健康交屋禮」，現場開機示範；售後階段提供「如何用 WETOP 保養衣物、鞋子、包包」的衛教資訊。",
    highlights: [
      "設計階段 — 圖面標示 WETOP 預留位置，健康思維從源頭融入",
      "交屋階段 — WETOP 作為「健康交屋禮」，現場開機示範",
      "售後階段 — 提供衣物、鞋子、包包保養衛教，持續展現專業",
    ],
    scriptTitle: "健康顧問定位話術",
    script:
      "「我不只幫您設計空間，更設計了一種健康的生活方式。交屋時我會送您一台 WETOP 環境淨化器作為健康禮，並教您如何用它來保養衣物、鞋子、包包——這不是售後服務的結束，而是我們健康生活合作的開始。」",
  },
];

export type PainPoint = {
  name: string;
  tagline: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
  concern: string;
  designSolution: string;
  value: string;
  script: string;
};

export const painPoints: PainPoint[] = [
  {
    name: "室內晾衣霉味",
    tagline: "潮濕悶出的「黴菌味」",
    image: assets.painDrying,
    imageAlt: "室內晾衣霉味",
    icon: Shirt,
    concern:
      "台灣氣候潮濕，許多家庭受限於空間，必須在室內晾衣。當衣物無法迅速乾燥，細菌與黴菌便開始在纖維上繁殖，產生一股揮之不去的「潮味」。這是許多家庭的日常困擾，卻少有設計師會主動處理。",
    designSolution:
      "規劃「隱藏式晾衣區」——利用陽台或浴室旁的畸零空間，設計可收折的晾衣架，並在該區域預留 WETOP 的擺放位置。",
    value:
      "WETOP 環境淨化器具備室內曬衣去除環境黴菌霉味的功能。它釋放的淨化因子能主動分解潮濕空氣中孳生的黴菌孢子與其產生的異味，讓室內晾衣不再伴隨惱人的悶臭味。",
    script:
      "「台灣天氣潮濕，室內晾衣很容易有霉味。我會在這裡幫您規劃一台 WETOP 環境淨化器，它會主動分解空氣中的黴菌和異味，讓您的衣服晾乾的同時，也能保持清新。」",
  },
  {
    name: "廚房油煙",
    tagline: "看不見的呼吸道殺手",
    image: assets.painKitchen,
    imageAlt: "廚房油煙",
    icon: UtensilsCrossed,
    concern:
      "廚房是家庭的能量中心，也是油煙與異味的來源。即使有抽油煙機，烹飪時溢散的油煙分子仍會附著在牆面、天花板、窗簾上，長期累積形成難以清除的油垢與異味。研究指出，廚房油煙是肺癌的主要成因之一。",
    designSolution:
      "規劃「半開放式廚房」的空氣對策——在廚房與餐廳之間，預留 WETOP 的擺放位置，確保淨化因子能覆蓋整個烹飪與用餐區域。",
    value:
      "WETOP 能有效消除廚房內表面累積的油漬及異味。有用戶實際將 WETOP 放在廚房，專門應對烹煮時溢出的油煙，回饋「十分有效」。",
    script:
      "「很多客戶不知道，廚房油煙是室內空氣污染的主要來源之一。我建議在廚房區域加裝一台 WETOP，它能主動分解烹飪時溢散的油煙分子，保護您和家人的呼吸道健康。」",
  },
  {
    name: "鞋櫃異味",
    tagline: "「脫鞋瞬間」的尷尬",
    image: assets.painShoe,
    imageAlt: "鞋櫃異味",
    icon: Footprints,
    concern:
      "鞋櫃是家中異味最集中的區域之一。尤其是潮濕天氣，鞋子內部孳生的細菌會產生強烈臭味。客戶可能已經習慣了，但每次有客人來訪，脫鞋的瞬間總是尷尬。",
    designSolution:
      "設計「會呼吸的玄關」——在鞋櫃設計中預留通風孔與 WETOP 的擺放空間，讓淨化因子能在櫃內循環。",
    value:
      "有用戶實測，將 WETOP 放進鞋櫃一整晚，「有霉味跟臭腳味的鞋，到早上打開鞋櫃就沒什麼味道了」。WETOP 官方也建議將鞋櫃作為測試場域之一。",
    script:
      "「玄關是家的門面，但鞋櫃的氣味常常是客戶不好意思說的困擾。我會在鞋櫃設計中融入 WETOP 的擺放空間，讓它每天晚上自動幫鞋子除臭，早上打開鞋櫃，什麼味道都沒有。」",
  },
  {
    name: "衣櫃精品發霉",
    tagline: "包包發霉、衣物異味的救星",
    image: assets.painWardrobe,
    imageAlt: "衣櫃精品發霉",
    icon: Sparkles,
    concern:
      "台灣的高濕度環境，讓許多人的衣櫃成為黴菌的溫床。尤其是一些無法水洗的昂貴衣物（羊毛大衣、絲質圍巾）與精品包包，一旦發霉，損失動輒數萬元。客戶可能有好幾個名牌包，卻不知道怎麼保養。",
    designSolution:
      "規劃「精品衣物保養櫃」——在更衣室設計一個小型密閉櫃體，內部預留 WETOP 的擺放位置，讓客戶能定期將精品包包、大衣放入進行「乾式保養」。",
    value:
      "有用戶將 WETOP 放入衣櫃，「晚上放進去，隔天早上打開衣櫃拿衣服時，發現較不會打噴嚏過敏了」。它能在常溫、無液體接觸的狀態下，抑制黴菌與異味的產生，完全不傷材質。",
    script:
      "「台灣這麼潮濕，很多客戶的名牌包、羊毛大衣放在衣櫃裡就發霉了。我會在您的更衣室規劃一個『精品保養空間』，搭配 WETOP 環境淨化器，它會在常溫下主動分解黴菌和異味，完全不傷材質，讓您的收藏品能長久保持如新。」",
  },
  {
    name: "廁所異味黴菌",
    tagline: "最私密空間的尷尬",
    image: assets.painBathroom,
    imageAlt: "廁所異味黴菌",
    icon: Droplets,
    concern:
      "廁所是家中最潮濕的空間，也是異味與黴菌最容易孳生的地方。管線異味、尿騷味、牆角黴斑——這些問題讓客戶困擾已久，卻不知道如何徹底解決。",
    designSolution:
      "規劃「無異味衛浴」——在廁所設計中預留 WETOP 的擺放位置（如洗手台下方的畸零空間），讓淨化因子能持續分解異味與抑制黴菌。",
    value:
      "有用戶實測，將 WETOP 放入廁所半天，「真的完全去除尿騷味，叫我媽來聞她也聞不出異味了」。WETOP 官方也建議將廁所作為測試場域之一。",
    script:
      "「廁所的異味和黴菌是很多客戶的痛點，但往往不好意思說。我會在您的衛浴空間規劃一台 WETOP，它能 24 小時主動分解異味、抑制黴菌生長，讓廁所真正成為一個乾淨、舒適的私密空間。」",
  },
];

export const technologyItems: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Microscope,
    title: "PICT 仿生態光離子催化技術",
    body: "產生臭氧（O₃）與過氧化氫（H₂O₂），直接將奈米級病毒、甲醛與異味分子的化學鍵打斷，還原為無害的水與二氧化碳。不依賴被動攔截，無濾網發霉、堵塞與二次污染風險。",
  },
  {
    icon: ShieldCheck,
    title: "雙重感染路徑切斷",
    body: "同時切斷病毒的「空氣傳播（飛沫／氣溶膠）」與「表面傳播（接觸感染）」雙重感染路徑，實現真正的 3D 零死角防護。淨化因子能改變物體表面水分子的氫鍵結構，造成「表面脫水」，破壞黴菌生長所需的水膜。",
  },
  {
    icon: Award,
    title: "SNQ 國家品質標章認證",
    body: "獲 SNQ 國家品質標章防疫產品認證。經鴻海集團 Fusion 智能醫療品牌工程師 2,000 天以上連續監測實證，並實際佈建於馬偕醫院與國泰長照中心。100% MIT 台灣研發與製造。",
  },
  {
    icon: AirVent,
    title: "24小時安全人機共存",
    body: "臭氧濃度嚴格控制在 < 50 ppb 的自然背景值，實現 24 小時安全人機共存。絕不使用高壓放電，保證 100% 不產生致癌的氮氧化物（NOx）隱形毒害。最大功耗僅 14W，無需更換耗材。",
  },
];

export const serviceSteps: { number: string; icon: LucideIcon; title: string; body: string }[] = [
  {
    number: "01",
    icon: WandSparkles,
    title: "設計階段",
    body: "在圖面上標示 WETOP 的預留位置，向客戶說明「這裡我幫您規劃了環境淨化設備」，讓健康思維從設計源頭就融入空間。",
  },
  {
    number: "02",
    icon: Gift,
    title: "交屋階段",
    body: "將 WETOP 作為「健康交屋禮」，現場開機示範，讓客戶在入住第一天就感受到設計師對健康生活的用心。",
  },
  {
    number: "03",
    icon: HeartHandshake,
    title: "售後階段",
    body: "提供「如何用 WETOP 保養衣物、鞋子、包包」的衛教資訊，持續展現設計師作為健康生活顧問的專業形象。",
  },
];

export const comparisonRows = [
  ["價值主張", "風格、材質、美學", "健康生活、痛點解決、全方位關懷"],
  ["競爭方式", "比價格、比風格、比工期", "比洞察、比解決方案、比信任"],
  ["客戶感受", "「設計費值不值得？」", "「他幫我解決了我沒想到的問題」"],
  ["差異化", "容易被複製、被比價", "無法被複製的健康專業壁壘"],
  ["客戶關係", "一次性交易", "長期健康生活顧問"],
  ["甲醛對策", "僅保證使用綠建材", "主動分解持續釋放的甲醛，24小時守護"],
] as const;

export const propertyTypes = ["新成屋", "中古屋", "預售屋", "商業空間"] as const;
export const budgetRanges = ["50 萬以下", "50-100 萬", "100-200 萬", "200-500 萬", "500 萬以上"] as const;
