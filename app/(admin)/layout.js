import Link from 'next/link'

const adminLinks = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/books', label: 'Books' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/borrowings', label: 'Borrowings' },
  { href: '/admin/settings', label: 'Settings' },
]

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="text-xl font-semibold tracking-tight">
            Book Management
          </Link>
          <span className="text-sm text-slate-500">Admin panel</span>
        </div>
      </header>
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8 md:flex-row">
        <nav aria-label="Admin navigation" className="w-full md:w-48">
          <ul className="space-y-1">
            {adminLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
