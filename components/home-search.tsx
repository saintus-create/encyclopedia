"use client";

import { useSearchContext } from "fumadocs-ui/provider";
import { ArrowRight, Search } from "lucide-react";

/**
 * Pixel-anatomy clone of the Replit Workstation prompt input.
 * On click / submit it opens the global Fumadocs search dialog.
 */
export function HomeSearch() {
  const { setOpenSearch } = useSearchContext();

  return (
    <button
      type="button"
      onClick={() => setOpenSearch(true)}
      className="group relative w-full max-w-[680px] rounded-[18px] border border-[var(--rep-rule)] bg-white px-5 pt-4 pb-3 text-left shadow-[0_1px_0_rgba(0,0,0,0.02),0_24px_60px_-30px_rgba(0,0,0,0.18)] transition hover:border-[var(--rep-rule-strong)]"
    >
      <div className="flex min-h-[44px] items-center gap-3 text-[15px] text-[var(--rep-ink-muted)]">
        <Search size={16} className="shrink-0 text-[var(--rep-ink-muted)]" />
        Search 274 entries — figures, terms, concepts…
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-[var(--rep-rule)] pt-3">
        <span className="text-[12px] font-medium uppercase tracking-[0.06em] text-[var(--rep-ink-muted)]">
          Press
          <kbd className="mx-1 inline-flex h-5 items-center rounded border border-[var(--rep-rule)] bg-[var(--rep-panel)] px-1.5 font-sans text-[11px] font-medium text-[var(--rep-ink-soft)]">
            ⌘K
          </kbd>
          to search
        </span>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--rep-orange)] text-white transition group-hover:bg-[var(--rep-orange-hover)]">
          <ArrowRight size={16} strokeWidth={2.25} />
        </span>
      </div>
    </button>
  );
}
