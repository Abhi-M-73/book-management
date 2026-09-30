import { connectDB } from "@/lib/mongodb";
import { login } from "@/services/auth.service";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        await connectDB();
        const body = await req.json();
        const { email, password } = body;
        const { user, token } = await login(email, password);
        const response = NextResponse.json({ success: true, message: "User logged in successfully", data: { user } });
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
             maxAge: 60 * 60 * 24, 
        });
        return response;
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 401 });
    }
}