import { Router } from 'express';
import { AuthController } from '../controllers/authController';

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
      this.controller.me
    );

    this.router.post(
      '/create',
      this.controller.create
    );

    this.router.post(
      '/login',
      this.controller.login
    );

    this.router.patch(
      '/resetPassword/:id',
      this.controller.resetPassword
    );

    this.router.patch(
      '/updateUser/:id',
      this.controller.updateUser
    );

    this.router.patch(
      '/restore/:id',
      this.controller.restoreUser
    );

    this.router.delete(
      '/delete/:id',
      this.controller.deleteUser
    );
  }
}