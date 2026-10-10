import React from "react";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading page content"
      className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans bg-ivory dark:bg-[#191A18] text-charcoal dark:text-[#F4F1E9] w-full"
    >
      {/* Screen Reader Announcement */}
      <span className="sr-only">
        Loading page content… പേജ് വിവരങ്ങൾ ലഭ്യമാക്കുന്നു…
      </span>

      {/* Breadcrumb Skeleton */}
      <div className="flex items-center gap-2" aria-hidden="true">
        <div className="h-3 w-16 bg-stone dark:bg-[#2C2D29] rounded-xs animate-pulse motion-reduce:animate-none" />
        <span className="text-slate/40 dark:text-[#A09F97]/40 text-xs">/</span>
        <div className="h-3 w-28 bg-stone dark:bg-[#2C2D29] rounded-xs animate-pulse motion-reduce:animate-none" />
      </div>

      {/* Page Heading Skeleton */}
      <div
        className="border-b border-warm-grey dark:border-[#41413B] pb-8 space-y-4"
        aria-hidden="true"
      >
        <div className="flex items-center gap-2">
          <div className="h-5 w-24 bg-copper/20 dark:bg-[#D29A78]/20 rounded-xs animate-pulse motion-reduce:animate-none" />
          <div className="h-5 w-20 bg-stone dark:bg-[#2C2D29] rounded-xs animate-pulse motion-reduce:animate-none" />
        </div>
        <div className="h-10 sm:h-12 w-3/4 max-w-xl bg-stone dark:bg-[#2C2D29] rounded-xs animate-pulse motion-reduce:animate-none" />
        <div className="space-y-2 max-w-2xl pt-2">
          <div className="h-4 w-full bg-stone/80 dark:bg-[#2C2D29]/80 rounded-xs animate-pulse motion-reduce:animate-none" />
          <div className="h-4 w-5/6 bg-stone/70 dark:bg-[#2C2D29]/70 rounded-xs animate-pulse motion-reduce:animate-none" />
        </div>
      </div>

      {/* Grid Content Skeleton */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        aria-hidden="true"
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] overflow-hidden flex flex-col justify-between shadow-xs"
          >
            <div>
              {/* Media placeholder */}
              <div className="relative aspect-[16/10] bg-stone dark:bg-[#222320] overflow-hidden animate-pulse motion-reduce:animate-none" />

              {/* Body */}
              <div className="p-5 sm:p-6 space-y-3">
                <div className="h-3 w-28 bg-stone dark:bg-[#343530] rounded-xs animate-pulse motion-reduce:animate-none" />
                <div className="h-5 w-full bg-stone dark:bg-[#343530] rounded-xs animate-pulse motion-reduce:animate-none" />
                <div className="space-y-1.5 pt-1">
                  <div className="h-3.5 w-full bg-stone/70 dark:bg-[#343530]/70 rounded-xs animate-pulse motion-reduce:animate-none" />
                  <div className="h-3.5 w-4/5 bg-stone/70 dark:bg-[#343530]/70 rounded-xs animate-pulse motion-reduce:animate-none" />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 sm:p-6 pt-0 mt-4 border-t border-warm-grey/50 dark:border-[#41413B]/50 flex items-center justify-between">
              <div className="h-3 w-20 bg-stone dark:bg-[#343530] rounded-xs animate-pulse motion-reduce:animate-none" />
              <div className="h-3 w-16 bg-stone dark:bg-[#343530] rounded-xs animate-pulse motion-reduce:animate-none" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
