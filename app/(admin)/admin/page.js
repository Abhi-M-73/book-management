import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookCopy,
  BookOpen,
  CircleAlert,
  Clock3,
  Plus,
  Users,
} from "lucide-react";

const monthlyBorrowings = [
  { month: "Jan", value: 32 },
  { month: "Feb", value: 46 },
  { month: "Mar", value: 39 },
  { month: "Apr", value: 61 },
  { month: "May", value: 52 },
  { month: "Jun", value: 76 },
  { month: "Jul", value: 67 },
  { month: "Aug", value: 89 },
  { month: "Sep", value: 72 },
  { month: "Oct", value: 96 },
  { month: "Nov", value: 83 },
  { month: "Dec", value: 108 },
];

const activity = [
  { initials: "AM", name: "Aarav Mehta", action: "borrowed", book: "The Silent Patient", time: "12 min ago", color: "bg-sky-100 text-sky-800" },
  { initials: "SK", name: "Sara Khan", action: "returned", book: "Educated", time: "38 min ago", color: "bg-rose-100 text-rose-800" },
  { initials: "RV", name: "Rohan Verma", action: "borrowed", book: "Atomic Habits", time: "1 hr ago", color: "bg-amber-100 text-amber-800" },
];

function StatCard({ label, value, note, icon: Icon, tone, trend, down = false }) {
  return (
    <article className="rounded-md border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
        </div>
        <span className={`inline-flex size-10 items-center justify-center rounded-md ${tone}`}>
          <Icon size={19} />
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
        <span className={`inline-flex items-center gap-1 font-semibold ${down ? "text-rose-700" : "text-emerald-700"}`}>
          {down ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}{trend}
        </span>
        <span className="text-slate-500">{note}</span>
      </div>
    </article>
  );
}

