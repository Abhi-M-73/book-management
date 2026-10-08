import { connectDB } from "@/lib/mongodb";
import { createBook, getBooks } from "@/services/book.service";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectDB();
        const books = await getBooks();
        return NextResponse.json({ success: true, message: "Books fetched successfully", books });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 401 });
    }
}

export const POST = async (req) => {
    try {
        const body = await req.json();
        const { title, author, description, category, publishedYear, totalCopies, availableCopies, coverImage, isActive } = body;
        const book = await createBook({ title, author, description, category, publishedYear, totalCopies, availableCopies, coverImage, isActive });
        return NextResponse.json({ success: true, message: "Book created successfully", book });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 401 });
    }
};