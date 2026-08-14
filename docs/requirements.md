# Tài liệu Requirement — CareBridge Web (介護 × 特定技能「介護」ネパール人材紹介)

> Nguồn: `WEBデザイン5.pdf` + `yêu cầu.pdf` + brief thiết kế lại Home (UX/UI + B2B copywriting).
> Cập nhật: 2026-06-15. **Phạm vi tài liệu này: trang Home.** Các trang khác (/about, /vision, /articles, /booking, /contact) đã xây sẵn — không thiết kế lại.

## 1. Tổng quan & mục tiêu
Website giới thiệu **nhân lực特定技能「介護」 (chủ lực Nepal)** do **株式会社桃吉 × 株式会社ITMジャパン** hợp tác.

| Vai trò | Công ty |
|---|---|
| 介護事業者 (hiểu hiện trường・vận hành cơ sở) | **株式会社桃吉** |
| 登録支援機関 / 有料職業紹介 (募集・教育・受入・định cư) | **株式会社ITMジャパン** |

**Đối tượng B2B**: 介護施設の経営者・施設長・採用担当者・人事責任者; cơ sở thiếu nhân lực đang cân nhắc tuyển 特定技能外国人.

**Mục tiêu Home**: dẫn dắt logic Vấn đề → Độ tin cậy → Giải pháp → Giáo dục → Quy trình → Chi phí → CTA; luôn rõ bước tiếp theo (đặt lịch hoặc gửi yêu cầu).

## 2. Bố cục Home (12 khối)
1. **Header** — sticky. ~~logo + nav + CTA相談予約 + hamburger~~ đã bỏ theo yêu cầu khách: menu ẩn (đợt trước) và **chữ「ネパール介護人材ナビ」ở góc trái đã xoá (2026-08-14)** → header chỉ còn nút chuyển ngôn ngữ, căn phải.
2. **Hero** — eyebrow「介護 × 特定技能人材」; H1「介護現場に、確かな海外人材を。」; supporting text; lockup「株式会社桃吉 × 株式会社ITMジャパン」; CTA chính「無料相談を予約する」→ `/booking`, phụ「まずは問い合わせる」→ `/contact`.
3. **Trust strip** — 介護事業者による現場視点 / 登録支援機関による受入支援 / 入国前教育から入職後支援まで / 全国対応.
4. **私たちについて** — 2 card cân bằng: 桃吉 (bullets + link「会社概要を見る」→ trang công ty ngoài `https://momokichi2011.com`, mở tab mới) và ITMジャパン (bullets + **chỉ giấy phép đã xác nhận**).
5. **選ばれる理由** — 介護現場を理解したマッチング / 募集・教育・受入支援をつなぐ一貫体制 / 入職後まで続く定着支援.
6. **教育体制**「現場で安心して働くための教育」— 3 giai đoạn: 入国前 / 入国・入社時 / 入社後; nêu rõ vai trò 桃吉 (介護現場の知識・技術) + ITMジャパン (日本語教育・外国人支援).
7. **なぜネパール人材なのか** — trình bày có trách nhiệm + câu lưu ý「国籍だけで判断せず…」.
8. **ご紹介する人材** — tiêu chuẩn: 特定技能「介護」要件, JLPT N4／JFT-Basic, 介護技能評価試験, 面接, 事前教育 (không hứa bảo đảm năng lực).
9. **ご相談から定着まで** — timeline 01–07 (ヒアリング → 人材要件の整理 → 候補者のご提案 → 面接・採用決定 → 在留資格申請・入国準備 → 入国・受入 → 入職後の継続支援), có nhãn công ty phụ trách.
10. **料金** — minh bạch (xem mục 4), CTA「具体的な費用を相談する」→ `/contact`.
11. **FAQ** — 6 câu ảnh hưởng quyết định; accordion keyboard/aria accessible.
12. **Final CTA** (`Closing.tsx`) — card trắng, phụ trách 大林 (momokichi); primary「電話で相談する」và secondary「メールで相談する」. Theo yêu cầu khách 2026-08-14 **hai nút trỏ thẳng tới liên hệ, không qua trang trung gian**: `tel:` / `mailto:` lấy từ `CONTACT_TEL` `CONTACT_EMAIL` trong `src/content/site.ts` (trước đây là `/booking` và `/contact`). **Không đặt form liên hệ trong Home** (form ở `/contact`).

## 3. Phân biệt CTA
- `/booking` = chọn ngày giờ và **đặt lịch** tư vấn. `/contact` = **gửi câu hỏi/yêu cầu/tình trạng tuyển dụng** qua form. Mọi CTA phải nêu rõ khác biệt này (kèm sub-label).

## 4. Bảng giá — 表示価格は税抜
| Khoản | Số tiền | Ghi chú |
|---|---|---|
| 紹介料 | **330,000円／人** | — |
| 支援委託費 | **25,000円／月** | 採用人数・支援内容に応じてご相談 |

- **含まれるもの**: 在留資格認定費用 / 出入国時の送迎.
- **別途、実費**: 渡航費(入国航空券) / 入居支援(寮の手配) / 国内移動費 / 帰国航空券(満了で帰国を選択時) / 在留期間の更新申請費 / デマンドレター認証費(発生する場合).
- Điều kiện có thể thay đổi theo số lượng / nội dung hỗ trợ.

