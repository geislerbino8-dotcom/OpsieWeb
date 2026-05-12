import mongoose from "mongoose";
import { ProductModel } from "../models/productModel";
import { Request, Response } from "express";

export class ProductController {

    public create = async (req: Request, res: Response) => {
        try {

            const Product = await ProductModel.create(req.body)

            res.status(201).json({ message: 'Product created succesfully' });

        
        } catch (error) {

            res.status(400).json({ message: 'Failed to create Product' });
            
        }
    }

    public getAll = async ( req: Request, res: Response ) => {
        try {
            
            const Products = await ProductModel.find()

            res.status(200).json(Products)

        } catch (error) {
            res.status(400).json({ message: 'Failed to find products' });
        }
    }


    public getProduct = async ( req: Request, res: Response) => {

        const  {name}  = req.query

        try {

            const product = await ProductModel.findOne({name: name})

            res.status(200).json(product)
            
        } catch (error) {
            res.status(400).json({message: 'Failed to find product'})
        }
    }
}

