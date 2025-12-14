import { Request, Response } from "express";
import { authServices } from "./auth.services";

const registerUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.signupUser(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "User does not registered",
      errors: err,
    });
  }
};
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authServices.loginUser(email, password);
    if (result === null) {
    res.status(404).json({
      success: false,
      message: "User not found",
      data: result});
  }else{
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });}
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Login Failed ",
      errors: err,
    });
  }
};
export const authControllers = {
  registerUser,
  loginUser,
};
