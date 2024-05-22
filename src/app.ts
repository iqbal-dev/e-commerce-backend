import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { errorHandlerMiddleware } from './app/middleware/errorHandlerMiddleware';
import router from './app/routes';

const app: Application = express();

// Middleware for parsing JSON and enabling CORS
app.use(express.json());
app.use(cors());

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Hello server',
  });
});

// Integration all endpoints

app.use('/api', router);

// Middleware for handling 404 Not Found errors
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route Not Found',
  });
});

// Global error handler middleware
app.use(errorHandlerMiddleware);

export default app;
