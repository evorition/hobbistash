import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import {
    signinValidationSchema,
    signupValidationSchema,
} from "../middlewares/validation.middleware.js";

const authRouter = Router();

authRouter.post("/signup", signupValidationSchema, authController.signup);
authRouter.post("/signin", signinValidationSchema, authController.signin);

export default authRouter;
