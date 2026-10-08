import { connectDB } from "@/lib/mongodb";
import { uploadBookCover } from "@/lib/cloudinary";
import { createBook, getAllBooks } from "@/services/book.service";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

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

export const GET = async () => {
    try {
        await connectDB();
        const books = await getAllBooks();
        return NextResponse.json({ success: true, message: "Books fetched successfully", books });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export const POST = async (req) => {
    try {
        if (!(await isAdminRequest(req))) {
            return NextResponse.json(
                { success: false, message: "Admin authentication is required" },
                { status: 401 }
            );
        }

        await connectDB();

        let bookData;
        const contentType = req.headers.get("content-type") || "";

        if (contentType.includes("multipart/form-data")) {
            const formData = await req.formData();
            const getText = (field) => {
                const value = formData.get(field);
                return typeof value === "string" ? value : "";
            };
            const cover = formData.get("coverImage");
            const coverImage = cover instanceof File && cover.size > 0
                ? await uploadBookCover(cover)
                : getText("coverImage");

            bookData = {
                title: getText("title"),
                author: getText("author"),
                description: getText("description"),
                category: getText("category"),
                releaseDate: getText("releaseDate"),
                publishedYear: Number(getText("publishedYear")),
                totalCopies: Number(getText("totalCopies")),
                coverImage,
            };
        } else {
            bookData = await req.json();
        }

        const book = await createBook(bookData);
        return NextResponse.json({ success: true, message: "Book created successfully", book }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message || "Failed to create book" },
            { status: error.status || 500 }
        );
    }
};