import express from "express"
import { addContentHandler, deleteContentHandler, getAllContentHandler, getAllTagsHandler, getUserBainHandler, shareContentHandler, unShareContentHandler, updateContentHandler } from "../Controllers/contentController";
import { authenticate } from "../middlewares/authMiddleware";



const contentRouter = express.Router();

contentRouter.get('/', authenticate, getAllContentHandler);
contentRouter.get('/:userId',authenticate, getUserBainHandler);
contentRouter.get('/tags', authenticate, getAllTagsHandler);
contentRouter.post('/', authenticate , addContentHandler);
contentRouter.post('/share', authenticate, shareContentHandler);
contentRouter.post('/unShare', authenticate, unShareContentHandler)
contentRouter.put('/:contentId', authenticate, updateContentHandler);
contentRouter.delete('/:contentId', authenticate, deleteContentHandler);

export default contentRouter;