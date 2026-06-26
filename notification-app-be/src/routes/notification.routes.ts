import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller';

const router = Router();
const controller = new NotificationController();

// Support fetching top N priorities: /api/notifications/top?n=10
router.get('/notifications/top', controller.getTopNotifications);

export default router;
