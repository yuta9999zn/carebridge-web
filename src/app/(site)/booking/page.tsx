import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PageHeader from "@/components/PageHeader";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = { title: "相談予約 ｜ ネパール介護人材ナビ" };

export default async function BookingPage() {
  const t = await getTranslations("booking");
  return (
    <>
      <PageHeader eyebrow="Booking" title={t("title")} lead={t("lead")} />
      <section className="px-5 pb-20 pt-10 md:pb-24">
        <BookingForm />
      </section>
    </>
  );
}
