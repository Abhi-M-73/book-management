import { connectDB } from "@/lib/mongodb";
import { register } from "@/services/auth.service";
import { NextResponse } from "next/server";


export const POST = async (req) => {
    try {
        console.log("🔥 REGISTER API HIT");
        await connectDB();
        const body = await req.json();
        const { name, email, password } = body;
        await register(name, email, password);
        const response = NextResponse.json(
            { success: true, message: "User registered successfully" },
            { status: 201 }
        );
        return response;
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 401 }
        );
    }
}