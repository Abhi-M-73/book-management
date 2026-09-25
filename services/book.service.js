import Book from "@/models/Book";

export async function getBooks() {
  return await Book.find({
    isActive: true,
  }).sort({
    createdAt: -1,
  });
}