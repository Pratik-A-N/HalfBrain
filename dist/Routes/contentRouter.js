"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contentController_1 = require("../Controllers/contentController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const contentRouter = express_1.default.Router();
contentRouter.get('/', authMiddleware_1.authenticate, contentController_1.getAllContentHandler);
contentRouter.get('/:userId', authMiddleware_1.authenticate, contentController_1.getUserBainHandler);
contentRouter.get('/tags', authMiddleware_1.authenticate, contentController_1.getAllTagsHandler);
contentRouter.post('/', authMiddleware_1.authenticate, contentController_1.addContentHandler);
contentRouter.post('/share', authMiddleware_1.authenticate, contentController_1.shareContentHandler);
contentRouter.post('/unShare', authMiddleware_1.authenticate, contentController_1.unShareContentHandler);
contentRouter.put('/:contentId', authMiddleware_1.authenticate, contentController_1.updateContentHandler);
contentRouter.delete('/:contentId', authMiddleware_1.authenticate, contentController_1.deleteContentHandler);
exports.default = contentRouter;
