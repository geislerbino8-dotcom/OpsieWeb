import mongoose from "mongoose";
import WebContentModel from "../models/webContentModel";
import { Request, Response } from "express";

export class WebContentController {

    public create = async (req: Request, res: Response)=> {

        try {
            
            const content = await WebContentModel.create(req.body)

            res.status(201).json({message: "Content created successfully"})

        } catch (error) {
            
            res.status(400).json({message: "Failed to create content"})
        }
    }

    public getContent = async (req: Request, res: Response)=> {
        try {
            
            const content = await WebContentModel.find()

            res.status(201).json({message: "Content fetch successfull", data: content})

        } catch (error) {
            res.status(400).json({message: "Content fetch unsuccessfull"})
        }
    }

    public updateContent = async (req: Request, res: Response) => {
    const { id, path, value } = req.body;

    console.log(id, path, value)

    try {
        const updated = await WebContentModel.findByIdAndUpdate(
        id,
        { $set: { [path]: value } },
        { returnDocument: "after" }
        );

        if(!updated) return res.status(401).json({message: "dsdasd"})

        res.status(200).json({
        message: "Content updated successfully",
        data: updated
        });

    } catch (error) {
        res.status(400).json({ message: "Update failed" });
    }
    };
}