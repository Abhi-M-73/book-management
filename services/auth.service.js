import bcrypt from "bcryptjs";
import User from "@/models/User";

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