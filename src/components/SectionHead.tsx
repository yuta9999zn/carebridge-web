export default function SectionHead({
  eyebrow,
  title,
  lead,
  num,
  light = false,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  num?: string | number;
  light?: boolean;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col ${alignCls}`}>
      {num != null && (
        <span
          className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border-2 border-accent bg-primary text-base font-black text-white"
          aria-hidden
        >
          {num}
        </span>
      )}
      {eyebrow && (
        <span className={`text-xs font-bold uppercase tracking-[0.18em] ${light ? "text-secondary" : "text-primary"}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`mt-2 text-2xl font-bold leading-snug md:text-3xl ${light ? "text-white" : "text-primary"}`}>
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-4 max-w-2xl text-sm leading-7 md:text-[15px] md:leading-8 ${
            light ? "text-white/85" : "text-fg-muted"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
