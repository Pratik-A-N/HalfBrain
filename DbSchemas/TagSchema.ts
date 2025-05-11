import { Schema } from "mongoose"

export interface ITag{
    tag: string
}

export const tagSchema = new Schema<ITag>({
    tag: {type: String, required: true}
})