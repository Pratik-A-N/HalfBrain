import { Request, Response ,NextFunction } from "express";
import jwt from "jsonwebtoken"
import { User } from "../db";

const secretKey = process.env.JWT_SECRET_KEY || '';

interface IJwtPayload {
    userId: string
}

export const authenticate = async (req: any, res: Response, next: NextFunction) =>{
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if(!token){
            res.status(401).send({
                "message": "Unauthorised Access"
            })
            return
        }

        const payload = jwt.verify(token,secretKey) as IJwtPayload;
        const user = await User.findById(payload.userId)

        if(!user){
            res.status(400).send({
                "message": "User Not Found"
            })
            return
        }

        req.user = user._id;

        next()
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}