import axios from 'axios';
import { Log } from '../../../logging-middleware/index';
import { Notification } from '../models/notification.model';
import { MinHeap } from '../utils/priority-queue';

const API_URL = 'http://4.224.186.213/evaluation-service/notifications';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJndXB0YWFiaGF5NjkzQGdtYWlsLmNvbSIsImV4cCI6MTc4MjQ1NjUxMCwiaWF0IjoxNzgyNDU1NjEwLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNTQ2YzIxODEtNjRlMC00OTVmLWJlNGItMzU1ZTNlMmEyZjAzIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWJoYXkgZGFzIGd1cHRhIiwic3ViIjoiZTMwZTRhMGUtMjk5My00MzYwLWE2NzEtYmFlNmI0OWViNzkzIn0sImVtYWlsIjoiZ3VwdGFhYmhheTY5M0BnbWFpbC5jb20iLCJuYW1lIjoiYWJoYXkgZGFzIGd1cHRhIiwicm9sbE5vIjoiMjMwMTkyMTUzMDAwNSIsImFjY2Vzc0NvZGUiOiJ4eGtKbmsiLCJjbGllbnRJRCI6ImUzMGU0YTBlLTI5OTMtNDM2MC1hNjcxLWJhZTZiNDllYjc5MyIsImNsaWVudFNlY3JldCI6IlNLYWFuQWN2RnVTQkNxcnkifQ.U0eR7saIfz-5mrzBxKbDjrKIBgrOgvpHFlT8RwDufrU';

export class PriorityNotificationService {
  public async getTopNotifications(n: number): Promise<Notification[]> {
    try {
      await Log('backend', 'info', 'service', 'Fetching notifications');
      
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`
        },
        timeout: 10000
      });

      const notifications: Notification[] = response.data.notifications || response.data || [];
      
      if (!Array.isArray(notifications) || notifications.length === 0) {
        await Log('backend', 'warn', 'service', 'No notifications received from API');
        return [];
      }

      await Log('backend', 'debug', 'service', 'Ranking priority notifications');
      
      const minHeap = new MinHeap(n);
      
      // Iterate through the raw N dataset and insert into the Min Heap of max size K
      for (const notification of notifications) {
        minHeap.insert(notification);
      }

      // The returned items will be sorted by highest priority
      const topN = minHeap.getItems();
      
      await Log('backend', 'info', 'service', `Successfully computed top ${topN.length} notifications`);
      
      return topN;
    } catch (error: any) {
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        await Log('backend', 'warn', 'service', 'Notification API timeout');
      } else {
        await Log('backend', 'error', 'service', `Notification fetch failed: ${error.message}`);
      }
      throw error;
    }
  }
}
