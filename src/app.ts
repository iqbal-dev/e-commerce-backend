import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { errorHandlerMiddleware } from './app/middleware/errorHandlerMiddleware'

const app: Application = express()

// Middleware for parsing JSON and enabling CORS
app.use(express.json())
app.use(cors())

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Hello server',
  })
})

// Middleware for handling 404 Not Found errors
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route Not Found',
  })
})

// Global error handler middleware
app.use(errorHandlerMiddleware)

export default app
