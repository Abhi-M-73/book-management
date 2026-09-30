"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, ChevronRight, Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white/95 shadow-[0_2px_12px_rgba(15,23,42,0.04)] backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="BookHub home" className="inline-flex shrink-0 items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
          <span className="grid size-9 place-items-center rounded-md bg-blue-600 text-white shadow-sm shadow-blue-900/15">
            <BookOpen size={19} strokeWidth={2} />
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
            Book<span className="text-blue-600">Hub</span>
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <div className="hidden items-center gap-1 sm:flex sm:gap-2">
            <Link href="/books" className="inline-flex min-h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
              Browse books <ChevronRight size={15} />
            </Link>
            <Link href="/login" className="inline-flex min-h-10 items-center rounded-md px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
              Login
            </Link>
            <Link href="/register" className="inline-flex min-h-10 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm shadow-blue-900/15 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
              Create account
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="inline-flex size-10 items-center justify-center rounded-md text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:hidden"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-navigation" className="border-t border-blue-100 bg-white px-4 py-3 shadow-lg sm:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            <Link href="/books" onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center justify-between rounded-md px-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">
              Browse books <ChevronRight size={16} />
            </Link>
            <Link href="/login" onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center rounded-md px-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">
              Login
            </Link>
            <Link href="/register" onClick={() => setMenuOpen(false)} className="mt-1 flex min-h-11 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700">
              Create account
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;