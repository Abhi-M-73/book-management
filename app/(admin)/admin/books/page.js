"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  BookOpen,
  LibraryBig,
  LoaderCircle,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import Axios from "@/lib/axios";
import BookEditModal from "@/components/books/BookEditModal";

const formatReleaseDate = (releaseDate, publishedYear) => {
  if (!releaseDate) return publishedYear || "—";

  const parsedDate = new Date(releaseDate);
  if (Number.isNaN(parsedDate.getTime())) return publishedYear || "—";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsedDate);
};

const AdminBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBookId, setDeletingBookId] = useState("");

  const requestBooks = useCallback(async () => {
    const response = await Axios.get("/books");
    const bookList = response?.data?.books;

    if (!response?.data?.success || !Array.isArray(bookList)) {
      throw new Error(response?.data?.message || "The books response was not valid.");
    }

    return bookList;
  }, []);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      setBooks(await requestBooks());
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Unable to load books.";
      setLoadError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [requestBooks]);

  useEffect(() => {
    let active = true;

    requestBooks()
      .then((bookList) => {
        if (active) setBooks(bookList);
      })
      .catch((error) => {
        if (!active) return;
        const message =
          error?.response?.data?.message || error.message || "Unable to load books.";
        setLoadError(message);
        toast.error(message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [requestBooks]);

  const filteredBooks = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return books;

    return books.filter((book) =>
      [book.title, book.author, book.category, book.publishedYear]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query))
    );
  }, [books, search]);

  const totalCopies = books.reduce((sum, book) => sum + (Number(book.totalCopies) || 0), 0);
  const availableCopies = books.reduce(
    (sum, book) => sum + (Number(book.availableCopies) || 0),
    0
  );

  const handleBookUpdated = (updatedBook) => {
    setBooks((currentBooks) =>
      currentBooks.map((book) => (book._id === updatedBook._id ? updatedBook : book))
    );
    setEditingBook(null);
  };

  const handleBookDelete = async (book) => {
    if (!window.confirm(`Remove "${book.title}" from the catalog?`)) return;
    setDeletingBookId(book._id);
    try {
      const response = await Axios.delete(`/books/${book._id}`);
      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Unable to remove this book.");
      }

      setBooks((currentBooks) => currentBooks.filter((item) => item._id !== book._id));
      toast.success("Book removed from the catalog.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "Unable to remove this book."
      );
    } finally {
      setDeletingBookId("");
    }
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-700">Catalog management</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">Books</h1>
          <p className="mt-2 text-slate-600">
            Manage the books and copies available in your library.
          </p>
        </div>
        <Link
          href="/admin/books/add"
          className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:self-auto"
        >
          <Plus size={18} />
          Add book
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="grid size-11 place-items-center rounded-lg bg-blue-50 text-blue-700">
            <LibraryBig size={21} />
          </span>
          <div>
            <p className="text-sm text-slate-500">Titles in catalog</p>
            <p className="mt-0.5 text-2xl font-semibold text-slate-900">{books.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="grid size-11 place-items-center rounded-lg bg-violet-50 text-violet-700">
            <BookOpen size={21} />
          </span>
          <div>
            <p className="text-sm text-slate-500">Total copies</p>
            <p className="mt-0.5 text-2xl font-semibold text-slate-900">{totalCopies}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="grid size-11 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
            <BookOpen size={21} />
          </span>
          <div>
            <p className="text-sm text-slate-500">Available copies</p>
            <p className="mt-0.5 text-2xl font-semibold text-slate-900">{availableCopies}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="font-semibold text-slate-900">Library catalog</h2>
            <p className="mt-1 text-sm text-slate-500">
              {books.length} {books.length === 1 ? "book" : "books"} in your collection
            </p>
          </div>
          <label className="relative block w-full sm:max-w-xs">
            <Search
              size={17}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search title, author, category..."
              aria-label="Search books"
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </label>
        </div>

        {loading ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 p-8 text-slate-500">
            <LoaderCircle size={28} className="animate-spin text-blue-600" />
            <p className="text-sm">Loading your catalog...</p>
          </div>
        ) : loadError ? (
          <div className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
            <span className="grid size-12 place-items-center rounded-full bg-red-50 text-red-600">
              <AlertCircle size={23} />
            </span>
            <h3 className="mt-4 font-semibold text-slate-900">Could not load books</h3>
            <p className="mt-1 max-w-md text-sm text-slate-500">{loadError}</p>
            <button
              type="button"
              onClick={fetchBooks}
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <RefreshCw size={16} />
              Try again
            </button>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
            <span className="grid size-12 place-items-center rounded-full bg-slate-100 text-slate-500">
              <BookOpen size={23} />
            </span>
            <h3 className="mt-4 font-semibold text-slate-900">
              {search ? "No matching books" : "Your catalog is empty"}
            </h3>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              {search
                ? "Try another title, author, or category."
                : "Add your first book to start building your library catalog."}
            </p>
            {!search && (
              <Link
                href="/admin/books/add"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Plus size={17} />
                Add your first book
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-left">
              <thead className="bg-slate-50/80">
                <tr>
                  <th scope="col" className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                    Book
                  </th>
                  <th scope="col" className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Category
                  </th>
                  <th scope="col" className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Release date
                  </th>
                  <th scope="col" className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Copies
                  </th>
                  <th scope="col" className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                  <th scope="col" className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 sm:pr-6">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBooks.map((book) => {
                  const available = Number(book.availableCopies) || 0;
                  const isAvailable = book.isActive && available > 0;

                  return (
                    <tr key={book._id} className="transition hover:bg-slate-50/70">
                      <td className="min-w-64 px-5 py-4 sm:px-6">
                        <div className="flex items-center gap-3.5">
                          <div className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-slate-100 text-slate-400">
                            {book.coverImage ? (
                              <Image
                                src={book.coverImage}
                                alt={`${book.title} cover`}
                                fill
                                unoptimized
                                sizes="48px"
                                className="object-cover"
                              />
                            ) : (
                              <BookOpen size={20} />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">{book.title}</p>
                            <p className="mt-1 truncate text-sm text-slate-500">{book.author}</p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                          {book.category}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                        {formatReleaseDate(book.releaseDate, book.publishedYear)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                        <span className="font-medium text-slate-900">{available}</span>
                        <span className="text-slate-400"> / {book.totalCopies}</span>
                        <span className="ml-1 text-xs text-slate-400">available</span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${isAvailable
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                            }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${isAvailable ? "bg-emerald-500" : "bg-slate-400"
                              }`}
                          />
                          {isAvailable ? "Available" : book.isActive ? "Out of stock" : "Inactive"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-right sm:pr-6">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setEditingBook(book)}
                            aria-label={`Edit ${book.title}`}
                            title="Edit book"
                            className="grid size-9 place-items-center rounded-lg text-slate-500 transition hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          >
                            <Pencil size={17} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleBookDelete(book)}
                            disabled={deletingBookId === book._id}
                            aria-label={`Delete ${book.title}`}
                            title="Delete book"
                            className="grid size-9 place-items-center rounded-lg text-slate-500 transition hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-wait disabled:opacity-50"
                          >
                            {deletingBookId === book._id ? (
                              <LoaderCircle size={17} className="animate-spin" />
                            ) : (
                              <Trash2 size={17} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !loadError && filteredBooks.length > 0 && (
          <div className="border-t border-slate-100 px-5 py-3.5 text-sm text-slate-500 sm:px-6">
            Showing {filteredBooks.length} of {books.length} books
          </div>
        )}
      </div>
      {editingBook && (
        <BookEditModal
          book={editingBook}
          onClose={() => setEditingBook(null)}
          onUpdated={handleBookUpdated}
        />
      )}
    </section>
  );
};

export default AdminBooksPage;
