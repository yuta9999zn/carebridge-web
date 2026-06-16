import type { Block } from "@/content/articles";

/** Chuyển textarea ↔ blocks. Quy ước: "## tiêu đề", "> trích dẫn", "[img] chú thích", còn lại là đoạn văn. */
export function parseBody(text: string): Block[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line): Block => {
      if (line.startsWith("## ")) return { type: "h2", text: line.slice(3) };
      if (line.startsWith("> ")) return { type: "quote", text: line.slice(2) };
      if (line.startsWith("[img] ")) {
        const rest = line.slice(6).trim();
        if (rest.startsWith("/uploads/") || /^https?:\/\//.test(rest)) {
          const [src, ...cap] = rest.split("|");
          return { type: "image", src: src.trim(), caption: cap.join("|").trim() };
        }
        return { type: "image", caption: rest };
      }
      return { type: "p", text: line };
    });
}

export function serializeBody(blocks: Block[] = []): string {
  return blocks
    .map((b) => {
      if (b.type === "h2") return `## ${b.text}`;
      if (b.type === "quote") return `> ${b.text}`;
      if (b.type === "image") return b.src ? `[img] ${b.src} | ${b.caption}` : `[img] ${b.caption}`;
      return b.text;
    })
    .join("\n");
}

export function slugify(input: string): string {
  const s = input.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return s || `post-${crypto.randomUUID().slice(0, 8)}`;
}
