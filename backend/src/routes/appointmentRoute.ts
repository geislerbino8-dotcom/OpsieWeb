import { Router } from 'express';
import { AppointmentController } from '../controllers/appointmentController';

export default class AppointmentRoute {
  public readonly router: Router;
  public readonly controller: AppointmentController;

  constructor() {
    this.router = Router();
    this.controller = new AppointmentController();
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    // Public — anyone booking a consultation hits this; the mount in
    // server.ts puts it behind a rate limiter.
    this.router.post('/create', this.controller.create);
  };
}
