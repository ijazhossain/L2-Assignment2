import { Router } from "express";
import { authControllers } from "./auth.controllers";

const router=Router();
router.post("/auth/signup",authControllers.registerUser)
router.post("/auth/signin",authControllers.loginUser)
export const authRoutes=router;