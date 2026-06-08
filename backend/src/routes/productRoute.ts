import { Router } from 'express';
import { ProductController } from "../controllers/productController";
import { authMiddleware } from '../middleware/authMiddleware';
import { requirePermission } from '../middleware/permissionMiddleware';
import { PERMISSIONS } from '../constants/permissions';
import { adminMiddleware } from '../middleware/adminMiddleware';

export default class ProductRoute {
    public readonly router: Router;
    public readonly controller: ProductController;

    constructor() {
        this.router = Router();
        this.controller = new ProductController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            '/create',
            this.controller.create
            );

        this.router.get(
            '/get-all',
            this.controller.getAll
        );

        this.router.get(
            '/get-product',
            this.controller.getProduct
        );

        this.router.put(
            '/update',
            authMiddleware,
            requirePermission(PERMISSIONS.TICKET_VIEW) || adminMiddleware,
            this.controller.updateProduct
        );

        this.router.get(
            '/delete/:id',
            authMiddleware,
            requirePermission(PERMISSIONS.TICKET_VIEW) || adminMiddleware,
            this.controller.deleteProduct
        )
    }
}