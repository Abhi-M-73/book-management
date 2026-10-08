import { SignJWT } from "jose";
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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
        enum: ["admin"],
        default: "admin",
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


adminSchema.methods.generateAuthToken = async function () {
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

const Admin =
    mongoose.models.Admin ||
    mongoose.model("Admin", adminSchema);

export default Admin;