function BorrowingsChart() {
  const points = monthlyBorrowings.map((item, index) => {
    const x = 24 + index * 49;
    const y = 168 - item.value * 1.25;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="mt-5">
      <div className="flex justify-between text-[11px] text-slate-400" aria-hidden="true">
        <span>120</span><span>90</span><span>60</span><span>30</span><span>0</span>
      </div>
      <div className="relative mt-2">
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-6" aria-hidden="true">
          {[0, 1, 2, 3].map((line) => <span key={line} className="border-t border-dashed border-slate-200" />)}
        </div>
        <svg className="relative block h-52 w-full overflow-visible" viewBox="0 0 563 180" preserveAspectRatio="none" role="img" aria-labelledby="borrowing-chart-title">
          <title id="borrowing-chart-title">Monthly book borrowings, January through December</title>
          <defs>
            <linearGradient id="borrowings-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#0f766e" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0f766e" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={`24,168 ${points} 563,168`} fill="url(#borrowings-fill)" />
          <polyline points={points} fill="none" stroke="#0f766e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          {monthlyBorrowings.map((item, index) => (
            <circle key={item.month} cx={24 + index * 49} cy={168 - item.value * 1.25} r="3.5" fill="#fff" stroke="#0f766e" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
      </div>
      <div className="mt-1 grid grid-cols-6 gap-1 text-center text-[11px] text-slate-400 sm:grid-cols-12">
        {monthlyBorrowings.map(({ month }) => <span key={month}>{month}</span>)}
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-[1500px] space-y-7 p-4 pb-10 sm:p-6 lg:p-8">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-700">Library overview</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Good morning, Admin</h1>
          <p className="mt-2 text-sm text-slate-500">Here’s what’s happening across your library.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-sm border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-xs font-medium text-amber-800">Sample data</span>
          <Link href="/admin/books" className="inline-flex min-h-10 items-center gap-2 rounded-md bg-teal-800 px-4 text-sm font-medium text-white transition hover:bg-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700">
            <Plus size={17} /> Add a book
          </Link>
        </div>
      </header>

      <section aria-label="Library statistics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Books in catalog" value="2,486" note="vs. last month" icon={BookCopy} tone="bg-teal-50 text-teal-800" trend="8.2%" />
        <StatCard label="Currently borrowed" value="184" note="vs. last month" icon={BookOpen} tone="bg-sky-50 text-sky-800" trend="12.4%" />
        <StatCard label="Active members" value="1,209" note="vs. last month" icon={Users} tone="bg-amber-50 text-amber-800" trend="5.1%" />
        <StatCard label="Overdue returns" value="17" note="vs. last month" icon={CircleAlert} tone="bg-rose-50 text-rose-800" trend="2.3%" down />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)]">
        <article className="min-w-0 rounded-md border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Borrowing activity</h2>
              <p className="mt-1 text-sm text-slate-500">Books checked out throughout the year</p>
            </div>
            <p className="text-sm font-medium text-slate-500">Jan – Dec</p>
          </div>
          <BorrowingsChart />
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-5 sm:p-6">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Collection health</h2>
            <p className="mt-1 text-sm text-slate-500">Availability by collection status</p>
          </div>
          <div className="mt-6 flex items-center gap-5">
            <div className="relative grid size-32 shrink-0 place-items-center rounded-full" style={{ background: "conic-gradient(#0f766e 0% 68%, #eab308 68% 82%, #e11d48 82% 91%, #e2e8f0 91% 100%)" }} role="img" aria-label="Collection health: 68 percent available, 14 percent borrowed, 9 percent overdue, 9 percent unavailable">
              <div className="grid size-[5.4rem] place-items-center rounded-full bg-white text-center">
                <div><strong className="block text-xl text-slate-950">68%</strong><span className="text-[10px] text-slate-500">available</span></div>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              {[
                ["Available", "68%", "bg-teal-700"],
                ["Borrowed", "14%", "bg-yellow-500"],
                ["Overdue", "9%", "bg-rose-600"],
                ["Unavailable", "9%", "bg-slate-300"],
              ].map(([label, value, color]) => (
                <div key={label} className="flex items-center gap-2.5">
                  <span className={`size-2.5 rounded-full ${color}`} />
                  <span className="text-slate-600">{label}</span>
                  <span className="ml-auto font-semibold text-slate-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <Link href="/admin/books" className="mt-6 inline-flex text-sm font-semibold text-teal-800 hover:text-teal-950">View catalog <ArrowUpRight size={16} className="ml-1" /></Link>
        </article>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.8fr)]">
        <article className="overflow-hidden rounded-md border border-slate-200 bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:px-6">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Recent activity</h2>
              <p className="mt-1 text-sm text-slate-500">Latest borrowing and return updates</p>
            </div>
            <Link href="/admin/borrowings" className="shrink-0 text-sm font-semibold text-teal-800 hover:text-teal-950">All activity</Link>
          </div>
          <ul className="divide-y divide-slate-100">
            {activity.map((item) => (
              <li key={item.name} className="flex flex-wrap items-center gap-3 px-5 py-4 sm:flex-nowrap sm:px-6">
                <span className={`grid size-10 shrink-0 place-items-center rounded-full text-xs font-semibold ${item.color}`}>{item.initials}</span>
                <p className="min-w-0 flex-1 text-sm text-slate-700"><span className="font-semibold text-slate-950">{item.name}</span> {item.action} <span className="font-medium">{item.book}</span></p>
                <span className="inline-flex shrink-0 items-center gap-1 text-xs text-slate-400"><Clock3 size={13} />{item.time}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-md border border-rose-200 bg-rose-50/60 p-5 sm:p-6">
          <div className="flex items-center gap-2 text-rose-800">
            <CircleAlert size={18} />
            <h2 className="text-base font-semibold">Needs attention</h2>
          </div>
          <p className="mt-2 text-sm text-slate-600">A few items may need a follow-up today.</p>
          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between gap-4 border-b border-rose-200/70 pb-3">
              <span className="text-sm text-slate-700">Overdue books</span><span className="font-semibold text-rose-800">17</span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-rose-200/70 pb-3">
              <span className="text-sm text-slate-700">Low-stock titles</span><span className="font-semibold text-rose-800">6</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-slate-700">Returns due today</span><span className="font-semibold text-slate-900">12</span>
            </div>
          </div>
          <Link href="/admin/borrowings" className="mt-5 inline-flex items-center text-sm font-semibold text-rose-800 hover:text-rose-950">Review borrowings <ArrowUpRight size={16} className="ml-1" /></Link>
        </article>
      </section>
    </div>
  );
}