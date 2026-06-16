import { homeContent } from "@/content/home";

export default function SiteFooter() {
  const { footer } = homeContent;
  return (
    <footer className="bg-primary px-5 py-12 text-white md:px-8">
      <div className="mx-auto max-w-[1120px] text-center">
        <p className="text-base font-black tracking-wide md:text-lg">{footer.brand}</p>
        <p className="mt-2 text-xs text-white/75">{footer.tagline}</p>
        <p className="mt-8 text-xs text-white/60">{footer.copyright}</p>
      </div>
    </footer>
  );
}
