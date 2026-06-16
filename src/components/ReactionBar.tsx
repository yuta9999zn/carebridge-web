"use client";

import { useState } from "react";

const reactions = [
  { key: "like", emoji: "👍", label: "いいね" },
  { key: "love", emoji: "❤️", label: "好き" },
  { key: "helpful", emoji: "🙌", label: "役立った" },
  { key: "surprised", emoji: "😮", label: "驚き" },
  { key: "sad", emoji: "😢", label: "残念" },
];

export default function ReactionBar({ base = 0 }: { base?: number }) {
  const [counts, setCounts] = useState<Record<string, number>>(
    Object.fromEntries(reactions.map((r, i) => [r.key, base + (i === 0 ? 12 : 5 - i)]))
  );
  const [picked, setPicked] = useState<string | null>(null);

  function react(key: string) {
    if (picked === key) return;
    setCounts((c) => ({
      ...c,
      [key]: c[key] + 1,
      ...(picked ? { [picked]: c[picked] - 1 } : {}),
    }));
    setPicked(key);
  }

  return (
    <div className="rounded-2xl bg-cream p-6 text-center">
      <p className="text-sm font-bold text-navy">この記事は役に立ちましたか？</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2.5">
        {reactions.map((r) => (
          <button
            key={r.key}
            type="button"
            onClick={() => react(r.key)}
            aria-pressed={picked === r.key}
            className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 ${
              picked === r.key
                ? "border-terracotta bg-terracotta/10 text-terracotta"
                : "border-hairline bg-white text-ink/70"
            }`}
          >
            <span className="text-base">{r.emoji}</span>
            <span>{counts[r.key]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
