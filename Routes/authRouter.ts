import express from "express"
import { SignUpHandler } from "../Controllers/authController";


const authRouter = express.Router();

authRouter.post('/signUp', SignUpHandler)

export default authRouter;