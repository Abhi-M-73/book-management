import Book from "@/models/Book";

export const createBook = async (payload) => {
  const { title, author, description, category, releaseDate, publishedYear, totalCopies, coverImage } = payload;
  const parsedReleaseDate = releaseDate ? new Date(releaseDate) : undefined;
  const bookYear = publishedYear || (parsedReleaseDate && !Number.isNaN(parsedReleaseDate.getTime())
    ? parsedReleaseDate.getUTCFullYear()
    : undefined);
  const data = {
    title,
    author,
    description,
    category,
    publishedYear: bookYear,
    releaseDate: parsedReleaseDate,
    totalCopies,
    availableCopies: totalCopies,
    isActive: true,
    coverImage: coverImage || "",
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

export const updateBooks = async (id, payload) => {
  const existingBook = await Book.findById(id);
  if (!existingBook) return null;

  const { title, author, description, category, releaseDate, totalCopies, coverImage } = payload;
  const parsedReleaseDate = releaseDate ? new Date(releaseDate) : existingBook.releaseDate;
  if (parsedReleaseDate && Number.isNaN(parsedReleaseDate.getTime())) {
    const error = new Error("Please provide a valid release date");
    error.status = 400;
    throw error;
  }

  const nextTotalCopies = totalCopies === undefined
    ? existingBook.totalCopies
    : Number(totalCopies);
  const borrowedCopies = existingBook.totalCopies - existingBook.availableCopies;
  if (!Number.isInteger(nextTotalCopies) || nextTotalCopies < borrowedCopies || nextTotalCopies < 1) {
    const error = new Error(`Total copies cannot be less than ${borrowedCopies} borrowed copies`);
    error.status = 400;
    throw error;
  }

  existingBook.title = title?.trim() || existingBook.title;
  existingBook.author = author?.trim() || existingBook.author;
  existingBook.description = description ?? existingBook.description;
  existingBook.category = category?.trim() || existingBook.category;
  existingBook.releaseDate = parsedReleaseDate;
  existingBook.publishedYear = parsedReleaseDate
    ? parsedReleaseDate.getUTCFullYear()
    : existingBook.publishedYear;
  existingBook.totalCopies = nextTotalCopies;
  existingBook.availableCopies = nextTotalCopies - borrowedCopies;
  if (coverImage !== undefined) existingBook.coverImage = coverImage;

  return existingBook.save();
};

export const deleteBook = async (id) => {
  return await Book.findOneAndUpdate({ _id: id }, { isActive: false }, { new: true });
}