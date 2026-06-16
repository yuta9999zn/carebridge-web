/** Dữ liệu bài viết mẫu (sẽ thay bằng API/CMS — DE-05). */
// Chuyên mục giờ quản lý động trong DB (bảng Category); category = "key" của chuyên mục.
export type Category = string;

export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "image"; caption: string; src?: string }
  | { type: "quote"; text: string };

export type Article = {
  id?: string; // gán bởi store (admin CRUD)
  slug: string;
  category: Category;
  title: string;
  date: string; // YYYY.MM.DD
  time: string; // HH:MM
  author: { name: string; initial: string };
  location?: string;
  readingTime: number; // phút
  views: number; // cho "Đọc nhiều"
  status?: "published" | "draft"; // mặc định published
  thumbnail?: string; // URL ảnh đại diện
  lead: string; // sapo
  excerpt: string; // cho thẻ
  tags: string[];
  body: Block[];
  translations?: Record<string, ArticleTranslation>;
};

export type ArticleTranslation = {
  title?: string;
  lead?: string;
  excerpt?: string;
  body?: Block[];
};

/** Trả về bài viết đã áp bản dịch theo locale (fallback về bản gốc JA nếu thiếu). */
export function localize(a: Article, locale: string): Article {
  if (locale === "ja") return a;
  const tr = a.translations?.[locale];
  if (!tr) return a;
  return {
    ...a,
    title: tr.title?.trim() ? tr.title : a.title,
    lead: tr.lead?.trim() ? tr.lead : a.lead,
    excerpt: tr.excerpt?.trim() ? tr.excerpt : a.excerpt,
    body: tr.body && tr.body.length ? tr.body : a.body,
  };
}

export const categories: Category[] = ["留学生の声", "実績数値", "お知らせ", "コラム"];

export const categoryGradient: Record<string, string> = {
  留学生の声: "from-[#e89177] to-[#d97a63]",
  実績数値: "from-[#3a6076] to-[#17384d]",
  お知らせ: "from-[#b3a86a] to-[#9a8f5a]",
  コラム: "from-[#c98b6a] to-[#a86848]",
};

/** Gradient ảnh placeholder theo chuyên mục (mặc định cho chuyên mục mới). */
export function gradientFor(key: string): string {
  return categoryGradient[key] ?? "from-[#c98b6a] to-[#a86848]";
}

