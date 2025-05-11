"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRouter_js_1 = __importDefault(require("./Routes/authRouter.js"));
const contentRouter_js_1 = __importDefault(require("./Routes/contentRouter.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use('/api/auth', authRouter_js_1.default);
app.use('/api/content', contentRouter_js_1.default);
app.listen(PORT, () => {
    console.log(`Server is running only on ${PORT}`);
});
