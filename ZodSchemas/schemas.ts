import {object, z} from "zod"

export const signUpSchema = z.object({
    "username": z.string().min(3).max(12),
    "password": z.string().min(3).max(12)
})

export const addContentSchema = z.object({
    "title": z.string().min(3).max(500),
    "url": z.string().min(3).max(500),
    "type": z.enum(["Document","Tweet","YouTube","Link"]),
    "tags": z.array(z.string())
})