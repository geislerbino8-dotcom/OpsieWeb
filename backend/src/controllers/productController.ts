import { ProductModel } from '../models/productModel';
import { Request, Response } from 'express';

export class ProductController {

    public create = async (req: Request, res: Response) => {
        try {

            await ProductModel.create(req.body);

            res.status(201).json({ message: 'Product created succesfully' });

        
        } catch (error) {

            res.status(400).json({ message: 'Failed to create Product' });
            
        }
    };

    public getAll = async ( req: Request, res: Response ) => {
        try {
            
            const Products = await ProductModel.find();

            res.status(200).json(Products);

        } catch (error) {
            res.status(400).json({ message: 'Failed to find products' });
        }
    };


    public getProduct = async ( req: Request, res: Response) => {

        const { name } = req.query;

        if (typeof name !== 'string') {
            return res.status(400).json({ message: 'Product name is required' });
        }

        try {

            const product = await ProductModel.findOne({ name });

            res.status(200).json(product);
            
        } catch (error) {
            res.status(400).json({message: 'Failed to find product'});
        }
    };

    public updateProduct = async ( req: Request, res: Response) => {

        const { id, data } = req.body

        console.log(id, data)

        try {   

            const product = await ProductModel.findByIdAndUpdate(id, 
                data,
                {
                    new: true,
                }
            )

            if(!product) res.status(404).json({message: "Product not found"})

            res.status(200).json({message: "Product updated successfully"})
            
        } catch (error) {
            res.status(400).json({message: 'Failed to pudate product'})
        }
    }

    public deleteProduct = async (req: Request, res: Response) => {

        const { id } = req.params;

        try {
            const product = await ProductModel.findById(id);

            if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
            }

            await ProductModel.findByIdAndDelete(id);

            return res.status(200).json({
            message: "Product deleted successfully",
            });
        } catch (error) {
            return res.status(500).json({
            message: "Server error",
            error,
            });
        }
    };
}
