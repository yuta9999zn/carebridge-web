/**
 * Tên WEB chính thức (WEB名称) — theo yêu cầu khách 2026-08-14.
 * Đổi ở đây là đổi toàn site: title mọi trang, openGraph, tiêu đề email.
 */
export const SITE_NAME = "介護現場へ海外人材を提供（momokichi × ITMJP）";

/** Bản rút gọn cho tiêu đề email 【…】 — tên đầy đủ quá dài, hòm thư sẽ cắt mất nội dung. */
export const SITE_NAME_SHORT = "momokichi × ITMJP";

/** Title trang con: 「<tên trang> ｜ <WEB名称>」 */
export const pageTitle = (page: string) => `${page} ｜ ${SITE_NAME}`;

/** Liên hệ thật của phụ trách (大林 — momokichi) — yêu cầu khách 2026-08-14. */
export const CONTACT_TEL = "090-1715-1157";
export const CONTACT_TEL_HREF = `tel:${CONTACT_TEL.replace(/[^0-9+]/g, "")}`;
export const CONTACT_EMAIL = "oobayashi@momokichi2011.com";
export const CONTACT_EMAIL_HREF = `mailto:${CONTACT_EMAIL}`;
