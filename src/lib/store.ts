import crypto from "node:crypto";
import { prisma } from "@/lib/prisma";
import { hashPassword, MAX_FAILED } from "@/lib/auth";
import { seedArticles, type Article, type Block } from "@/content/articles";
import { SEED_TRANSLATIONS } from "@/content/seed-translations";
import { CONTENT_KEYS, contentDefault } from "@/content/cms-schema";
import { glueJa } from "@/lib/ja-glue";
import type { Prisma } from "@prisma/client";

/** Trường mã số (không phải văn xuôi) — không chèn WORD JOINER. */
const NO_GLUE_KEYS = new Set(["about.companyB.reg", "about.companyB.license"]);

/**
 * Kho dữ liệu — PostgreSQL qua Prisma.
 * Giữ nguyên chữ ký hàm để các trang/actions không phải đổi.
 */

/* ---------------- Articles ---------------- */
type ArticleRow = Prisma.ArticleGetPayload<object>;

function toArticle(r: ArticleRow): Article {
  return {
    id: r.id,
    slug: r.slug,
    category: r.category as Article["category"],
    title: r.title,
    date: r.date,
    time: r.time,
    author: { name: r.authorName, initial: r.authorInitial },
    location: r.location ?? undefined,
    readingTime: r.readingTime,
    views: r.views,
    status: r.status as "published" | "draft",
    lead: r.lead,
    excerpt: r.excerpt,
    tags: r.tags,
    thumbnail: r.thumbnail ?? undefined,
    body: (r.body as unknown as Block[]) ?? [],
    translations: (r.translations as unknown as Article["translations"]) ?? {},
  };
}

let seedPatched = false;

async function ensureSeeded() {
  const count = await prisma.article.count();
  if (count > 0) {
    if (!seedPatched) {
      seedPatched = true;
      await patchSeedTranslations().catch(() => {
        seedPatched = false;
      });
    }
    return;
  }
  await prisma.article.createMany({
    data: seedArticles.map((a) => ({
      id: a.slug,
      slug: a.slug,
      category: a.category,
      title: a.title,
      date: a.date,
      time: a.time,
      authorName: a.author.name,
      authorInitial: a.author.initial,
      location: a.location ?? null,
      readingTime: a.readingTime,
      views: a.views,
      status: "published",
      lead: a.lead,
      excerpt: a.excerpt,
      tags: a.tags,
      body: a.body as unknown as Prisma.InputJsonValue,
      translations: (SEED_TRANSLATIONS[a.slug] ?? {}) as unknown as Prisma.InputJsonValue,
    })),
    skipDuplicates: true,
  });
}

/** Áp bản dịch sẵn cho các bài seed (ghi đè translations của 9 slug seed). */
export async function patchSeedTranslations() {
  for (const [slug, tr] of Object.entries(SEED_TRANSLATIONS)) {
    await prisma.article
      .update({ where: { id: slug }, data: { translations: tr as unknown as Prisma.InputJsonValue } })
      .catch(() => {});
  }
}

export async function getArticles(): Promise<Article[]> {
  await ensureSeeded();
  const rows = await prisma.article.findMany({ orderBy: { date: "desc" } });
  return rows.map(toArticle);
}

export async function getPublishedArticles(): Promise<Article[]> {
  await ensureSeeded();
  const rows = await prisma.article.findMany({
    where: { status: { not: "draft" } },
    orderBy: { date: "desc" },
  });
  return rows.map(toArticle);
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  const r = await prisma.article.findUnique({ where: { id } });
  return r ? toArticle(r) : undefined;
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const r = await prisma.article.findUnique({ where: { slug } });
  return r ? toArticle(r) : undefined;
}

export async function saveArticle(article: Article): Promise<void> {
  const data = {
    slug: article.slug,
    category: article.category,
    title: article.title,
    date: article.date,
    time: article.time,
    authorName: article.author.name,
    authorInitial: article.author.initial,
    location: article.location ?? null,
    readingTime: article.readingTime,
    views: article.views ?? 0,
    status: article.status ?? "published",
    thumbnail: article.thumbnail || null,
    lead: article.lead,
    excerpt: article.excerpt,
    tags: article.tags,
    body: article.body as unknown as Prisma.InputJsonValue,
    translations: (article.translations ?? {}) as unknown as Prisma.InputJsonValue,
  };
  if (article.id) {
    await prisma.article.upsert({ where: { id: article.id }, update: data, create: { id: article.id, ...data } });
  } else {
    await prisma.article.create({ data });
  }
}

