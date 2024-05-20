import cors from 'cors'
import express, { Application, Request, Response } from 'express'

const app: Application = express()

// Middleware for parsing JSON and enabling CORS
app.use(express.json())
app.use(cors())

// Route for the root endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
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

export default app
