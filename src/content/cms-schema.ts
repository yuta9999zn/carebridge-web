/**
 * Khai báo nội dung CMS (About/Vision) — admin sửa & dịch theo locale.
 * Mỗi trường có bản mặc định ja/vi/en/ne. Public đọc DB ContentBlock; thiếu → dùng mặc định theo locale (fallback ja).
 */
export type Loc = "ja" | "vi" | "en" | "ne";
export type ContentField = {
  key: string;
  label: string;
  type: "text" | "textarea";
  ja: string;
  vi: string;
  en: string;
  ne: string;
};
export type ContentGroup = { id: string; title: string; fields: ContentField[] };

export const CONTENT_SCHEMA: ContentGroup[] = [
  {
    id: "about",
    title: "About（会社情報）",
    fields: [
      { key: "about.title", label: "ページタイトル", type: "text",
        ja: "会社情報", vi: "Giới thiệu công ty", en: "Company", ne: "कम्पनी जानकारी" },
      { key: "about.lead", label: "ページ説明", type: "textarea",
        ja: "介護のプロと、国の許可を持つ登録支援機関。二社が連携し、確かな海外人材をお届けします。",
        vi: "Chuyên gia điều dưỡng và cơ quan hỗ trợ đăng ký có giấy phép nhà nước. Hai công ty hợp tác mang đến nguồn nhân lực nước ngoài đáng tin cậy.",
        en: "Care professionals and a nationally licensed registration support organization. Two companies join forces to deliver reliable overseas talent.",
        ne: "स्याहार विशेषज्ञ र राष्ट्रिय अनुमति प्राप्त दर्ता सहयोग संस्था। दुई कम्पनी मिलेर भरपर्दो विदेशी जनशक्ति प्रदान गर्छन्।" },
      { key: "about.intro.title", label: "見出し", type: "text",
        ja: "わたしたちについて", vi: "Về chúng tôi", en: "About us", ne: "हाम्रोबारे" },
      { key: "about.intro.body", label: "本文", type: "textarea",
        ja: "「ネパール介護人材ナビ」は、株式会社桃吉とITMジャパンの連携によるサービスです。介護現場を理解する桃吉と、登録支援機関として国の許可を持つITMジャパンが、それぞれの強みを掛け合わせ、特定技能「介護」の海外人材（現在はネパールが中心）を日本の施設へ確実にお繋ぎします。",
        vi: "「Nepal Kaigo Jinzai Navi」là dịch vụ hợp tác giữa Công ty CP Momokichi và ITM Japan. Momokichi am hiểu hiện trường điều dưỡng, cùng ITM Japan — cơ quan hỗ trợ đăng ký có giấy phép nhà nước — kết hợp thế mạnh để kết nối chắc chắn nhân lực nước ngoài diện kỹ năng đặc định「điều dưỡng」(hiện tại trọng tâm là Nepal) đến các cơ sở tại Nhật.",
        en: "“Nepal Kaigo Jinzai Navi” is a joint service by Momokichi Co., Ltd. and ITM Japan. Momokichi, which understands care worksites, and ITM Japan, a nationally licensed registration support organization, combine their strengths to reliably connect Specified Skilled Worker (Care) talent from overseas (currently focused on Nepal) to facilities in Japan.",
        ne: "“नेपाल केयर जनशक्ति नेवी” Momokichi कम्पनी र ITM Japan को सहकार्यमा सञ्चालित सेवा हो। स्याहार क्षेत्र बुझ्ने Momokichi र राष्ट्रिय अनुमति प्राप्त दर्ता सहयोग संस्था ITM Japan ले आ-आफ्नो बल मिलाएर विशेष दक्षता (स्याहार) का विदेशी जनशक्ति (हाल नेपाल केन्द्रित) लाई जापानका केन्द्रहरूमा भरपर्दो रूपमा जोड्छन्।" },
      { key: "about.companyA.name", label: "会社A 名称", type: "text",
        ja: "株式会社 桃吉", vi: "Công ty CP Momokichi", en: "Momokichi Co., Ltd.", ne: "Momokichi कम्पनी" },
      { key: "about.companyA.role", label: "会社A 役割", type: "text",
        ja: "介護のパートナー ／ 受け入れ・定着支援",
        vi: "Đối tác điều dưỡng / Hỗ trợ tiếp nhận・định cư",
        en: "Care partner / Onboarding & retention support",
        ne: "स्याहार साझेदार / स्वागत・बसोबास सहयोग" },
      { key: "about.companyA.desc", label: "会社A 説明", type: "textarea",
        ja: "通所介護（デイサービス）・訪問看護・福祉用具を手がける介護事業者。事業者・現場・経営の視点と、技能実習・特定技能の受入実績を基盤に、施設が本当に必要とする人材像を理解し、受け入れから定着まで寄り添います。",
        vi: "Cơ sở điều dưỡng vận hành dịch vụ ban ngày (day service)・điều dưỡng tại nhà・dụng cụ phúc lợi. Dựa trên góc nhìn của nhà điều dưỡng・hiện trường・quản lý và thành tích tiếp nhận thực tập kỹ năng・kỹ năng đặc định, hiểu rõ hình mẫu nhân lực mà cơ sở thực sự cần và đồng hành từ tiếp nhận đến gắn bó.",
        en: "A care provider offering day services, home-visit nursing and welfare equipment. Drawing on a provider's, worksite's and management's perspective — and a record of hosting technical interns and Specified Skilled Workers — we understand the talent facilities truly need and support them from onboarding to retention.",
        ne: "डे-सेवा (day service)・घर-भेट नर्सिङ・कल्याणकारी उपकरण सञ्चालन गर्ने स्याहार सेवा प्रदायक। सेवा प्रदायक・क्षेत्र・व्यवस्थापन दृष्टिकोण र प्राविधिक प्रशिक्षण・विशेष दक्षता स्वागत अनुभवका आधारमा, केन्द्रलाई साँच्चै चाहिने जनशक्ति बुझेर स्वागतदेखि बसोबाससम्म साथ दिन्छौं।" },
      { key: "about.companyB.name", label: "会社B 名称", type: "text",
        ja: "株式会社 ITMジャパン", vi: "Công ty CP ITM Japan", en: "ITM Japan Co., Ltd.", ne: "ITM Japan कम्पनी" },
      { key: "about.companyB.role", label: "会社B 役割", type: "text",
        ja: "登録支援機関 ／ 有料職業紹介",
        vi: "Cơ quan hỗ trợ đăng ký / Giới thiệu việc làm có phí",
        en: "Registration support org / Fee-charging job placement",
        ne: "दर्ता सहयोग संस्था / शुल्क सहित रोजगार परिचय" },
      { key: "about.companyB.desc", label: "会社B 説明", type: "textarea",
        ja: "国の許可・登録を持つ登録支援機関。技能実習時代からの経験と、ベトナム・ハノイをはじめとする海外教育実績を背景に、現地送出機関との連携、入国手続き、コンプライアンス遵守を担います。",
        vi: "Cơ quan hỗ trợ đăng ký có giấy phép・đăng ký nhà nước. Với kinh nghiệm từ thời thực tập kỹ năng và thành tích giáo dục ở nước ngoài — gồm Hà Nội, Việt Nam — đảm trách liên kết cơ quan phái cử tại chỗ, thủ tục nhập cảnh và tuân thủ pháp luật.",
        en: "A nationally licensed and registered support organization. Backed by experience since the technical intern era and overseas education — including in Hanoi, Vietnam — we handle coordination with local sending organizations, immigration procedures, and compliance.",
        ne: "राष्ट्रिय अनुमति・दर्ता भएको दर्ता सहयोग संस्था। प्राविधिक प्रशिक्षण कालदेखिको अनुभव र भियतनामको हानोईलगायत विदेशी शिक्षा अनुभवका आधारमा, स्थानीय पठाउने संस्थासँग समन्वय, प्रवेश प्रक्रिया र कानुन पालना सम्हाल्छौं।" },
      { key: "about.companyB.regLabel", label: "登録番号 ラベル", type: "text",
        ja: "登録支援機関 登録番号", vi: "Số đăng ký cơ quan hỗ trợ đăng ký", en: "Reg. support org number", ne: "दर्ता सहयोग संस्था नम्बर" },
      { key: "about.companyB.reg", label: "登録番号", type: "text", ja: "登 第○○号", vi: "登 第○○号", en: "登 第○○号", ne: "登 第○○号" },
      { key: "about.companyB.licenseLabel", label: "許可番号 ラベル", type: "text",
        ja: "有料職業紹介 許可番号", vi: "Số giấy phép giới thiệu việc làm", en: "Job placement license no.", ne: "रोजगार परिचय अनुमति नम्बर" },
      { key: "about.companyB.license", label: "許可番号", type: "text", ja: "○○-○○○○○○", vi: "○○-○○○○○○", en: "○○-○○○○○○", ne: "○○-○○○○○○" },
    ],
  },
  {
    id: "vision",
    title: "Vision（ビジョン・方針）",
    fields: [
      { key: "vision.title", label: "ページタイトル", type: "text",
        ja: "ビジョン・方針", vi: "Tầm nhìn・Chính sách", en: "Vision & Policy", ne: "दृष्टिकोण・नीति" },
      { key: "vision.lead", label: "ページ説明", type: "textarea",
        ja: "人材の力で、介護の未来を支える。誠実で確かな人材紹介を通じて、施設と人材の双方が安心できる社会を目指します。",
        vi: "Dùng sức mạnh nhân lực để nâng đỡ tương lai ngành điều dưỡng. Qua việc giới thiệu nhân lực trung thực và chắc chắn, hướng tới xã hội mà cả cơ sở và nhân lực đều an tâm.",
        en: "Supporting the future of care through people. With honest, dependable placement, we aim for a society where both facilities and talent feel secure.",
        ne: "जनशक्तिको बलले स्याहारको भविष्यलाई टेवा। इमानदार र भरपर्दो परिचयमार्फत केन्द्र र जनशक्ति दुवै ढुक्क हुने समाज लक्ष्य।" },
      { key: "vision.vision.title", label: "ビジョン 見出し", type: "text",
        ja: "私たちのビジョン", vi: "Tầm nhìn của chúng tôi", en: "Our vision", ne: "हाम्रो दृष्टिकोण" },
      { key: "vision.vision.body", label: "ビジョン 本文", type: "textarea",
        ja: "介護現場が抱える人材の課題——採用・定着・育成、そして現場運営——に対し、教育を受けた意欲ある海外人材と、人材を必要とする施設を、適法かつ誠実に結びつける。日本と海外、双方にとって価値ある架け橋となることを目指します。",
        vi: "Trước những bài toán nhân lực mà hiện trường điều dưỡng đối mặt — tuyển dụng・gắn bó・đào tạo và vận hành hiện trường — chúng tôi kết nối hợp pháp và trung thực giữa nhân lực nước ngoài được đào tạo, có ý chí với cơ sở đang cần nhân lực. Hướng tới trở thành cầu nối giá trị cho cả Nhật Bản và các nước.",
        en: "For the staffing challenges care worksites face — hiring, retention, training and on-the-ground operations — we lawfully and sincerely connect motivated, trained overseas talent with facilities that need them, aiming to be a valuable bridge between Japan and abroad.",
        ne: "स्याहार क्षेत्रले भोग्ने जनशक्ति चुनौती——भर्ती・टिकाउ・विकास र क्षेत्र सञ्चालन——का लागि, तालिम प्राप्त उत्साही विदेशी जनशक्ति र जनशक्ति आवश्यक केन्द्रलाई वैध र इमानदार रूपमा जोड्छौं। जापान र विदेश दुवैका लागि मूल्यवान पुल बन्ने लक्ष्य।" },
      { key: "vision.mission.title", label: "ミッション 見出し", type: "text",
        ja: "ミッション", vi: "Sứ mệnh", en: "Mission", ne: "मिसन" },
      { key: "vision.mission.body", label: "ミッション 本文", type: "textarea",
        ja: "「確かさ」を何よりも大切に。許可・登録に基づく適法な紹介、現地教育による質の担保、入国後の定着支援まで、一貫した責任ある体制でお応えします。",
        vi: "Đặt「sự chắc chắn」lên trên hết. Từ giới thiệu hợp pháp dựa trên giấy phép・đăng ký, đảm bảo chất lượng qua đào tạo tại chỗ, đến hỗ trợ định cư sau nhập cảnh — đáp ứng bằng một thể chế có trách nhiệm xuyên suốt.",
        en: "Above all, we value certainty. From lawful placement based on licensing and registration, to quality assured by local training, to post-arrival retention support — we respond with a consistent, responsible system.",
        ne: "सबैभन्दा बढी “निश्चितता” लाई महत्त्व। अनुमति・दर्तामा आधारित वैध परिचय, स्थानीय तालिमबाट गुणस्तर, आगमनपछि बसोबास सहयोगसम्म — निरन्तर जिम्मेवार प्रणालीले जवाफ दिन्छौं।" },
      { key: "vision.policy1.title", label: "方針1 見出し", type: "text",
        ja: "コンプライアンス方針", vi: "Chính sách tuân thủ", en: "Compliance policy", ne: "अनुपालन नीति" },
      { key: "vision.policy1.desc", label: "方針1 本文", type: "textarea",
        ja: "登録支援機関・有料職業紹介の許可に基づき、関連法令を遵守した適法な人材紹介を徹底します。",
        vi: "Dựa trên giấy phép cơ quan hỗ trợ đăng ký・giới thiệu việc làm có phí, triệt để giới thiệu nhân lực hợp pháp tuân thủ các quy định liên quan.",
        en: "Based on our registration support and job-placement licenses, we strictly conduct lawful placement in compliance with relevant laws.",
        ne: "दर्ता सहयोग・शुल्क सहित रोजगार परिचय अनुमतिमा आधारित, सम्बन्धित कानुन पालना गर्दै वैध जनशक्ति परिचयमा कडाइ।" },
      { key: "vision.policy2.title", label: "方針2 見出し", type: "text",
        ja: "品質方針", vi: "Chính sách chất lượng", en: "Quality policy", ne: "गुणस्तर नीति" },
      { key: "vision.policy2.desc", label: "方針2 本文", type: "textarea",
        ja: "日本語・介護基礎教育を経た人材のみをご紹介。現地送出機関と連携し、質の高い人材育成を継続します。",
        vi: "Chỉ giới thiệu nhân lực đã qua đào tạo tiếng Nhật・điều dưỡng cơ bản. Liên kết cơ quan phái cử tại chỗ, tiếp tục đào tạo nhân lực chất lượng cao.",
        en: "We introduce only talent who have completed Japanese and basic care training, and continue high-quality talent development with local sending organizations.",
        ne: "जापानी・स्याहार आधारभूत तालिम लिएका जनशक्ति मात्र परिचय। स्थानीय पठाउने संस्थासँग मिलेर उच्च गुणस्तरको जनशक्ति विकास निरन्तर।" },
      { key: "vision.policy3.title", label: "方針3 見出し", type: "text",
        ja: "人材尊重方針", vi: "Chính sách tôn trọng nhân lực", en: "Respect for people", ne: "जनशक्ति सम्मान नीति" },
      { key: "vision.policy3.desc", label: "方針3 本文", type: "textarea",
        ja: "人材一人ひとりの人格と権利を尊重し、安心して働き、暮らせる環境づくりを支援します。",
        vi: "Tôn trọng nhân cách và quyền của từng nhân lực, hỗ trợ tạo môi trường để họ an tâm làm việc và sinh sống.",
        en: "We respect the dignity and rights of every individual, supporting an environment where they can work and live with peace of mind.",
        ne: "प्रत्येक जनशक्तिको व्यक्तित्व र अधिकारको सम्मान गर्दै, ढुक्कसँग काम र बसोबास गर्न सकिने वातावरण निर्माणमा सहयोग।" },
    ],
  },
];

export const CONTENT_KEYS = CONTENT_SCHEMA.flatMap((g) => g.fields.map((f) => f.key));

const FIELD_BY_KEY = new Map(CONTENT_SCHEMA.flatMap((g) => g.fields).map((f) => [f.key, f]));

/** Giá trị mặc định theo locale (fallback ja). */
export function contentDefault(key: string, locale: string): string {
  const f = FIELD_BY_KEY.get(key);
  if (!f) return "";
  const v = (f as Record<string, string>)[locale];
  return v && v.trim() ? v : f.ja;
}
