"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Share = exports.Tag = exports.Content = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserSchema_1 = require("./DbSchemas/UserSchema");
const ContentSchema_1 = require("./DbSchemas/ContentSchema");
const TagSchema_1 = require("./DbSchemas/TagSchema");
const ShareSchema_1 = require("./DbSchemas/ShareSchema");
dotenv_1.default.config();
const DB_URL = process.env.MONGODB_CONNECTION_STRING || "";
mongoose_1.default.connect(DB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Connection error: ', error));
exports.User = (0, mongoose_1.model)('User', UserSchema_1.userSchema);
exports.Content = (0, mongoose_1.model)('Content', ContentSchema_1.contentSchema);
exports.Tag = (0, mongoose_1.model)('Tag', TagSchema_1.tagSchema);
exports.Share = (0, mongoose_1.model)('Share', ShareSchema_1.shareSchema);
