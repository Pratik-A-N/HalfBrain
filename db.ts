import mongoose, { model, Schema } from "mongoose";
import dotenv from "dotenv"
import { IUser, userSchema } from "./DbSchemas/UserSchema";
import { contentSchema, IContent } from "./DbSchemas/ContentSchema";
import { ITag, tagSchema } from "./DbSchemas/TagSchema";
import { IShare, shareSchema } from "./DbSchemas/ShareSchema";
dotenv.config();

const DB_URL = process.env.MONGODB_CONNECTION_STRING || "";

mongoose.connect(DB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Connection error: ', error));

export const User = model<IUser>('User', userSchema)

export const Content = model<IContent>('Content', contentSchema)

export const Tag = model<ITag>('Tag', tagSchema)

export const Share = model<IShare>('Share', shareSchema)