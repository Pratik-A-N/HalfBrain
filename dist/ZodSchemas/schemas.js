"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addContentSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    "username": zod_1.z.string().min(3).max(12),
    "password": zod_1.z.string().min(3).max(12)
});
exports.addContentSchema = zod_1.z.object({
    "title": zod_1.z.string().min(3).max(500),
    "url": zod_1.z.string().min(3).max(500),
    "type": zod_1.z.enum(["Document", "Tweet", "YouTube", "Link"]),
    "tags": zod_1.z.array(zod_1.z.string())
});
