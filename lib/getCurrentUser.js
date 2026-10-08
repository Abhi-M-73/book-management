import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import User from "@/models/User";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;

    try {
        const { payload } = await jwtVerify(token, secret);
        const user = await User.findById(payload.userId).select("-password");
        return user;
    } catch (error) {
        return null;
    }
}