export async function deleteArticle(id: string): Promise<void> {
  await prisma.article.delete({ where: { id } }).catch(() => {});
}

/* ---------------- Inquiries (lead) ---------------- */
export type Inquiry = {
  inquiryID: string;
  facilityName: string;
  contactName: string;
  email: string;
  message?: string;
  inquiryType: string;
  status: string;
  createdAt: string;
};

export async function createInquiry(data: {
  facilityName: string;
  contactName: string;
  email: string;
  message?: string;
  inquiryType?: string;
}): Promise<string> {
  const r = await prisma.inquiry.create({
    data: {
      facilityName: data.facilityName,
      contactName: data.contactName,
      email: data.email,
      message: data.message ?? "",
      inquiryType: data.inquiryType ?? "Giới thiệu nhân lực",
    },
  });
  return r.id;
}

export async function getInquiries(): Promise<Inquiry[]> {
  const rows = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
  return rows.map((r) => ({
    inquiryID: r.id,
    facilityName: r.facilityName,
    contactName: r.contactName,
    email: r.email,
    message: r.message ?? undefined,
    inquiryType: r.inquiryType,
    status: r.status,
    createdAt: r.createdAt.toISOString(),
  }));
}

export async function updateInquiryStatus(id: string, status: string): Promise<void> {
  await prisma.inquiry.update({ where: { id }, data: { status } }).catch(() => {});
}

/* ---------------- Bookings ---------------- */
export const BOOKING_STATUSES = ["受付待ち", "進行中", "完了", "キャンセル"] as const;

export type Booking = {
  bookingID: string;
  customerName: string;
  organization?: string;
  email?: string;
  phone?: string;
  preferredAt?: string;
  meetingType?: string;
  topic?: string;
  status: string;
  cancelReason?: string;
  createdAt: string;
};

export async function createBooking(data: {
  customerName: string;
  organization?: string;
  email?: string;
  phone?: string;
  preferredAt?: string;
  meetingType?: string;
  topic?: string;
}): Promise<string> {
  const r = await prisma.booking.create({
    data: {
      customerName: data.customerName,
      organization: data.organization || null,
      email: data.email || null,
      phone: data.phone || null,
      preferredAt: data.preferredAt || null,
      meetingType: data.meetingType || null,
      topic: data.topic || null,
    },
  });
  return r.id;
}

export async function getBookings(status?: string): Promise<Booking[]> {
  const rows = await prisma.booking.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
  });
  return rows.map((r) => ({
    bookingID: r.id,
    customerName: r.customerName,
    organization: r.organization ?? undefined,
    email: r.email ?? undefined,
    phone: r.phone ?? undefined,
    preferredAt: r.preferredAt ?? undefined,
    meetingType: r.meetingType ?? undefined,
    topic: r.topic ?? undefined,
    status: r.status,
    cancelReason: r.cancelReason ?? undefined,
    createdAt: r.createdAt.toISOString(),
  }));
}

export async function updateBookingStatus(id: string, status: string, cancelReason?: string): Promise<void> {
  await prisma.booking
    .update({ where: { id }, data: { status, cancelReason: status === "キャンセル" ? cancelReason ?? "" : null } })
    .catch(() => {});
}

/* ---------------- Admin users (auth) ---------------- */
export async function ensureDefaultAdmin() {
  const count = await prisma.adminUser.count();
  if (count > 0) return;
  await prisma.adminUser.create({
    data: {
      email: "admin@example.com",
      passwordHash: await hashPassword(process.env.ADMIN_PASSWORD || "admin1234"),
      fullName: "初期管理者",
      role: "super_admin",
    },
  });
}

export async function getAdminByEmail(email: string) {
  return prisma.adminUser.findUnique({ where: { email: email.trim().toLowerCase() } });
}

