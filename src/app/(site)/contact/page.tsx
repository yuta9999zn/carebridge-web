import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = { title: "ご相談・お問い合わせ ｜ ネパール介護人材ナビ" };

export default function ContactPage() {
  return (
    <div className="pt-16 md:pt-24">
      <Contact />
    </div>
  );
}
