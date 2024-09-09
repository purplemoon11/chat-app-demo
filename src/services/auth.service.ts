import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  ILoginData,
  ILoginResponse,
  IUser,
  IUserInput,
} from "../constants/iUser.interface";
import { User } from "../models/user.model";
import AppError from "../utils/appError";
import env from "../configs/env";

/**
 *
 * @param userData
 * @returns
 */

export const registerUserService = async (
  userData: IUserInput
): Promise<IUser> => {
  try {
    const { fullName, email, password } = userData;

    if (!fullName || !email || !password) {
      throw new Error("All fields are required.");
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      throw new AppError(400, "User with this email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    return newUser;
  } catch (error: any) {
    console.log(error.message);
    throw new AppError(error.statusCode, error.message);
  }
};

/**
 *
 * @param loginData
 * @returns
 */

export const loginUserService = async (
  loginData: ILoginData
): Promise<ILoginResponse> => {
  const { email, password } = loginData;

  if (!email || !password) {
    throw new AppError(400, "Email and password are required.");
  }

  const user = await User.findOne({ email: email });
  if (!user || !user.password) {
    throw new AppError(401, "The email or password you entered is incorrect.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError(401, "The email or password you entered is incorrect.");
  }

  const payload = { id: user._id, fullname: user.fullName };
  const secretKey = env.jwtTokenSecret || "";
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  const userObject = user.toObject();

  delete userObject.password;

  return {
    token,
    ...userObject,
  };
};
