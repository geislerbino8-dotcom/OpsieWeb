import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});