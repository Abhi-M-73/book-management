import { connectDB } from "@/lib/mongodb";
import { uploadBookCover } from "@/lib/cloudinary";
import { deleteBook, updateBooks } from "@/services/book.service";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import mongoose from "mongoose";

export const runtime = "nodejs";

const isAdminRequest = async (req) => {
  const token = req.cookies.get("token")?.value;
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return payload.role === "admin";
  } catch {
    return false;
  }
};

const getBookId = (params) => {
  if (!mongoose.isValidObjectId(params.id)) {
    const error = new Error("Invalid book ID");
    error.status = 400;
    throw error;
  }
  return params.id;
};

export const PUT = async (req, { params }) => {
  try {
    if (!(await isAdminRequest(req))) {
      return NextResponse.json(
        { success: false, message: "Admin authentication is required" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const bookId = getBookId({ id });
    let updates;
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const getText = (field) => {
        const value = formData.get(field);
        return typeof value === "string" ? value : "";
      };
      const cover = formData.get("coverImage");
      updates = {
        title: getText("title"),
        author: getText("author"),
        description: getText("description"),
        category: getText("category"),
        releaseDate: getText("releaseDate"),
        totalCopies: Number(getText("totalCopies")),
      };

      if (cover instanceof File && cover.size > 0) {
        updates.coverImage = await uploadBookCover(cover);
      }
    } else {
      updates = await req.json();
    }
    await connectDB();
    const book = await updateBooks(bookId, updates);
    if (!book) {
      return NextResponse.json(
        { success: false, message: "Book not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: "Book updated successfully", book });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update book" },
      { status: error.status || 500 }
    );
  }
};

export const DELETE = async (req, { params }) => {
  try {
    if (!(await isAdminRequest(req))) {
      return NextResponse.json(
        { success: false, message: "Admin authentication is required" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const bookId = getBookId({ id });
    await connectDB();

    const book = await deleteBook(bookId);
    if (!book) {
      return NextResponse.json(
        { success: false, message: "Book not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Book removed from the catalog", book });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete book" },
      { status: error.status || 500 }
    );
  }
};