export async function createAdminUser(data: { email: string; password: string; fullName?: string }) {
  return prisma.adminUser.create({
    data: {
      email: data.email.trim().toLowerCase(),
      passwordHash: await hashPassword(data.password),
      fullName: data.fullName?.trim() || "管理者",
      role: "admin",
    },
  });
}

export async function recordLoginSuccess(id: string) {
  await prisma.adminUser.update({ where: { id }, data: { lastLoginAt: new Date(), failedLoginCount: 0 } });
}

export async function recordLoginFail(id: string, current: number) {
  const next = current + 1;
  await prisma.adminUser.update({
    where: { id },
    data: { failedLoginCount: next, ...(next >= MAX_FAILED ? { status: "locked" } : {}) },
  });
}

export async function setResetToken(email: string): Promise<string | null> {
  const user = await getAdminByEmail(email);
  if (!user) return null;
  const token = crypto.randomBytes(24).toString("hex");
  await prisma.adminUser.update({
    where: { id: user.id },
    data: { resetToken: token, resetTokenExp: new Date(Date.now() + 60 * 60 * 1000) },
  });
  return token;
}

export async function resetPasswordWithToken(token: string, newPassword: string): Promise<boolean> {
  const user = await prisma.adminUser.findFirst({
    where: { resetToken: token, resetTokenExp: { gt: new Date() } },
  });
  if (!user) return false;
  await prisma.adminUser.update({
    where: { id: user.id },
    data: {
      passwordHash: await hashPassword(newPassword),
      resetToken: null,
      resetTokenExp: null,
      status: "active",
      failedLoginCount: 0,
    },
  });
  return true;
}

/* ---------------- Categories (CMS) ---------------- */
export type CmsCategory = {
  id: string;
  key: string;
  nameJa: string;
  nameVi: string | null;
  nameEn: string | null;
  nameNe: string | null;
  displayOrder: number;
  status: string;
};

const DEFAULT_CATEGORIES = [
  { key: "留学生の声", nameJa: "留学生の声", nameVi: "Tiếng nói du học sinh", nameEn: "Student voices", nameNe: "विद्यार्थी आवाज", displayOrder: 1 },
  { key: "実績数値", nameJa: "実績数値", nameVi: "Số liệu đạt được", nameEn: "Achievements", nameNe: "उपलब्धि तथ्याङ्क", displayOrder: 2 },
  { key: "お知らせ", nameJa: "お知らせ", nameVi: "Thông báo", nameEn: "Announcements", nameNe: "सूचना", displayOrder: 3 },
  { key: "コラム", nameJa: "コラム", nameVi: "Chuyên mục", nameEn: "Column", nameNe: "स्तम्भ", displayOrder: 4 },
];

async function ensureCategoriesSeeded() {
  if ((await prisma.category.count()) > 0) return;
  await prisma.category.createMany({ data: DEFAULT_CATEGORIES, skipDuplicates: true });
}

export function categoryLabel(c: { nameJa: string; nameVi: string | null; nameEn: string | null; nameNe: string | null }, locale: string): string {
  if (locale === "vi") return c.nameVi || c.nameJa;
  if (locale === "en") return c.nameEn || c.nameJa;
  if (locale === "ne") return c.nameNe || c.nameJa;
  return c.nameJa;
}

export async function getCategories(): Promise<CmsCategory[]> {
  await ensureCategoriesSeeded();
  return prisma.category.findMany({ orderBy: { displayOrder: "asc" } });
}

export async function getActiveCategories(): Promise<CmsCategory[]> {
  await ensureCategoriesSeeded();
  return prisma.category.findMany({ where: { status: "active" }, orderBy: { displayOrder: "asc" } });
}

export async function getLocalizedCategories(locale: string, activeOnly = false): Promise<{ key: string; label: string }[]> {
  const list = activeOnly ? await getActiveCategories() : await getCategories();
  return list.map((c) => ({ key: c.key, label: categoryLabel(c, locale) }));
}

