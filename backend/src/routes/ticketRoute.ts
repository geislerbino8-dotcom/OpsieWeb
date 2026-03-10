import { Router } from 'express';
import { TicketController } from '../controllers/ticketController';

export default class TicketRoute {
  public readonly router: Router;
  public readonly controller: TicketController;

  constructor() {
    this.router = Router();
    this.controller = new TicketController();
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router.post(
      '/create',
      this.controller.create
    );

    this.router.get(
      '/getAll',
      this.controller.getAll
    );

    this.router.patch(
      '/update/:id',
      this.controller.updateTicket
    );

    this.router.delete(
      '/delete/:id',
      this.controller.delete
    );
  };
}