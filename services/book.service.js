import Book from "@/models/Book";

export const createBook = async (payload) => {
  const { title, author, description, category, publishedYear, totalCopies } = payload;
  const data = {
    title,
    author,
    description,
    category,
    publishedYear,
    totalCopies,
    availableCopies: totalCopies,
    isActive: true,
    coverImage: "",
  };

  if (!data.title || !data.author || !data.category || !data.publishedYear || !data.totalCopies) {
    throw new Error("All fields are required");
  }
  return await Book.create(data);
};

export const getAllBooks = async () => {
  return await Book.find({
    isActive: true,
  }).sort({
    createdAt: -1,
  });
}