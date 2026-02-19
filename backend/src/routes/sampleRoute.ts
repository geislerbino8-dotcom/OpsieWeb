import { Router, Request, Response } from 'express';

export default class SampleRoute {
  public readonly router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/test', this.getTest);
  }

  private getTest(req: Request, res: Response): void {
    res.json({ name: 'Test' });
  }
}
