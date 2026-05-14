import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { HttpError } from "./utils/httpError";
import TicketRoute from "./routes/ticketRoute";
import UserRoute from "./routes/userRoute";
import AuthRoute from "./routes/authRoute";
import dns from "dns";
import { rateLimit } from "express-rate-limit";
import WebContentRoute from "./routes/webContentRoute";
import ProductRoute from "./routes/productRoute";
// Force Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 1, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  message: { error: "Too many requests, please try again later." },
});

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
  };

  private initializeRoutes = (): void => {
    const ticketRoute = new TicketRoute();
    const userRoute = new UserRoute();
    const authRoute = new AuthRoute();
    const webContentRoute = new WebContentRoute();
    const productRoute = new ProductRoute()
    const API_PREFIX = process.env.API_PREFIX || "/api";
    this.app.use(`${API_PREFIX}/ticket/create`, ticketRoute.router, limiter);
    this.app.use(`${API_PREFIX}/ticket`, ticketRoute.router);
    this.app.use(`${API_PREFIX}/user`, userRoute.router);
    this.app.use(`${API_PREFIX}/auth`, authRoute.router);
    this.app.use(`${API_PREFIX}/webcontent`, webContentRoute.router);
    this.app.use(`${API_PREFIX}/products`, productRoute.router)
  };

  private initializeNotFoundHandler = (): void => {
    this.app.use((req: Request, _res: Response, next: NextFunction) => {
      next(
        new HttpError(`Route not found: ${req.method} ${req.originalUrl}`, 404),
      );
    });
  };

  private initializeErrorHandling = (): void => {
    this.app.use(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).json({ error: "Internal Server Error" });
      },
    );
  };

  public startServer = async () => {
    try {
      await mongoose.connect(
        `mongodb://localhost:27017/`
        //`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@opsiewebsite.8uu1hmi.mongodb.net/${process.env.MONGODB_NAME}?appName=OpsieWebsite`,
      );

      /* const mongoUri =
        process.env.MONGO_URI || "mongodb://localhost:27017/opsie_db";

      await mongoose.connect(mongoUri); */

      console.log("MongoDB connected");

      this.app.listen(this.port, () => {
        console.log(`Server running on http://localhost:${this.port}`);
      });
    } catch (error) {
      console.error("Startup error:", error);
    }
  };
}
