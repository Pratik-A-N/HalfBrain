"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginHandler = exports.SignUpHandler = void 0;
const schemas_1 = require("../ZodSchemas/schemas");
const zod_1 = require("zod");
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET_KEY || '';
const SignUpHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const validatedBody = schemas_1.signUpSchema.parse(body);
        const existingUser = yield db_1.User.find({
            username: validatedBody.username
        });
        if (existingUser.length > 0) {
            res.status(500).send({
                "message": "Username Already taken"
            });
            return;
        }
        // hash pass word
        const salt = yield bcrypt_1.default.genSalt(10);
        const hasedPassword = yield bcrypt_1.default.hash(validatedBody.password, salt);
        validatedBody.password = hasedPassword;
        yield db_1.User.create(validatedBody);
        res.status(200).send({
            "message": "User Created Successfully"
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            console.error("Validation failed: ", error.issues[0]);
        }
        else {
            console.error("Unexpected error: ", error);
        }
        res.status(500).send({
            "message": error
        });
    }
});
exports.SignUpHandler = SignUpHandler;
const LoginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const validatedBody = schemas_1.signUpSchema.parse(body);
        const existingUser = yield db_1.User.find({
            username: validatedBody.username
        });
        if (existingUser.length > 0) {
            const user = existingUser[0];
            const isCorrect = yield bcrypt_1.default.compare(validatedBody.password, user.password);
            if (!isCorrect) {
                res.status(403).send({
                    "message": "Incorect Password"
                });
                return;
            }
            const token = jsonwebtoken_1.default.sign({
                "userId": user._id
            }, secretKey);
            res.status(200).send({
                "token": token
            });
        }
        else {
            res.status(404).send({
                "message": "Username does not exist"
            });
        }
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            console.error("Validation failed: ", error.issues[0]);
        }
        else {
            console.error("Unexpected error: ", error);
        }
        res.status(500).send({
            "message": error
        });
    }
});
exports.LoginHandler = LoginHandler;
