import express, { Application } from 'express';
import { requestLoggerMiddleware } from '../../logging-middleware/index';
import vehicleRoutes from './routes/vehicle.routes';

const app: Application = express();

app.use(express.json());

// Setup global request logger from the provided middleware package
app.use(requestLoggerMiddleware);

// Mount scheduling routes
app.use('/api', vehicleRoutes);

export default app;
