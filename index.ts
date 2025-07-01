import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

import { setupSwaggerDocs } from './src/config/swagger';
import errorHandling from './src/error/asyncError';
import router from './src/routes/index.route';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Routes
app.use('/api/v1', router);

// Swagger Docs
setupSwaggerDocs(app);

// Optional: 404 handler for unknown routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use(errorHandling as (err: any, req: Request, res: Response, next: NextFunction) => void);



// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
