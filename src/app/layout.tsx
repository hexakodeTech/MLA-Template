import type { Metadata } from "next";
import { DM_Serif_Display, Manrope, Noto_Sans_Malayalam } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider, THEME_STORAGE_KEY } from "@/context/ThemeContext";
import { PrototypeBanner } from "@/components/ui/PrototypeBanner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
    default: "Shri Ramesh Pisharady | Official Representative Portal",
    template: "%s | Office of Shri Ramesh Pisharady",
  },
  description:
    "Official public representative portal for Shri Ramesh Pisharady, Palakkad Constituency. An editorial public information platform commissioned by HexaKode.",
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
    index: false,
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
      suppressHydrationWarning
      className={`${dmSerifDisplay.variable} ${manrope.variable} ${notoMalayalam.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");var d=t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d){document.documentElement.classList.add("dark");document.documentElement.setAttribute("data-theme","dark")}else{document.documentElement.classList.remove("dark");document.documentElement.setAttribute("data-theme","light")}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-ivory text-charcoal dark:bg-[#111C18] dark:text-[#F5F2E9] font-sans selection:bg-forest selection:text-ivory dark:selection:bg-[#8CB99B] dark:selection:text-[#10231A]">
        <ThemeProvider>
          <LanguageProvider>
            <PrototypeBanner />
            <Header />
            <main id="main-content" className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
