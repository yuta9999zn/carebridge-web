import type { Metadata } from "next";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import WhyNepal from "@/components/WhyNepal";
import Process from "@/components/Process";
import Cost from "@/components/Cost";
import Closing from "@/components/Closing";
import { SITE_NAME } from "@/content/site";

export const metadata: Metadata = {
  title: SITE_NAME,
  description:
    "介護事業者と登録支援機関の二社が、特定技能人材のご紹介から、現場の人材づくりまで支えます。",
};

export default function Home() {
  // Home sections — WEBデザイン5
  return (
    <>
      <Hero />
      <About />
      <Education />
      <WhyNepal />
      <Process />
      <Cost />
      <Closing />
    </>
  );
}