export const articles: Article[] = [
  {
    slug: "ryugakusei-voice-2026",
    category: "留学生の声",
    title: "介護の現場で活躍するネパール人材の声",
    date: "2026.05.20",
    time: "10:30",
    author: { name: "編集部", initial: "編" },
    location: "関東",
    readingTime: 4,
    views: 1280,
    lead: "日本語と介護基礎を学び、特定技能「介護」として施設で活躍するネパール人スタッフ。現場での想いを伺いました。",
    excerpt: "日本語と介護基礎を学び、特定技能として施設で活躍するネパール人スタッフのインタビューをご紹介します。",
    tags: ["特定技能", "介護", "ネパール人材", "インタビュー"],
    body: [
      { type: "p", text: "ネパールで日本語と介護基礎教育を修了し、特定技能「介護」として来日したスタッフ。現在は関東の介護施設で活躍しています。" },
      { type: "h2", text: "「利用者さんの笑顔がやりがい」" },
      { type: "p", text: "「日本の介護はチームで支え合う文化があり、毎日学ぶことばかりです」と語ってくれました。慣れない環境でも、先輩職員の丁寧な指導で着実に成長しています。" },
      { type: "image", caption: "施設でのレクリエーションの様子（イメージ）" },
      { type: "quote", text: "利用者さんに『ありがとう』と言われる瞬間が一番うれしいです。" },
      { type: "p", text: "桃吉とITMジャパンは、来日後の生活オリエンテーションや定期面談を通じて、こうした人材が安心して長く働けるよう伴走しています。" },
    ],
  },
  {
    slug: "track-record-2026",
    category: "実績数値",
    title: "これまでの紹介実績と定着率",
    date: "2026.05.12",
    time: "09:00",
    author: { name: "編集部", initial: "編" },
    readingTime: 3,
    views: 980,
    lead: "連携送出機関数・紹介人数・面接通過率・定着率など、これまでの取り組みを数値でご紹介します。",
    excerpt: "連携送出機関数・紹介人数・面接通過率・定着率など、これまでの取り組みを数値でご紹介します。",
    tags: ["実績", "定着率", "データ"],
    body: [
      { type: "p", text: "ご紹介実績は累計150名以上、面接通過率は95%、提携施設数は30以上に拡大しています。" },
      { type: "image", caption: "紹介実績の推移（イメージ）" },
      { type: "p", text: "現地教育の質と、来日後の定着支援を両輪とすることで、高い定着率を維持しています。" },
    ],
  },
  {
    slug: "interview-kanto-facility",
    category: "留学生の声",
    title: "受け入れ施設の声：チームに新しい風",
    date: "2026.05.02",
    time: "14:10",
    author: { name: "編集部", initial: "編" },
    location: "関東",
    readingTime: 3,
    views: 760,
    lead: "ネパール人スタッフを受け入れた介護施設のご担当者に、現場の変化について伺いました。",
    excerpt: "ネパール人スタッフを受け入れた介護施設のご担当者に、現場の変化について伺いました。",
    tags: ["受け入れ施設", "現場の声"],
    body: [
      { type: "p", text: "「真面目で優しく、利用者からの信頼も厚い」と現場のリーダー。受け入れ前の不安は、丁寧な事前研修とサポート体制で解消されたと言います。" },
      { type: "image", caption: "申し送りの様子（イメージ）" },
      { type: "p", text: "多国籍なチームになったことで、職場の雰囲気も明るくなったとのことです。" },
    ],
  },
  {
    slug: "jlpt-n4-support",
    category: "コラム",
    title: "特定技能「介護」に必要な日本語レベルとは",
    date: "2026.04.25",
    time: "11:00",
    author: { name: "編集部", initial: "編" },
    readingTime: 5,
    views: 1520,
    lead: "JLPT N4・JFT-Basicなど、特定技能の日本語要件と現地教育について解説します。",
    excerpt: "JLPT N4・JFT-Basicなど、特定技能の日本語要件と現地教育について解説します。",
    tags: ["日本語", "JLPT", "JFT-Basic", "特定技能"],
    body: [
      { type: "p", text: "特定技能「介護」では、日本語能力試験N4相当、または国際交流基金日本語基礎テスト（JFT-Basic）の合格が求められます。" },
      { type: "h2", text: "現地教育でカバーする内容" },
      { type: "p", text: "現地送出機関では、日常会話に加えて介護分野の専門用語教育も実施しています。来日後すぐに現場で活躍できるよう備えています。" },
    ],
  },
  {
    slug: "partnership-start",
    category: "お知らせ",
    title: "桃吉 × ITMジャパン 連携開始のお知らせ",
    date: "2026.04.10",
    time: "12:00",
    author: { name: "広報", initial: "報" },
    readingTime: 2,
    views: 640,
    lead: "介護のプロと登録支援機関が連携し、ネパール特定技能「介護」人材紹介サービスを開始しました。",
    excerpt: "介護のプロと登録支援機関が連携し、ネパール特定技能「介護」人材紹介サービスを開始しました。",
    tags: ["お知らせ", "連携"],
    body: [
      { type: "p", text: "このたび、株式会社桃吉とITMジャパンは連携し、ネパール特定技能「介護」人材紹介サービス「ネパール介護人材ナビ」を開始いたしました。" },
      { type: "p", text: "介護現場を熟知した桃吉と、登録支援機関として許可を持つITMジャパンの強みを掛け合わせ、施設の皆さまに確かな人材をお届けします。" },
    ],
  },
  {
    slug: "support-after-arrival",
    category: "コラム",
    title: "来日後の定着支援でできること",
    date: "2026.03.28",
    time: "16:20",
    author: { name: "編集部", initial: "編" },
    readingTime: 4,
    views: 870,
    lead: "生活オリエンテーション、役所手続き、定期面談など、登録支援機関による支援内容をご紹介します。",
    excerpt: "生活オリエンテーション、役所手続き、定期面談など、登録支援機関による支援内容をご紹介します。",
    tags: ["定着支援", "登録支援機関"],
    body: [
      { type: "p", text: "登録支援機関は、住居の確保支援や生活オリエンテーション、定期的な面談など、10項目の支援を担います。" },
      { type: "image", caption: "生活オリエンテーションの様子（イメージ）" },
      { type: "p", text: "桃吉とITMジャパンは、施設と人材の双方に寄り添う伴走型の支援を行います。" },
    ],
  },
  {
    slug: "facility-count-30",
    category: "実績数値",
    title: "提携施設が30施設を突破しました",
    date: "2026.03.15",
    time: "10:00",
    author: { name: "広報", initial: "報" },
    readingTime: 2,
    views: 540,
    lead: "全国の介護施設との提携が30施設を超えました。地域別の内訳もご紹介します。",
    excerpt: "全国の介護施設との提携が30施設を超えました。地域別の内訳もご紹介します。",
    tags: ["実績", "提携施設"],
    body: [
      { type: "p", text: "関東・関西を中心に、提携施設が30施設を突破しました。今後も全国へ拡大してまいります。" },
    ],
  },
  {
    slug: "interview-osaka",
    category: "留学生の声",
    title: "関西の施設で働くスタッフのある一日",
    date: "2026.03.05",
    time: "08:45",
    author: { name: "編集部", initial: "編" },
    location: "関西",
    readingTime: 3,
    views: 720,
    lead: "朝の申し送りから利用者ケアまで、ネパール人スタッフの一日に密着しました。",
    excerpt: "朝の申し送りから利用者ケアまで、ネパール人スタッフの一日に密着しました。",
    tags: ["一日密着", "現場"],
    body: [
      { type: "p", text: "朝の申し送りに始まり、食事・入浴・レクリエーションの支援まで。笑顔の絶えない一日でした。" },
      { type: "image", caption: "朝の申し送り（イメージ）" },
    ],
  },
  {
    slug: "new-year-greeting",
    category: "お知らせ",
    title: "新年のご挨拶と今年の取り組み",
    date: "2026.01.06",
    time: "09:30",
    author: { name: "広報", initial: "報" },
    readingTime: 2,
    views: 410,
    lead: "本年も「確かな人材」を理念に、施設と人材の架け橋となってまいります。",
    excerpt: "本年も「確かな人材」を理念に、施設と人材の架け橋となってまいります。",
    tags: ["お知らせ", "新年"],
    body: [
      { type: "p", text: "旧年中は格別のご高配を賜り誠にありがとうございました。本年も誠実な人材紹介に努めてまいります。" },
    ],
  },
];

/** Helpers thao tác trên danh sách truyền vào (dữ liệu thật lấy từ store). */
export const findBySlug = (list: Article[], slug: string) => list.find((a) => a.slug === slug);

export function relatedFrom(list: Article[], slug: string, limit = 3): Article[] {
  const cur = findBySlug(list, slug);
  if (!cur) return [];
  const same = list.filter((a) => a.slug !== slug && a.category === cur.category);
  const others = list.filter((a) => a.slug !== slug && a.category !== cur.category);
  return [...same, ...others].slice(0, limit);
}

export function mostReadFrom(list: Article[], limit = 5): Article[] {
  return [...list].sort((a, b) => b.views - a.views).slice(0, limit);
}

/** Seed dùng khi store rỗng. */
export const seedArticles = articles;
