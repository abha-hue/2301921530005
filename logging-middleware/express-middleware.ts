import { Request, Response, NextFunction } from 'express';
import { Log } from './logger';

export const requestLoggerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', async () => {
    const duration = Date.now() - start;
    const message = `[${req.method}] ${req.originalUrl} - Status: ${res.statusCode} - ${duration}ms`;
    const level = res.statusCode >= 400 ? 'error' : 'info';
    
    await Log('backend', level, 'middleware', message);
  });

  next();
};
