import { connectDB } from "@/lib/mongodb";
import { adminLogin } from "@/services/auth.service";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    await connectDB();
    const body = await req.json();
    const { email, password } = body;
    const { admin, token } = await adminLogin(email, password);
    const response = NextResponse.json({ success: true, message: "Admin logged in successfully", data: { admin } });
    response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24,
    });
    return response;
}