/**
 * Ngắt dòng tiếng Nhật theo 文節 (bunsetsu) bằng cách chèn WORD JOINER (U+2060).
 *
 * Quy tắc cấp ký tự (xấp xỉ ranh giới 文節):
 *  - Cho phép xuống dòng quanh dấu câu/ký hiệu/khoảng trắng.
 *  - Cho phép xuống dòng ở chỗ ひらがな (trợ từ/送り仮名) → từ nội dung (kanji/katakana/英数).
 *  - Cấm ở mọi chỗ còn lại: nối kanji/katakana, tách rời 送り仮名, cụm trợ từ.
 *  - Ngoại lệ cứu trợ: chuỗi hiragana dài hơn CAP mới cho ngắt, tránh tràn trên máy hẹp.
 *
 * Ký tự WJ vô hình, không ảnh hưởng `white-space: pre-line` (xuống dòng \n giữ nguyên).
 * Quy tắc này khớp với bản đã áp cho messages/ja.json.
 */
const WJ = "⁠";
const CAP = 10;

const isHira = (c: string): boolean => {
  const n = c.codePointAt(0)!;
  return n >= 0x3041 && n <= 0x309f;
};

const PUNCT = new Set(
  "、。，．・：；！？「」『』（）()【】〔〕｛｝［］〈〉《》／/＼｜|～〜…‥※＋　 \t\n—–―‐－“”\"'".split("")
);
const isPunct = (c: string): boolean => PUNCT.has(c) || /\s/.test(c);

export function glueJa(s: string): string {
  if (!s || s.length < 2) return s;
  const base = s.split(WJ).join(""); // chuẩn hoá: bỏ WJ cũ rồi áp lại
  let out = base[0] ?? "";
  let unit = 1;
  for (let i = 1; i < base.length; i++) {
    const a = base[i - 1];
    const b = base[i];
    let allow = isPunct(a) || isPunct(b) || (isHira(a) && !isHira(b));
    if (!allow && isHira(a) && isHira(b) && unit >= CAP) allow = true; // cứu trợ chuỗi hiragana dài
    out += (allow ? "" : WJ) + b;
    unit = allow ? 1 : unit + 1;
  }
  return out;
}

export const glueJaIf = (s: string, locale: string): string =>
  locale === "ja" ? glueJa(s) : s;
