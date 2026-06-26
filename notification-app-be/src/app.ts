import express, { Application } from 'express';
import { requestLoggerMiddleware } from '../../logging-middleware/index';
import notificationRoutes from './routes/notification.routes';

const app: Application = express();

app.use(express.json());

// Setup global request logger from the provided middleware package
app.use(requestLoggerMiddleware);

// Mount routes
app.use('/api', notificationRoutes);

export default app;
