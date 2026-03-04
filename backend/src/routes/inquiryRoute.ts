import { Router, Request, Response } from 'express';
import { InquiryController } from '../controllers/inquiryController';

export default class InquiryRoute {
  public readonly router: Router;
  public readonly controller: InquiryController;

  constructor() {
    this.router = Router();
    this.controller = new InquiryController();
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router.post(
      '/create',
      this.create.bind(this)
    );

    this.router.get(
      '/getAll',
      this.getAll.bind(this)
    );

    this.router.patch(
      '/updateStatus/:id',
      this.updateStatus.bind(this)
    )

    this.router.delete(
      '/delete/:id',
      this.delete.bind(this)
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

  private delete = (req: Request, res: Response): void => {
    this.controller.delete(req, res);
  }
}