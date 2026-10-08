import { v2 as cloudinary } from "cloudinary";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export const uploadBookCover = async (file) => {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    const error = new Error("Cover image must be a JPEG, PNG, or WebP file");
    error.status = 400;
    throw error;
  }

  if (file.size > MAX_IMAGE_SIZE) {
    const error = new Error("Cover image must be 5 MB or smaller");
    error.status = 400;
    throw error;
  }

  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary environment variables are not configured");
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });

  const buffer = Buffer.from(await file.arrayBuffer());
  const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "book-management/covers",
    resource_type: "image",
  });

  return result.secure_url;
};
