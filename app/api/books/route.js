import { connectDB } from "@/lib/mongodb";
import { getBooks } from "@/services/book.service";

export async function GET() {
    try {
        await connectDB();
        const books = await getBooks();
        return Response.json({
            success: true,
            data: books,
        });
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: "Failed to fetch books",
            },
            { status: 500 }
        );
    }
}