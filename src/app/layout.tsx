import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { SITE_NAME } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: SITE_NAME,
  description:
    "介護現場に、確かなネパール人材を。専門教育を受けた特定技能「介護」のネパール人材を、登録支援機関として日本の介護施設へ確実にお繋ぎします。",
  openGraph: {
    title: SITE_NAME,
    description:
      "介護のプロ（株式会社桃吉）と、国の許可を持つ登録支援機関（ITMジャパン）が、特定技能人材をご紹介します。",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale} className="h-full">
      <body className="min-h-full">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;700&display=swap"
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
