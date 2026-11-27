import { Router } from 'express';
import { NewsletterController } from '../controllers/newsletterController';

export default class NewsletterRoute {
  public readonly router: Router;
  public readonly controller: NewsletterController;

  constructor() {
    this.router = Router();
    this.controller = new NewsletterController();
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router.post('/subscribe', this.controller.subscribe);
  };
}
