import { Request, Response } from "express"
import { signUpSchema } from "../ZodSchemas/schemas";
import { ZodError } from "zod";
import { User } from "../db";
import bcrypt from "bcrypt";

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