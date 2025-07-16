import { Router } from "express";
import { generateResetCode, resetPassword, signin, signout, signupLandlord, signupRenter,  } from "../controllers/auth_controller.js";

export const authRouter = Router();

authRouter.post('/signup/landlord', signupLandlord);
authRouter.post('/signup/renter', signupRenter);
authRouter.post('/signin', signin);
authRouter.post('/signout', signout);
authRouter.post('/reset-password/code', generateResetCode);
authRouter.post('/reset-password', resetPassword);
