import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';
import { adminMiddleware } from '../middleware/adminMiddleware';
import { requirePermission } from '../middleware/permissionMiddleware';
import { PERMISSIONS } from '../constants/permissions';

export default class AuthRoute {
  public readonly router: Router;
  public readonly controller: AuthController;

  constructor() {
    this.router = Router();
    this.controller = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router.get(
      '/me',
      authMiddleware,
      requirePermission(PERMISSIONS.USER_VIEW_ME) || adminMiddleware,
      this.controller.me
    );

    this.router.post(
      '/create',
      authMiddleware,
      requirePermission(PERMISSIONS.USER_CREATE) || adminMiddleware,
      this.controller.create
    );

    this.router.post(
      '/login',
      this.controller.login
    );

    this.router.patch(
      '/updateUser/:id',
      authMiddleware,
      requirePermission(PERMISSIONS.USER_UPDATE) || adminMiddleware,
      this.controller.updateUser
    );

    this.router.patch(
      '/resetPassword/:id',
      authMiddleware,
      requirePermission(PERMISSIONS.USER_RESET_PASSWORD) || adminMiddleware,
      this.controller.resetPassword
    );

    this.router.patch(
      '/restore/:id',
      authMiddleware,
      requirePermission(PERMISSIONS.USER_RESTORE) || adminMiddleware,
      this.controller.restoreUser
    );

    this.router.delete(
      '/delete/:id',
      authMiddleware,
      requirePermission(PERMISSIONS.USER_DELETE) || adminMiddleware,
      this.controller.deleteUser
    );
  }
}