## 5. Copywriting (B2B Nhật, thận trọng)
- Tiếng Nhật chuyên nghiệp, dễ hiểu; tránh quảng cáo quá mức và khẳng định tuyệt đối không có dữ liệu.
- **Tránh / đã loại bỏ**: 「入社3ヶ月で…指示に従える」「即戦力（を保証）」「業界最高水準」「離職しにくい」「日本語が身につきやすい」「必ず定着」.
- Diễn đạt thay thế mẫu: 「入国前教育と入社後の継続支援を通じて、現場の指示を理解し、安心して業務を任せられる人材の育成を目指します。」
- Tránh stereotype về người Nepal (dùng「国籍だけで判断せず、一人ひとりの…を確認」).
- **Không bịa số liệu/khách hàng/tỷ lệ定着/giấy phép**. Số liệu chưa xác nhận → placeholder rõ ràng hoặc ẩn.

## 6. Dữ liệu đã xác nhận (được phép hiển thị)
- 登録支援機関 登録番号 **25登-011576** ／ 有料職業紹介 許可番号 **14-ユ-302518**.
- Giá 330,000円/人, 25,000円/月; yêu cầu 特定技能「介護」: JLPT N4／JFT-Basic, 介護技能評価試験.
- *Lưu ý*: các con số ITM (4校 / 50名 / 2,500名 / 22,000名 trong WEBデザイン5.pdf) **không hiển thị trên Home** ở thiết kế hiện tại (chưa đưa vào theo brief). Có thể bổ sung khi xác nhận.

## 7. Hệ màu (design tokens trong `src/app/globals.css`)
| Token | Hex | Dùng cho |
|---|---|---|
| `--color-primary` | `#175C56` | header, heading, primary CTA |
| `--color-primary-hover` | `#104842` | hover/active |
| `--color-secondary` | `#7FA89A` | icon, badge, timeline |
| `--color-mint` | `#EAF3EF` | nền section nhẹ |
| `--color-ivory` | `#F8F6F0` | nền chính |
| `--color-surface` | `#FFFFFF` | card, FAQ, bảng giá |
| `--color-accent` | `#C69A4B` | gold — điểm nhấn nhỏ (số/viền), không dùng cho CTA |
| `--color-fg` / `--color-fg-muted` | `#1F2927` / `#5F6C68` | text chính / phụ |
| `--color-line` | `#D8E1DD` | border/divider |
| `--color-danger` / `--color-ok` | `#B9473E` / `#347A5A` | trạng thái |

Tỷ lệ: ~60% ivory/white, ~25% teal/mint, ~10% sage, ≤5% gold. Primary CTA = nền teal chữ trắng; secondary = nền trắng viền teal. Mỗi section một màu nhấn chính. Đảm bảo contrast WCAG AA.

## 8. i18n
- 4 locale: **ja (mặc định), vi, en, ne** trong `messages/{locale}.json` (next-intl). Mọi thay đổi nội dung Home đồng bộ đủ 4 ngôn ngữ. Số/giá/giấy phép/tên riêng giữ nguyên.

## 9. SEO / Accessibility / Performance
- **SEO**: WEB名称「介護現場へ海外人材を提供（momokichi × ITMJP）」(yêu cầu khách 2026-08-14) khai báo **một chỗ duy nhất** ở `src/content/site.ts` (`SITE_NAME`, `SITE_NAME_SHORT`, `pageTitle()`). Home + root layout dùng `SITE_NAME`; mọi trang con dùng `pageTitle("<tên trang>")` → 「<tên trang> ｜ WEB名称」; tiêu đề email dùng `【SITE_NAME_SHORT】`. Đổi tên site = sửa `site.ts`. Semantic HTML.
- **A11y (WCAG AA)**: `:focus-visible` ring teal; `prefers-reduced-motion`; FAQ accordion có `aria-expanded`/`aria-controls`/`role=region`, điều khiển bàn phím; nav `aria-current`/`aria-label`; alt text; link trong đoạn văn có underline/trạng thái nhận biết ngoài màu.
- **Responsive**: mobile-first, không overflow ngang, CTA dễ bấm, menu mobile rõ, bảng giá → card trên màn nhỏ.
- Hạn chế animation; tối ưu Core Web Vitals & hình ảnh.

## 10. Kỹ thuật & ràng buộc
- Next.js 16 (App Router) + React 19 + next-intl + Tailwind v4. Tái sử dụng component & token hiện có.
- **Chỉ thay đổi Home + shared Header/Footer**; KHÔNG đổi logic /booking, /contact, /about, /vision, /articles, admin, API, prisma.
- Link nội bộ tương đối (không hard-code localhost); không có nav/button chết.
- Tiêu chí hoàn thành: `npm run build` & `npm run lint` đạt; Home render đúng trên desktop & mobile, đủ 4 locale; không có claim/số liệu chưa xác minh.

## 11. Component chính (Home)
`Hero` · `TrustStrip` · `About` · `Features`(選ばれる理由) · `Education` · `WhyNepal`(なぜネパール) · `Talent`(ご紹介する人材) · `Process`(timeline) · `Cost` · `Faq` · `FinalCta` · `SectionHead` · `SiteHeader`/`NavLinks`/`MobileNav` · `SiteFooter`.
