import { adminMiddleware } from '../middleware/adminMiddleware';
import { requirePermission } from '../middleware/permissionMiddleware';
import { PERMISSIONS } from '../constants/permissions';
import { Router } from 'express';
import { WebContentController } from '../controllers/webContentController';

export default class WebContentRoute {
    public readonly router: Router;
    public readonly controller: WebContentController;

    constructor(){
        this.router = Router();
        this.controller = new WebContentController();
        this.initializeRoutes();
    }

    private initializeRoutes = (): void => {
        this.router.post(
            '/create',
            this.controller.create
        );

        this.router.get(
            '/get-content',
            this.controller.getContent
        );

        this.router.patch(
            '/update-content',
            this.controller.updateContent
        );
    };
}