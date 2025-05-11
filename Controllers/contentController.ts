import { Request, Response } from "express"

import { ZodError } from "zod";
import { Content, Share, Tag, User } from "../db";
import { addContentSchema } from "../ZodSchemas/schemas";
import { IContent } from "../DbSchemas/ContentSchema";
import { ITag } from "../DbSchemas/TagSchema";


export const getAllContentHandler = async (req:any, res: Response) =>{
    try {
        const userId = req.user;

        const content = await Content.find({user: userId}).populate('tags');

        if(!content){
            res.status(200).send({
                "message": "No Content Available"
            })
            return
        }

        res.status(200).send({
            "message": "Content Feteched Successfully",
            "content": content
        })
    } catch (error) {
        if(error instanceof ZodError){
            console.error("Validation failed: ", error.issues[0]);
        }else{
            console.error("Unexpected error: ", error);
        }

        res.status(500).send({
            "message": error
        });
    }
}

export const addContentHandler = async (req: any, res: Response) => {
    const body = req.body;

    try {
        const userId = req.user;

        const validatedBody = addContentSchema.parse(body);
        
        const tags = validatedBody.tags;

        const createdTags = await Promise.all(
            tags.map(async (tag) => {
              const tagToCreate: ITag = {
                tag: tag.toLowerCase()
              }

              const existingTag = await Tag.find({tag: tag.toLowerCase()});

              if(existingTag.length == 0){
                const createdtag = await Tag.create(tagToCreate);

                return createdtag._id;
              }else{
                return existingTag[0]._id;
              }            
            })
          );


        const contentPayload: IContent = {
            title: validatedBody.title,
            url: validatedBody.url,
            type: validatedBody.type,
            tags: createdTags,
            user: userId
        } 

        await Content.create(contentPayload);

        res.status(200).send({
            "message": "Content Added Successfully !!"
        })

    } catch (error) {
        if(error instanceof ZodError){
            console.error("Validation failed: ", error.issues[0]);
        }else{
            console.error("Unexpected error: ", error);
        }

        res.status(500).send({
            "message": error
        });
    }
}

export const updateContentHandler = async (req: any, res: Response) =>{
    const body = req.body;
    try {
        const userId = req.user;

        const contentId = req.params.contentId;
        
        const content = await Content.findById(contentId);

        if(!content){
            res.status(404).send({
                "message": "No Content Found"
            })
            return;
        }

        if(!content.user.equals(userId)){
            res.status(403).send({
                "message": "Not Authorized to update this content"
            })
            return;
        }

        const validatedBody = addContentSchema.parse(body);

        const tags = validatedBody.tags;

        const createdTags = await Promise.all(
            tags.map(async (tag) => {
              const tagToCreate: ITag = {
                tag: tag.toLowerCase()
              }

              const existingTag = await Tag.find({tag: tag.toLowerCase()});

              if(existingTag.length == 0){
                const createdtag = await Tag.create(tagToCreate);

                return createdtag._id;
              }else{
                return existingTag[0]._id;
              }            
            })
          );

        const payload = {
            title: validatedBody.title,
            type: validatedBody.type,
            url: validatedBody.url,
            tags: createdTags,
            user: userId
        }
        
        await Content.findOne({user: userId}).updateOne(payload);

        res.status(200).send({
            "message": "Content Updated Successfully"
        })
    } catch (error) {
        if(error instanceof ZodError){
            console.error("Validation failed: ", error.issues[0]);
        }else{
            console.error("Unexpected error: ", error);
        }

        res.status(500).send({
            "message": error
        });
    }
}

export const deleteContentHandler = async (req: any, res: Response) =>{
    const body = req.body;
    try {
        const userId = req.user;

        const contentId = req.params.contentId;

        const content = await Content.findById(contentId);

        if(!content){
            res.status(404).send({
                "message": "No Content Found"
            })
            return;
        }

        if(!content.user.equals(userId)){
            res.status(403).send({
                "message": "Not Authorized to delete this content"
            })
            return;
        }

        await Content.findById(contentId).deleteOne();

        res.status(200).send({
            "message": "Deleted Successfully !!"
        })

    } catch (error) {
        if(error instanceof ZodError){
            console.error("Validation failed: ", error.issues[0]);
        }else{
            console.error("Unexpected error: ", error);
        }

        res.status(500).send({
            "message": error
        });
    }
}

export const getAllTagsHandler = async (req: any, res: Response) =>{
    try {
        const tags = await Tag.find();

        res.status(200).send({
            "message": "Content Feteched Successfully",
            "tags": tags
        })
    } catch (error) {
        if(error instanceof ZodError){
            console.error("Validation failed: ", error.issues[0]);
        }else{
            console.error("Unexpected error: ", error);
        }

        res.status(500).send({
            "message": error
        });
    }
}

export const shareContentHandler = async (req: any, res: Response) =>{
    const body = req.body;
    
    try {
        const userId = req.user;

        const shareState = await Share.findOne({user: userId});

        if(!shareState){
            await Share.create({
                share: true,
                user: userId
            })

            res.status(200).send({
                "message": "You can now Share your brain"
            })
            return
        }else{
            if(shareState.share){
                res.status(200).send({
                    "message": "Already in shared mode"
                })
                return;
            }
            
            await Share.findById(shareState._id).updateOne({
                share: true,
                user: userId
            })
            

            res.status(200).send({
                "message": "You can now Share your brain"
            })
        }

    } catch (error) {
        if(error instanceof ZodError){
            console.error("Validation failed: ", error.issues[0]);
        }else{
            console.error("Unexpected error: ", error);
        }

        res.status(500).send({
            "message": error
        });
    }
}

export const unShareContentHandler = async (req: any, res: Response) => {
    const body = req.body;
    
    try {
        const userId = req.user;

        const shareState = await Share.findOne({user: userId});

        if(!shareState){
            await Share.create({
                share: false,
                user: userId
            })

            res.status(200).send({
                "message": "Your brain is not accessible now"
            })
            return
        }else{
            if(!shareState.share){
                res.status(200).send({
                    "message": "Already not accessible"
                })
                return;
            }
            
            await Share.findById(shareState._id).updateOne({
                share: false,
                user: userId
            })
            

            res.status(200).send({
                "message": "Your brain is not accessible now"
            })
        }

    } catch (error) {
        if(error instanceof ZodError){
            console.error("Validation failed: ", error.issues[0]);
        }else{
            console.error("Unexpected error: ", error);
        }

        res.status(500).send({
            "message": error
        });
    }
}

export const getUserBainHandler = async (req: any, res: Response) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);

        if(!user){
            res.status(404).send({
                "message": "User Does not exist"
            })
            return
        }

        const shareable = await Share.findOne({user: userId})

        if(!shareable?.share){
            res.status(403).send({
                "message": "Cannot Access this brain"
            })
            return
        }

        const content = await Content.find({user: userId}).populate('tags');

        res.status(200).send({
            "message": "Content Feteched Successfully",
            "content": content
        })
    } catch (error) {
        if(error instanceof ZodError){
            console.error("Validation failed: ", error.issues[0]);
        }else{
            console.error("Unexpected error: ", error);
        }

        res.status(500).send({
            "message": error
        });
    }
}