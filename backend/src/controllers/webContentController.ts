import mongoose from 'mongoose';
import WebContentModel from '../models/webContentModel';
import { Request, Response } from 'express';

export class WebContentController {

    public create = async (req: Request, res: Response)=> {

        try {
            
            const content = await WebContentModel.create(req.body);

            res.status(201).json({message: 'Content created successfully'});

        } catch (error) {
            
            res.status(400).json({message: 'Failed to create content'});
        }
    };

    public getContent = async (req: Request, res: Response)=> {
        try {
            
            const content = await WebContentModel.find();

            res.status(201).json({message: 'Content fetch successfull', data: content});

        } catch (error) {
            res.status(400).json({message: 'Content fetch unsuccessfull'});
        }
    };

    public updateContent = async (req: Request, res: Response) => {

        const {  path, value } = req.body;

        try {
            const updated = await WebContentModel.findOneAndUpdate(
                {},
                { $set: { [path]: value } },

                { 
                    returnDocument: 'after',
                    upsert: true
                }
            );


            if(!updated) return res.status(401).json({message: 'Could not update contnent'});

            console.log(updated)

            res.status(200).json({
                message: 'Content updated successfully',
                data: updated
            });

        } catch (error) {
            res.status(400).json({ message: 'Update failed' });
        }
    };

    public publishContent = async (req: Request, res: Response) => {
        try {
            // Get current content
            const existingContent = await WebContentModel.findOne({});

            if (!existingContent) {
            return res.status(404).json({
                message: "Content not found",
            });
            }

            // Copy draftContent into publishedContent
            existingContent.publishedContent =
            existingContent.draftContent;

            existingContent.lastPublishedAt = new Date();

            // Save changes
            await existingContent.save();

            res.status(200).json({
            message: "Content published successfully",
            data: existingContent,
            });
        } catch (error) {
            console.error(error);

            res.status(400).json({
            message: "Publish failed",
            });
        }
    };

    public getPublishedDate = async (req: Request, res: Response) => {
        try {
            const content = await WebContentModel.findOne({});

            const phDate = content?.lastPublishedAt
                ? new Date(content.lastPublishedAt).toLocaleString("en-PH", {
                    timeZone: "Asia/Manila",
                })
                : null;

            res.status(200).json({
                message: "Date published success",
                data: phDate,
            });

        } catch (error) {
            console.error(error);

            res.status(400).json({
                message: "Publish failed",
            });
        }
    };
}