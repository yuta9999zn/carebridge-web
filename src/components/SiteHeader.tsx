import Link from "next/link";
import { homeContent } from "@/content/home";
import LanguageSwitcher from "./LanguageSwitcher";

// Theo yêu cầu: ẩn các mục menu — chỉ giữ logo + chuyển ngôn ngữ.
export default async function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-3 px-5 py-3.5 md:px-8">
        <Link href="/" className="text-base font-black tracking-wide text-primary md:text-lg">
          {homeContent.brand}
        </Link>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
