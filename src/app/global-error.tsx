"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Global Application Error Caught]", {
      message: error.message,
      digest: error.digest,
    });
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FBF9F4] text-[#191A18] font-sans flex items-center justify-center p-4">
        <main
          role="alert"
          aria-live="assertive"
          className="max-w-lg w-full bg-white border border-[#E5E2DA] rounded-sm p-8 shadow-sm text-center space-y-6"
        >
          <div className="mx-auto w-12 h-12 rounded-full bg-[#F4F1E9] border border-[#E5E2DA] flex items-center justify-center text-[#9E5D3B]">
            <AlertTriangle className="w-6 h-6" aria-hidden="true" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-serif font-bold text-[#191A18]">
              Application Error / ആപ്ലിക്കേഷൻ പിശക്
            </h1>
            <p className="text-xs text-[#5C5C57] leading-relaxed">
              A critical issue occurred in the portal layout. Your data is safe. Please refresh the page or try again.
            </p>
            <p className="text-xs text-[#5C5C57] leading-relaxed font-sans">
              പോർട്ടൽ ലോഡ് ചെയ്യുന്നതിൽ അപ്രതീക്ഷിത തടസ്സം നേരിട്ടു. വിവരങ്ങൾ സുരക്ഷിതമാണ്. ദയവായി വീണ്ടും ശ്രമിക്കുക.
            </p>
          </div>

          <div className="pt-4 border-t border-[#E5E2DA] flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#191A18] text-white rounded-sm hover:bg-[#383935] transition-colors focus:outline-none focus:ring-2 focus:ring-[#9E5D3B]"
            >
              <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Try Again / വീണ്ടും ശ്രമിക്കുക</span>
            </button>
            <Link
              href="/"
              className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#191A18] border border-[#E5E2DA] hover:bg-[#F4F1E9] rounded-sm transition-colors"
            >
              Home / ഹോം
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
