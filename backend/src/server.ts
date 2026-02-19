import express, { Application, Request, Response, NextFunction } from 'express';
import SampleRoute from './routes/sampleRoute';
import cors from 'cors';

export default class Server {
  public app: Application;
  private readonly port = process.env.PORT || 4000;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeErrorHandling();
    this.initializeRoutes();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private initializeErrorHandling(): void {
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
      },
    );
  }

  private initializeRoutes(): void {
    const sampleRoute = new SampleRoute();
    this.app.use('/api', sampleRoute.router);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    });
  }
}
