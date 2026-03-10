import { Router } from 'express';
import { UserController } from '../controllers/userController';

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
      this.controller.getAll
    );

    this.router.get(
      '/getAllActive',
      this.controller.getAllActive
    );

    this.router.patch(
      '/update',
      this.controller.updateProfile
    )
  } 
}