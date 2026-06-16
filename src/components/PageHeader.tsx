export default function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="bg-gradient-to-b from-mint to-ivory px-5 pt-32 pb-14 text-center md:pt-40 md:pb-16">
      <span className="block text-sm font-bold uppercase tracking-[0.16em] text-primary">
        {eyebrow}
      </span>
      <h1 className="mt-2 text-3xl font-black text-primary md:text-4xl">{title}</h1>
      {lead && (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-fg-muted md:text-base">{lead}</p>
      )}
    </section>
  );
}
