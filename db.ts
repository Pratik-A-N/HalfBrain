import mongoose, { model, Schema } from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const DB_URL = process.env.MONGODB_CONNECTION_STRING || "";

mongoose.connect(DB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Connection error: ', error));

interface IUser {
    username: string,
    password: string
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true }
})

export const User = model<IUser>('User', userSchema)