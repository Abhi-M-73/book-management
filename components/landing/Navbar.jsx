import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";

const Navbar = () => {
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
          <Link href="/books" className="inline-flex min-h-10 items-center gap-1 rounded-md px-2 text-xs font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:gap-2 sm:px-3 sm:text-sm">
            <span className="hidden sm:inline">Browse books</span>
            <span className="sm:hidden">Browse</span>
            <ChevronRight size={15} className="hidden sm:block" />
          </Link>
          <Link href="/login" className="inline-flex min-h-10 items-center rounded-md px-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:px-3 sm:text-sm">
            Login
          </Link>
          <Link href="/register" className="inline-flex min-h-10 items-center justify-center rounded-md bg-blue-600 px-3 text-xs font-semibold text-white shadow-sm shadow-blue-900/15 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:px-4 sm:text-sm">
            <span className="sm:hidden">Join</span>
            <span className="hidden sm:inline">Create account</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;