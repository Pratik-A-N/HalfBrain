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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserBainHandler = exports.unShareContentHandler = exports.shareContentHandler = exports.getAllTagsHandler = exports.deleteContentHandler = exports.updateContentHandler = exports.addContentHandler = exports.getAllContentHandler = void 0;
const zod_1 = require("zod");
const db_1 = require("../db");
const schemas_1 = require("../ZodSchemas/schemas");
const getAllContentHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user;
        const content = yield db_1.Content.find({ user: userId }).populate('tags');
        if (!content) {
            res.status(200).send({
                "message": "No Content Available"
            });
            return;
        }
        res.status(200).send({
            "message": "Content Feteched Successfully",
            "content": content
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
exports.getAllContentHandler = getAllContentHandler;
const addContentHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const userId = req.user;
        const validatedBody = schemas_1.addContentSchema.parse(body);
        const tags = validatedBody.tags;
        const createdTags = yield Promise.all(tags.map((tag) => __awaiter(void 0, void 0, void 0, function* () {
            const tagToCreate = {
                tag: tag.toLowerCase()
            };
            const existingTag = yield db_1.Tag.find({ tag: tag.toLowerCase() });
            if (existingTag.length == 0) {
                const createdtag = yield db_1.Tag.create(tagToCreate);
                return createdtag._id;
            }
            else {
                return existingTag[0]._id;
            }
        })));
        const contentPayload = {
            title: validatedBody.title,
            url: validatedBody.url,
            type: validatedBody.type,
            tags: createdTags,
            user: userId
        };
        yield db_1.Content.create(contentPayload);
        res.status(200).send({
            "message": "Content Added Successfully !!"
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
exports.addContentHandler = addContentHandler;
const updateContentHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const userId = req.user;
        const contentId = req.params.contentId;
        const content = yield db_1.Content.findById(contentId);
        if (!content) {
            res.status(404).send({
                "message": "No Content Found"
            });
            return;
        }
        if (!content.user.equals(userId)) {
            res.status(403).send({
                "message": "Not Authorized to update this content"
            });
            return;
        }
        const validatedBody = schemas_1.addContentSchema.parse(body);
        const tags = validatedBody.tags;
        const createdTags = yield Promise.all(tags.map((tag) => __awaiter(void 0, void 0, void 0, function* () {
            const tagToCreate = {
                tag: tag.toLowerCase()
            };
            const existingTag = yield db_1.Tag.find({ tag: tag.toLowerCase() });
            if (existingTag.length == 0) {
                const createdtag = yield db_1.Tag.create(tagToCreate);
                return createdtag._id;
            }
            else {
                return existingTag[0]._id;
            }
        })));
        const payload = {
            title: validatedBody.title,
            type: validatedBody.type,
            url: validatedBody.url,
            tags: createdTags,
            user: userId
        };
        yield db_1.Content.findOne({ user: userId }).updateOne(payload);
        res.status(200).send({
            "message": "Content Updated Successfully"
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
exports.updateContentHandler = updateContentHandler;
const deleteContentHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const userId = req.user;
        const contentId = req.params.contentId;
        const content = yield db_1.Content.findById(contentId);
        if (!content) {
            res.status(404).send({
                "message": "No Content Found"
            });
            return;
        }
        if (!content.user.equals(userId)) {
            res.status(403).send({
                "message": "Not Authorized to delete this content"
            });
            return;
        }
        yield db_1.Content.findById(contentId).deleteOne();
        res.status(200).send({
            "message": "Deleted Successfully !!"
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
exports.deleteContentHandler = deleteContentHandler;
const getAllTagsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield db_1.Tag.find();
        res.status(200).send({
            "message": "Content Feteched Successfully",
            "tags": tags
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
exports.getAllTagsHandler = getAllTagsHandler;
const shareContentHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const userId = req.user;
        const shareState = yield db_1.Share.findOne({ user: userId });
        if (!shareState) {
            yield db_1.Share.create({
                share: true,
                user: userId
            });
            res.status(200).send({
                "message": "You can now Share your brain"
            });
            return;
        }
        else {
            if (shareState.share) {
                res.status(200).send({
                    "message": "Already in shared mode"
                });
                return;
            }
            yield db_1.Share.findById(shareState._id).updateOne({
                share: true,
                user: userId
            });
            res.status(200).send({
                "message": "You can now Share your brain"
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
exports.shareContentHandler = shareContentHandler;
const unShareContentHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const userId = req.user;
        const shareState = yield db_1.Share.findOne({ user: userId });
        if (!shareState) {
            yield db_1.Share.create({
                share: false,
                user: userId
            });
            res.status(200).send({
                "message": "Your brain is not accessible now"
            });
            return;
        }
        else {
            if (!shareState.share) {
                res.status(200).send({
                    "message": "Already not accessible"
                });
                return;
            }
            yield db_1.Share.findById(shareState._id).updateOne({
                share: false,
                user: userId
            });
            res.status(200).send({
                "message": "Your brain is not accessible now"
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
exports.unShareContentHandler = unShareContentHandler;
const getUserBainHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield db_1.User.findById(userId);
        if (!user) {
            res.status(404).send({
                "message": "User Does not exist"
            });
            return;
        }
        const shareable = yield db_1.Share.findOne({ user: userId });
        if (!(shareable === null || shareable === void 0 ? void 0 : shareable.share)) {
            res.status(403).send({
                "message": "Cannot Access this brain"
            });
            return;
        }
        const content = yield db_1.Content.find({ user: userId }).populate('tags');
        res.status(200).send({
            "message": "Content Feteched Successfully",
            "content": content
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
exports.getUserBainHandler = getUserBainHandler;
