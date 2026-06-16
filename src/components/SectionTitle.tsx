export default function SectionTitle({
  eyebrow,
  title,
  light = false,
  num,
  tone = "terracotta",
}: {
  eyebrow: string;
  title: string;
  light?: boolean;
  num?: string | number;
  tone?: "terracotta" | "teal";
}) {
  const badgeTone = tone === "teal" ? "bg-teal text-white" : "bg-terracotta text-white";
  return (
    <div className="mb-10 text-center md:mb-14">
      {num != null && (
        <span
          className={`mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full text-sm font-black ${badgeTone}`}
        >
          {num}
        </span>
      )}
      <span className={`block text-sm font-bold uppercase tracking-[0.16em] ${light ? "text-secondary" : "text-primary"}`}>
        {eyebrow}
      </span>
      <h2 className={`mt-2 text-3xl font-bold md:text-4xl ${light ? "text-white" : "text-primary"}`}>
        {title}
      </h2>
    </div>
  );
}
