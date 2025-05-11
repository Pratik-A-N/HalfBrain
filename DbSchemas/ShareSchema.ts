import mongoose, { Schema } from "mongoose"

export interface IShare{
    share: boolean,
    user: any;
}

export const shareSchema = new Schema<IShare>({
    share: {type: Boolean, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})