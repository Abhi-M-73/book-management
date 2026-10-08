import bcrypt from "bcryptjs";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/getCurrentUser";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";

export const register = async (name, email, password) => {
  if (!name || !email || !password) {
    throw new Error("Name, email and password are required");
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new Error("User already exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

export const login = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  const token = await user.generateAuthToken();
  const userObj = user.toObject();
  delete userObj.password;

  return {
    user: userObj,
    token,
  };
};

export const logout = async () => {
  return true;
};

export const getProfile = async () => {
  const user = getCurrentUser();
  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export const adminLogin = async (email, password) => {
  if (!email || !password) {
    return NextResponse.json({ success: false, message: "Email and password are required" });
  }

  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin) {
    return NextResponse.json({ success: false, message: "Invalid email or password" });
  }

  const isPasswordMatch = await bcrypt.compare(password, admin.password);
  if (!isPasswordMatch) {
    return NextResponse.json({ success: false, message: "Invalid email or password" });
  }

  const token = await admin.generateAuthToken();
  const adminObj = admin.toObject();
  delete adminObj.password;

  return {
    admin: adminObj,
    token
  };
};