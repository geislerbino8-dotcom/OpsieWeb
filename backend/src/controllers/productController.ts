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

        const { name, data } = req.body

        try {

            const product = await ProductModel.findOneAndUpdate({name: name}, 
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
}
