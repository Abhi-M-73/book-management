"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { LoaderCircle, Upload, X } from "lucide-react";
import toast from "react-hot-toast";

const fieldClassName =
  "mt-1.5 block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

const BookEditModal = ({ book, onClose, onUpdated }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [formData, setFormData] = useState({
    title: book.title || "",
    author: book.author || "",
    category: book.category || "",
    releaseDate: book.releaseDate ? new Date(book.releaseDate).toISOString().slice(0, 10) : "",
    totalCopies: String(book.totalCopies ?? 1),
    description: book.description || "",
  });

  useEffect(() => {
    return () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
    };
  }, [coverPreview]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape" && !isSubmitting) onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isSubmitting, onClose]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleCoverChange = (event) => {
    const file = event.target.files?.[0] || null;
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Choose a JPEG, PNG, or WebP image.");
      event.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Cover image must be 5 MB or smaller.");
      event.target.value = "";
      return;
    }

    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setCoverPreview(URL.createObjectURL(file));
    setCoverFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => payload.append(key, value));
      if (coverFile) payload.append("coverImage", coverFile);

      const response = await fetch(`/api/books/${book._id}`, {
        method: "PUT",
        body: payload,
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to update the book.");
      }

      toast.success("Book details updated.");
      onUpdated(result.book);
    } catch (error) {
      toast.error(error.message || "Unable to update the book. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentCover = coverPreview || book.coverImage;
  const borrowedCopies = Math.max(0, (Number(book.totalCopies) || 0) - (Number(book.availableCopies) || 0));

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-book-title"
        className="max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Catalog</p>
            <h2 id="edit-book-title" className="mt-1 text-xl font-semibold text-slate-900">
              Edit book
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close edit form"
            className="grid size-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-5 py-5 sm:px-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium text-slate-700">
                Title <span className="text-red-500">*</span>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  minLength={2}
                  className={fieldClassName}
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Author <span className="text-red-500">*</span>
                <input
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  minLength={2}
                  className={fieldClassName}
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Category <span className="text-red-500">*</span>
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  minLength={2}
                  className={fieldClassName}
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Release date
                <input
                  name="releaseDate"
                  type="date"
                  value={formData.releaseDate}
                  onChange={handleChange}
                  className={fieldClassName}
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Total copies <span className="text-red-500">*</span>
                <input
                  name="totalCopies"
                  type="number"
                  min={Math.max(1, borrowedCopies)}
                  step="1"
                  value={formData.totalCopies}
                  onChange={handleChange}
                  required
                  className={fieldClassName}
                />
                {borrowedCopies > 0 && (
                  <span className="mt-1 block text-xs font-normal text-slate-500">
                    At least {borrowedCopies} copies are currently borrowed.
                  </span>
                )}
              </label>
              <div>
                <label htmlFor="edit-book-cover" className="text-sm font-medium text-slate-700">
                  Replace cover image
                </label>
                <input
                  id="edit-book-cover"
                  name="coverImage"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleCoverChange}
                  className="mt-1.5 block w-full text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>

            {currentCover && (
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-white">
                  <Image
                    src={currentCover}
                    alt={`${book.title} cover preview`}
                    fill
                    unoptimized
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <p className="text-xs text-slate-500">
                  {coverFile ? "New cover preview" : "Current cover"}
                </p>
              </div>
            )}

            <label className="block text-sm font-medium text-slate-700">
              Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className={`${fieldClassName} resize-y`}
              />
            </label>
          </div>

          <footer className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? <LoaderCircle size={17} className="animate-spin" /> : <Upload size={17} />}
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
};

export default BookEditModal;
