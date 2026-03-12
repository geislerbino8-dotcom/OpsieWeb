import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { HttpError } from './utils/httpError';
import TicketRoute from './routes/ticketRoute';
import UserRoute from './routes/userRoute';
import AuthRoute from './routes/authRoute';

export default class Server {
  public app: Application;
  private readonly port = process.env.PORT || 4000;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeNotFoundHandler();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares = (): void => {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private initializeRoutes = (): void => {
    const ticketRoute = new TicketRoute();
    const userRoute = new UserRoute();
    const authRoute = new AuthRoute();
    this.app.use('/ticket', ticketRoute.router);
    this.app.use('/user', userRoute.router);
    this.app.use('/auth', authRoute.router);
  }

  private initializeNotFoundHandler = (): void => {
    this.app.use((req: Request, _res: Response, next: NextFunction) => {
      next(new HttpError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
    });
  }

  private initializeErrorHandling = (): void => {
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
      },
    );
  }

  public startServer = async() => {
    try {
      await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@opsiewebsite.8uu1hmi.mongodb.net/${process.env.MONGODB_NAME}?appName=OpsieWebsite`);

      console.log('MongoDB connected');

      this.app.listen(this.port, () => {
        console.log(`Server running on http://localhost:${this.port}`);
      });

    } catch (error) {
      console.error('Startup error:', error);
    }
  }
}
