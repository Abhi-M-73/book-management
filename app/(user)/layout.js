import Sidebar from "@/components/dashboard/Sidebar";

export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        <Sidebar role="user" />
        <main className="min-h-screen min-w-0 flex-1 pt-16 md:ml-64 md:pt-0">
          {children}
        </main>
      </div>
    </div>
  );
}