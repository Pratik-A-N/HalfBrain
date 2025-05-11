import mongoose, { Schema } from "mongoose"

enum ContentType {
    Document = "Document",
    Tweet = "Tweet",
    Youtube = "YouTube",
    Link = "Link"
}

export interface IContent {
    title: string,
    url: string,
    type: string,
    tags: any[],
    user: any
}

export const contentSchema = new Schema<IContent>({
    title: { type: String, required: true},
    url: {type: String, required: true},
    type: {type: String, required: true},
    tags: [
        {type: mongoose.Schema.Types.ObjectId, ref:'Tag'}
    ],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})
