import type { Metadata } from "next";
import { Inter, Noto_Sans_Malayalam } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { PrototypeBanner } from "@/components/ui/PrototypeBanner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoMalayalam = Noto_Sans_Malayalam({
  variable: "--font-malayalam",
  subsets: ["malayalam"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Shri Ramesh Pisharady | Official Representative Portal Concept",
    template: "%s | Office of Shri Ramesh Pisharady",
  },
  description:
    "Official website concept and public information portal for Shri Ramesh Pisharady, Palakkad Constituency. Developed by HexaKode for client evaluation.",
  keywords: [
    "Ramesh Pisharady",
    "Palakkad Constituency",
    "Official Representative",
    "Public Information Portal",
    "Kerala",
    "HexaKode",
    "Constituency Grievance",
  ],
  authors: [{ name: "HexaKode", url: "https://hexakode.com" }],
  metadataBase: new URL("https://rameshpisharady.hexakode.com"),
  openGraph: {
    title: "Shri Ramesh Pisharady | Official Representative Portal",
    description:
      "Find official announcements, public meeting notices, constituency information and verified contacts for Shri Ramesh Pisharady.",
    type: "website",
    locale: "en_IN",
    alternateLocale: "ml_IN",
  },
  robots: {
    index: false, // Disallow production indexing for prototype preview until approved
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoMalayalam.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sand-50 text-slate-800 font-sans">
        <LanguageProvider>
          <PrototypeBanner />
          <Header />
          <main id="main-content" className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
