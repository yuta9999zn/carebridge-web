import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PageHeader from "@/components/PageHeader";
import BookingForm from "@/components/BookingForm";
import { pageTitle } from "@/content/site";

export const metadata: Metadata = { title: pageTitle("相談予約") };

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