export async function saveCategory(data: {
  id?: string;
  key: string;
  nameJa: string;
  nameVi?: string;
  nameEn?: string;
  nameNe?: string;
  displayOrder?: number;
  status?: string;
}): Promise<void> {
  const payload = {
    key: data.key,
    nameJa: data.nameJa,
    nameVi: data.nameVi || null,
    nameEn: data.nameEn || null,
    nameNe: data.nameNe || null,
    displayOrder: data.displayOrder ?? 0,
    status: data.status ?? "active",
  };
  if (data.id) {
    await prisma.category.update({ where: { id: data.id }, data: payload });
  } else {
    await prisma.category.create({ data: payload });
  }
}

export async function getCategoryById(id: string): Promise<CmsCategory | null> {
  return prisma.category.findUnique({ where: { id } });
}

export async function deleteCategory(id: string): Promise<void> {
  await prisma.category.delete({ where: { id } }).catch(() => {});
}

/* ---------------- Content blocks (CMS About/Vision) ---------------- */

/** Trả về {key: value} đã localize (thiếu → valueJa → mặc định schema). */
export async function getContent(locale: string): Promise<Record<string, string>> {
  const rows = await prisma.contentBlock.findMany({ where: { key: { in: CONTENT_KEYS } } });
  const map: Record<string, string> = {};
  for (const k of CONTENT_KEYS) map[k] = contentDefault(k, locale); // mặc định theo locale (fallback ja)
  for (const r of rows) {
    const loc = locale === "vi" ? r.valueVi : locale === "en" ? r.valueEn : locale === "ne" ? r.valueNe : r.valueJa;
    if (loc && loc.trim()) map[r.key] = loc; // admin đã nhập bản dịch locale → ưu tiên
  }
  // Tiếng Nhật: ngắt dòng theo 文節 (chèn WORD JOINER) để không cắt giữa từ trên mobile.
  if (locale === "ja") {
    for (const k of CONTENT_KEYS) {
      if (!NO_GLUE_KEYS.has(k)) map[k] = glueJa(map[k]);
    }
  }
  return map;
}

/** Trả về {key: {ja,vi,en,ne}} cho admin (merge mặc định). */
export async function getContentRaw(): Promise<Record<string, { ja: string; vi: string; en: string; ne: string }>> {
  const rows = await prisma.contentBlock.findMany({ where: { key: { in: CONTENT_KEYS } } });
  const byKey = Object.fromEntries(rows.map((r) => [r.key, r]));
  const out: Record<string, { ja: string; vi: string; en: string; ne: string }> = {};
  for (const k of CONTENT_KEYS) {
    const r = byKey[k];
    out[k] = {
      ja: r?.valueJa || contentDefault(k, "ja"),
      vi: r?.valueVi || contentDefault(k, "vi"),
      en: r?.valueEn || contentDefault(k, "en"),
      ne: r?.valueNe || contentDefault(k, "ne"),
    };
  }
  return out;
}

export async function saveContentBlock(key: string, v: { ja: string; vi?: string; en?: string; ne?: string }): Promise<void> {
  await prisma.contentBlock.upsert({
    where: { key },
    update: { valueJa: v.ja, valueVi: v.vi || null, valueEn: v.en || null, valueNe: v.ne || null },
    create: { key, valueJa: v.ja, valueVi: v.vi || null, valueEn: v.en || null, valueNe: v.ne || null },
  });
}

/* ---------------- Admin user management (RBAC) ---------------- */
export async function getAdminUsers() {
  return prisma.adminUser.findMany({ orderBy: { createdAt: "asc" } });
}

export async function createAdminUserWithRole(data: { email: string; password: string; fullName?: string; role: string }) {
  return prisma.adminUser.create({
    data: {
      email: data.email.trim().toLowerCase(),
      passwordHash: await hashPassword(data.password),
      fullName: data.fullName?.trim() || "管理者",
      role: data.role,
    },
  });
}

export async function updateUserRole(id: string, role: string) {
  await prisma.adminUser.update({ where: { id }, data: { role } }).catch(() => {});
}

export async function setUserStatus(id: string, status: string) {
  await prisma.adminUser.update({ where: { id }, data: { status, failedLoginCount: 0 } }).catch(() => {});
}

export async function deleteAdminUser(id: string) {
  await prisma.adminUser.delete({ where: { id } }).catch(() => {});
}
