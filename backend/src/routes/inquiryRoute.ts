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
      '/getInquiries',
      this.getInquiries.bind(this)
    );
  }

  private create = (req: Request, res: Response): void => {
    this.controller.create(req, res);
  }

  private getInquiries = (req: Request, res: Response): void => {
    this.controller.getAll(req, res);
  }
}