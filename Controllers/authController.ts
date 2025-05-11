import { Request, Response } from "express"
import { signUpSchema } from "../ZodSchemas/schemas";
import { ZodError } from "zod";
import { User } from "../db";
import { z } from "zod"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

type userType = z.infer<typeof signUpSchema>;

const secretKey = process.env.JWT_SECRET_KEY || '';

export const SignUpHandler = async (req: Request, res: Response)=>{
    const body = req.body;
    try {
        const validatedBody = signUpSchema.parse(body);
        
        const existingUser = await User.find({
            username: validatedBody.username
        })


        if(existingUser.length > 0){
            res.status(500).send({
                "message": "Username Already taken"
            })
            return
        }

        // hash pass word
        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(validatedBody.password,salt);

        validatedBody.password = hasedPassword;

        await User.create(validatedBody);

        res.status(200).send({
            "message": "User Created Successfully"
        })

    } catch (error) {
        if(error instanceof ZodError){
            console.error("Validation failed: ", error.issues[0]);
        }else{
            console.error("Unexpected error: ", error);
        }

        res.status(500).send({
            "message": error
        });
    }
}

export const LoginHandler = async (req: Request, res: Response) =>{
    const body = req.body;

    try {
        const validatedBody = signUpSchema.parse(body);
        
        const existingUser = await User.find({
            username: validatedBody.username
        })


        if(existingUser.length > 0){
            const user = existingUser[0];

            const isCorrect = await bcrypt.compare(validatedBody.password, user.password);

            if(!isCorrect){
                res.status(403).send({
                    "message": "Incorect Password"
                })
                return
            }

            const token = jwt.sign({
                "userId": user._id
            }, secretKey)

            res.status(200).send({
                "token": token
            })

        }else{
            res.status(404).send({
                "message": "Username does not exist"
            })
        }

    } catch (error) {
        if(error instanceof ZodError){
            console.error("Validation failed: ", error.issues[0]);
        }else{
            console.error("Unexpected error: ", error);
        }

        res.status(500).send({
            "message": error
        });
    }
}