import Sidebar from "@/components/dashboard/Sidebar";

export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        <Sidebar role="user" />
        <main className="ml-64 min-h-screen flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}