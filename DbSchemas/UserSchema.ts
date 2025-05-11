import mongoose, { Schema } from "mongoose"
import { IContent } from "./ContentSchema"

export interface IUser {
    username: string,
    password: string,
    content: IContent[]
}

export const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    content: [
        {type: mongoose.Schema.Types.ObjectId,ref:'Content'}
    ]
})