"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, BookOpen, ImagePlus, LoaderCircle, Upload, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Axios from "@/lib/axios";

const initialFormData = {
  title: "",
  author: "",
  category: "",
  releaseDate: "",
  totalCopies: "1",
  description: "",
};

const inputClassName =
  "mt-2 block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

const BookForm = () => {
  const router = useRouter();
  const formRef = useRef(null);
  const [formData, setFormData] = useState(initialFormData);
  const [coverImage, setCoverImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

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

    setPreviewUrl(URL.createObjectURL(file));
    setCoverImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => payload.append(key, value));
      if (coverImage) payload.append("coverImage", coverImage);
      const response = await Axios.post("/books", payload);
      if (!response.success) {
        throw new Error(result.message || "Unable to add the book.");
      }

      toast.success(response.message || "Book added to the catalog.");
      setFormData(initialFormData);
      setCoverImage(null);
      setPreviewUrl("");
      const fileInput = formRef.current?.elements.namedItem("coverImage");
      if (fileInput) fileInput.value = "";
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Unable to add the book. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <Link
        href="/admin/books"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700"
      >
        <ArrowLeft size={17} />
        Back to books
      </Link>

      <div className="mb-7 flex items-start gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-blue-100 text-blue-700">
          <BookOpen size={23} />
        </div>
        <div>
          <p className="text-sm font-medium text-blue-700">Catalog management</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Add a new book
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Enter the book details and add it to your library catalog.
          </p>
        </div>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="title" className="text-sm font-medium text-slate-700">
                  Book title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. The Great Gatsby"
                  autoComplete="off"
                  minLength={2}
                  required
                  className={inputClassName}
                />
              </div>
              <div>
                <label htmlFor="author" className="text-sm font-medium text-slate-700">
                  Author <span className="text-red-500">*</span>
                </label>
                <input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="e.g. F. Scott Fitzgerald"
                  autoComplete="off"
                  minLength={2}
                  required
                  className={inputClassName}
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="category" className="text-sm font-medium text-slate-700">
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Fiction"
                  minLength={2}
                  required
                  className={inputClassName}
                />
              </div>
              <div>
                <label htmlFor="releaseDate" className="text-sm font-medium text-slate-700">
                  Release date <span className="text-red-500">*</span>
                </label>
                <input
                  id="releaseDate"
                  name="releaseDate"
                  type="date"
                  value={formData.releaseDate}
                  onChange={handleChange}
                  required
                  className={inputClassName}
                />
              </div>
            </div>

            <div>
              <label htmlFor="totalCopies" className="text-sm font-medium text-slate-700">
                Total copies <span className="text-red-500">*</span>
              </label>
              <input
                id="totalCopies"
                name="totalCopies"
                type="number"
                min="1"
                step="1"
                value={formData.totalCopies}
                onChange={handleChange}
                required
                className={inputClassName}
              />
              <p className="mt-1.5 text-xs text-slate-500">
                Available copies will initially match the total copies.
              </p>
            </div>

            <div>
              <label htmlFor="description" className="text-sm font-medium text-slate-700">
                Description <span className="text-slate-400">(optional)</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Add a short description about the book..."
                rows={4}
                className={`${inputClassName} resize-y`}
              />
            </div>
          </div>

          <div>
            <label htmlFor="coverImage" className="text-sm font-medium text-slate-700">
              Cover image <span className="text-slate-400">(optional)</span>
            </label>
            <label
              htmlFor="coverImage"
              className="mt-2 flex min-h-64 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-center transition hover:border-blue-400 hover:bg-blue-50/40"
            >
              {previewUrl ? (
                <div className="relative flex min-h-64 w-full items-center justify-center p-4">
                  <Image
                    src={previewUrl}
                    alt="Selected book cover preview"
                    width={200}
                    height={260}
                    unoptimized
                    className="max-h-64 max-w-full rounded-lg object-contain shadow-sm"
                  />
                </div>
              ) : (
                <div className="px-5 py-8">
                  <span className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-white text-blue-600 shadow-sm">
                    <ImagePlus size={22} />
                  </span>
                  <span className="block text-sm font-medium text-slate-700">
                    Click to upload a cover
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    JPEG, PNG, or WebP · up to 5 MB
                  </span>
                </div>
              )}
              <input
                id="coverImage"
                name="coverImage"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleCoverChange}
                className="sr-only"
              />
            </label>
            {coverImage && (
              <div className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2">
                <span className="truncate text-xs text-slate-600">{coverImage.name}</span>
                <button
                  type="button"
                  onClick={() => {
                    setCoverImage(null);
                    setPreviewUrl("");
                    const fileInput = formRef.current?.elements.namedItem("coverImage");
                    if (fileInput) fileInput.value = "";
                  }}
                  aria-label="Remove cover image"
                  className="grid size-7 shrink-0 place-items-center rounded-md text-slate-500 hover:bg-slate-200 hover:text-slate-800"
                >
                  <X size={15} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:justify-end sm:px-8">
          <Link
            href="/admin/books"
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? <LoaderCircle size={17} className="animate-spin" /> : <Upload size={17} />}
            {isSubmitting ? "Adding book..." : "Add book"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default BookForm;
