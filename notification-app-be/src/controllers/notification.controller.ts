import { Request, Response } from 'express';
import { PriorityNotificationService } from '../services/notification.service';
import { Log } from '../../../logging-middleware/index';

export class NotificationController {
  private service: PriorityNotificationService;

  constructor() {
    this.service = new PriorityNotificationService();
  }

  public getTopNotifications = async (req: Request, res: Response): Promise<void> => {
    try {
      const limit = parseInt(req.query.n as string, 10) || 10;
      
      const notifications = await this.service.getTopNotifications(limit);
      
      res.status(200).json({
        success: true,
        data: notifications
      });
    } catch (error: any) {
      // The error logging is also handled inside the service to be specific,
      // but we catch here to send the HTTP response
      await Log('backend', 'error', 'controller', `Notification fetch failed: ${error.message}`);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch priority notifications'
      });
    }
  };
}
