import { Request, Response, NextFunction } from "express";
import { successCallback } from "../utils/successResponse";
import {
  loginUserService,
  registerUserService,
} from "../services/auth.service";
import AppError from "../utils/appError";

/**
 *
 * @param req
 * @param res
 * @param next
 */

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await registerUserService(req.body);
    res.render("register", {
      message: "User Created Successfully !!!",
      error: null,
    });
    res.redirect("/login");
  } catch (error: any) {
    console.log(error.message, error.statusCode);
    res.render("register", {
      message: null,
      error: error.message || "Something went wrong",
    });
  }
};

/**
 *
 * @param req
 * @param res
 * @param next
 */

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await loginUserService(req.body);

    successCallback(
      res,
      "success",
      "UserLogin",
      "User Successfully LoggedIn !!!",
      result
    );
  } catch (error: any) {
    console.log(error.message, error.statusCode);
    next(new AppError(error.statusCode, error.message));
  }
};
