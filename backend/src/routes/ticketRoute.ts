import { Router, Request, Response } from 'express';
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
      this.create
    );

    this.router.get(
      '/getAll',
      this.getAll
    );

    this.router.patch(
      '/updateStatus/:id',
      this.updateStatus
    )

    this.router.patch(
      '/assign/:id',
      this.assign
    );

    this.router.delete(
      '/delete/:id',
      this.delete
    )
  }

  private create = (req: Request, res: Response): void => {
    this.controller.create(req, res);
  }

  private getAll = (req: Request, res: Response): void => {
    this.controller.getAll(req, res);
  }

  private updateStatus = (req: Request, res: Response): void => {
    this.controller.updateStatus(req, res);
  }

  private assign = (req: Request, res: Response): void => {
    this.controller.assign(req, res);
  }

  private delete = (req: Request, res: Response): void => {
    this.controller.delete(req, res);
  }
}