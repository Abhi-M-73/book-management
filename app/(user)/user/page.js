import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  Compass,
  Headphones,
  Sparkles,
} from "lucide-react";

const readingDays = [
  { day: "Mon", minutes: 24 },
  { day: "Tue", minutes: 38 },
  { day: "Wed", minutes: 18 },
  { day: "Thu", minutes: 52 },
  { day: "Fri", minutes: 31 },
  { day: "Sat", minutes: 68 },
  { day: "Sun", minutes: 44 },
];

const currentlyReading = [
  { title: "The Midnight Library", author: "Matt Haig", progress: 68, color: "bg-indigo-100 text-indigo-800", label: "Fiction" },
  { title: "Braiding Sweetgrass", author: "Robin Wall Kimmerer", progress: 34, color: "bg-emerald-100 text-emerald-800", label: "Nature" },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-7 p-4 pb-10 sm:p-6 lg:p-8">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-700">Your reading space</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">A little more time for a good book.</h1>
          <p className="mt-2 text-sm text-slate-500">Pick up where you left off, or find your next favorite.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-sm border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-xs font-medium text-amber-800">Sample data</span>
          <Link href="/books" className="inline-flex min-h-10 items-center gap-2 rounded-md bg-orange-700 px-4 text-sm font-medium text-white transition hover:bg-orange-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700">
            <Compass size={17} /> Explore books
          </Link>
        </div>
      </header>

      <section aria-label="Your reading statistics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-md border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between"><p className="text-sm font-medium text-slate-500">On your shelf</p><BookOpen size={19} className="text-orange-700" /></div>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">12</p>
          <p className="mt-2 text-xs text-slate-500">Across 4 genres</p>
        </article>
        <article className="rounded-md border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between"><p className="text-sm font-medium text-slate-500">Currently reading</p><Headphones size={19} className="text-indigo-700" /></div>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">2</p>
          <p className="mt-2 text-xs text-slate-500">One chapter at a time</p>
        </article>
        <article className="rounded-md border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between"><p className="text-sm font-medium text-slate-500">Finished this year</p><Sparkles size={19} className="text-emerald-700" /></div>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">8<span className="ml-2 text-sm font-medium text-slate-400">/ 12 goal</span></p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-2/3 rounded-full bg-emerald-600" /></div>
        </article>
        <article className="rounded-md border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between"><p className="text-sm font-medium text-slate-500">Reading time</p><Clock3 size={19} className="text-sky-700" /></div>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">4.5<span className="ml-1 text-base font-medium text-slate-500">hrs</span></p>
          <p className="mt-2 text-xs text-slate-500">This week</p>
        </article>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.9fr)]">
        <article className="rounded-md border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Your reading rhythm</h2>
              <p className="mt-1 text-sm text-slate-500">Minutes spent reading this week</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700"><Sparkles size={15} /> 4.5 hours</span>
          </div>
          <div className="mt-7 grid h-48 grid-cols-7 items-end gap-3 sm:gap-5">
            {readingDays.map(({ day, minutes }) => (
              <div key={day} className="flex h-full flex-col items-center justify-end gap-2">
                <span className="text-[11px] font-medium text-slate-500">{minutes}m</span>
                <div className="flex h-[72%] w-full items-end overflow-hidden rounded-t-sm bg-slate-100">
                  <div className={`w-full rounded-t-sm ${day === "Sat" ? "bg-orange-700" : "bg-teal-700"}`} style={{ height: `${minutes / 68 * 100}%` }} role="img" aria-label={`${day}: ${minutes} minutes`} />
                </div>
                <span className="text-xs text-slate-400">{day}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-md border border-orange-200 bg-orange-50/70 p-5 sm:p-6">
          <div className="flex items-center gap-2 text-orange-800"><CalendarDays size={18} /><h2 className="text-base font-semibold">Coming up</h2></div>
          <p className="mt-2 text-sm text-slate-600">Keep your reading plans on track.</p>
          <div className="mt-5 flex items-center gap-4 border-y border-orange-200 py-4">
            <div className="grid size-12 shrink-0 place-items-center rounded-md bg-white text-center text-orange-800"><span className="text-[10px] font-semibold uppercase">Oct</span><span className="text-lg font-bold leading-none">04</span></div>
            <div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-900">The Thursday Murder Club</p><p className="mt-1 text-xs text-slate-500">Return due in 4 days</p></div>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3"><span className="text-sm text-slate-600">Reading goal check-in</span><span className="shrink-0 rounded-sm bg-white px-2 py-1 text-xs font-semibold text-emerald-800">On track</span></div>
          <Link href="/user/borrowed-books" className="mt-5 inline-flex items-center text-sm font-semibold text-orange-800 hover:text-orange-950">View borrowed books <ArrowRight size={16} className="ml-1" /></Link>
        </article>
      </section>

      <section className="overflow-hidden rounded-md border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:px-6">
          <div><h2 className="text-base font-semibold text-slate-900">Pick up where you left off</h2><p className="mt-1 text-sm text-slate-500">Your current reads are waiting</p></div>
          <Link href="/user/my-books" className="text-sm font-semibold text-orange-800 hover:text-orange-950">My bookshelf</Link>
        </div>
        <div className="grid divide-y divide-slate-100 md:grid-cols-2 md:divide-x md:divide-y-0">
          {currentlyReading.map((book) => (
            <article key={book.title} className="flex min-w-0 gap-4 p-5 sm:p-6">
              <div className={`grid size-16 shrink-0 place-items-center rounded-md ${book.color}`}><BookOpen size={25} strokeWidth={1.6} /></div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{book.label}</span>
                <h3 className="mt-1 truncate text-sm font-semibold text-slate-900">{book.title}</h3>
                <p className="mt-1 truncate text-xs text-slate-500">{book.author}</p>
                <div className="mt-3 flex items-center gap-3"><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-teal-700" style={{ width: `${book.progress}%` }} /></div><span className="text-xs font-medium text-slate-500">{book.progress}%</span></div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}