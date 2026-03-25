import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';
import { adminMiddleware } from '../middleware/adminMiddleware';
import { requirePermission } from '../middleware/permissionMiddleware';
import { PERMISSIONS } from '../constants/permissions';

export default class UserRoute {
  public readonly router: Router;
  public readonly controller: UserController;

  constructor() {
    this.router = Router();
    this.controller = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/getAll',
      authMiddleware,
      requirePermission(PERMISSIONS.USER_VIEW) || adminMiddleware,
      this.controller.getAll
    );

    this.router.get(
      '/getAllActive',
      authMiddleware,
      requirePermission(PERMISSIONS.USER_VIEW_ACTIVE) || adminMiddleware,
      this.controller.getAllActive
    );

    this.router.patch(
      '/update',
      authMiddleware,
      requirePermission(PERMISSIONS.USER_UPDATE_PROFILE) || adminMiddleware,
      this.controller.updateProfile
    );
  } 
}
