import mongoose from "mongoose";
import { SignJWT } from "jose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = async function () {
  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET
  );

  const token = await new SignJWT({
    userId: this._id.toString(),
    role: this.role,
  })
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secret);

  return token;
};

const User =
  mongoose.models.User ||
  mongoose.model("User", userSchema);

export default User;