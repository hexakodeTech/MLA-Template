import type { Metadata } from "next";
import { DM_Serif_Display, Manrope, Noto_Sans_Malayalam } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { PrototypeBanner } from "@/components/ui/PrototypeBanner";
import { InitialLoadingScreen } from "@/components/ui/InitialLoadingScreen";
import { MouseFollowDot } from "@/components/ui/MouseFollowDot";
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
    template: "%s | Shri Ramesh Pisharady",
  },
  description:
    "Official representative portal of Shri Ramesh Pisharady. Explore public activities, constituency information, news, announcements, gallery and citizen services.",
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
      "Official representative portal of Shri Ramesh Pisharady. Explore public activities, constituency information, news, announcements, gallery and citizen services.",
    type: "website",
    locale: "en_IN",
    alternateLocale: "ml_IN",
  },
  robots: {
    index: true,
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
      <body className="min-h-full flex flex-col bg-ivory text-charcoal dark:bg-[#191A18] dark:text-[#F4F1E9] font-sans selection:bg-charcoal selection:text-ivory dark:selection:bg-[#D29A78] dark:selection:text-[#191A18]">
        <Script
          id="portal-init-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                // 1. Theme Bootstrap
                var t = localStorage.getItem("pisharady_portal_theme");
                var d = t === "dark" || (!t && window.matchMedia("(prefers-color-scheme: dark)").matches);
                if (d) {
                  document.documentElement.classList.add("dark");
                  document.documentElement.setAttribute("data-theme", "dark");
                } else {
                  document.documentElement.classList.remove("dark");
                  document.documentElement.setAttribute("data-theme", "light");
                }
                
                // 2. Accessibility Bootstrap (Zero Flash)
                var a = localStorage.getItem("pisharady_portal_a11y");
                if (a) {
                  var s = JSON.parse(a);
                  var root = document.documentElement;
                  if (s.fontScale && s.fontScale !== 1) {
                    root.style.setProperty("--a11y-font-scale", s.fontScale);
                    root.setAttribute("data-a11y-font-scale", s.fontScale);
                  }
                  if (s.highContrast) root.setAttribute("data-a11y-contrast", "high");
                  if (s.grayscale) root.setAttribute("data-a11y-grayscale", "true");
                  if (s.highlightLinks) root.setAttribute("data-a11y-highlight-links", "true");
                  if (s.reduceTransparency) root.setAttribute("data-a11y-reduce-transparency", "true");
                  if (s.lineHeight && s.lineHeight !== "default") root.setAttribute("data-a11y-line-height", s.lineHeight);
                  if (s.letterSpacing && s.letterSpacing !== "default") root.setAttribute("data-a11y-letter-spacing", s.letterSpacing);
                  if (s.underlineLinks) root.setAttribute("data-a11y-underline-links", "true");
                  if (s.reduceMotion) root.setAttribute("data-a11y-reduce-motion", "true");
                  if (s.highlightFocus) root.setAttribute("data-a11y-highlight-focus", "true");
                }

                // 3. Language Bootstrap (Zero Flash)
                var l = localStorage.getItem("website_language") || localStorage.getItem("site_lang");
                if (l !== "ml" && l !== "en") l = "en";
                document.documentElement.lang = l;
                document.documentElement.setAttribute("data-lang", l);

                // 4. Random Activity Bootstrap (Zero Flash & Anti-Repetition)
                var actIds = ["act-1", "act-2", "act-3", "act-4"];
                var lastAct = localStorage.getItem("last_loading_activity_id");
                var pool = actIds.filter(function(id) { return id !== lastAct; });
                var chosenAct = (pool.length > 0 ? pool : actIds)[Math.floor(Math.random() * (pool.length > 0 ? pool.length : actIds.length))];
                if (chosenAct) {
                  localStorage.setItem("last_loading_activity_id", chosenAct);
                  document.documentElement.setAttribute("data-loading-activity", chosenAct);
                }
              } catch(e) {}
            })()`,
          }}
        />
        {/* Skip to Main Content Link for Keyboard and Screen Reader Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-charcoal focus:text-white dark:focus:bg-[#F4F1E9] dark:focus:text-[#191A18] focus:font-semibold focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-copper rounded-xs transition-transform"
        >
          Skip to main content
        </a>

        <ThemeProvider>
          <AccessibilityProvider>
            <LanguageProvider>
              <InitialLoadingScreen />
              <PrototypeBanner />
              <Header />
              <main id="main-content" className="flex-1 flex flex-col">
                {children}
              </main>
              <Footer />
              <MouseFollowDot />
            </LanguageProvider>
          </AccessibilityProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
