import {z} from "zod"

export const signUpSchema = z.object({
    "username": z.string().min(3).max(12),
    "password": z.string().min(3).max(12)
})