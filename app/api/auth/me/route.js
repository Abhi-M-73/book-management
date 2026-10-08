import { connectDB } from "@/lib/mongodb";
import { getProfile } from "@/services/auth.service";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
    try {
        await connectDB();
        const user = await getProfile();
        return NextResponse.json({ success: true, user });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 401 });
    }
}