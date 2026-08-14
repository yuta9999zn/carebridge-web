import type { Metadata } from "next";
import Contact from "@/components/Contact";
import { pageTitle } from "@/content/site";

export const metadata: Metadata = { title: pageTitle("ご相談・お問い合わせ") };

export default function ContactPage() {
  return (
    <div className="pt-16 md:pt-24">
      <Contact />
    </div>
  );
}
