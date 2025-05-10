"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    "username": zod_1.z.string().min(3).max(12),
    "password": zod_1.z.string().min(3).max(12)
});
