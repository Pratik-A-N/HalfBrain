"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagSchema = void 0;
const mongoose_1 = require("mongoose");
exports.tagSchema = new mongoose_1.Schema({
    tag: { type: String, required: true }
});
