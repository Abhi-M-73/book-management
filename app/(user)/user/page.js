export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome to Dashboard 👋
      </h1>

      <p className="mt-2 text-gray-600">
        Manage your books and borrowing activity.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-gray-500">
            My Books
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            12
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-gray-500">
            Borrowed Books
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            3
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-gray-500">
            Returned Books
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            8
          </h2>
        </div>

      </div>
    </div>
  );
}