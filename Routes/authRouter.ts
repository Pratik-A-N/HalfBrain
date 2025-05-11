import express from "express"
import { LoginHandler, SignUpHandler } from "../Controllers/authController";


const authRouter = express.Router();

authRouter.post('/signUp', SignUpHandler)

authRouter.post('/login', LoginHandler)

export default authRouter;