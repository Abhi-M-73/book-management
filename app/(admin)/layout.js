import Sidebar from '@/components/dashboard/Sidebar'

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Sidebar role="admin" />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  )
}

export default AdminLayout
