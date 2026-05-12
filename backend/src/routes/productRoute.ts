import { Router } from "express";
import { ProductController } from "../controllers/productController";
import { authMiddleware } from "../middleware/authMiddleware";

export default class ProductRoute {
    public readonly router: Router;
    public readonly controller: ProductController

    constructor() {
        this.router = Router();
        this.controller = new ProductController();
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post(
            '/create',
            this.controller.create
            );

        this.router.get(
            '/get-all',
            this.controller.getAll
        )

        this.router.get(
            '/get-product',
            this.controller.getProduct
        )
    }
}