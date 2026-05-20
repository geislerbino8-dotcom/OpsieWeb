import { adminMiddleware } from '../middleware/adminMiddleware';
import { requirePermission } from '../middleware/permissionMiddleware';
import { PERMISSIONS } from '../constants/permissions';
import { Router } from 'express';
import { WebContentController } from '../controllers/webContentController';
import { authMiddleware } from '../middleware/authMiddleware';

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
            authMiddleware,
            requirePermission(PERMISSIONS.TICKET_VIEW) || adminMiddleware,
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

        this.router.patch(
            '/publish-content',
            this.controller.publishContent
        )
    };
}