import { PriorityNotificationService } from './src/services/notification.service';
import { MinHeap } from './src/utils/priority-queue';

async function verify() {
  const service = new PriorityNotificationService();
  try {
    const topNotifications = await service.getTopNotifications(5);
    console.log("=== API Response ===");
    console.log(JSON.stringify(topNotifications, null, 2));
  } catch (err) {
    console.error("API failed. Falling back to mock test for Priority Queue...");
    
    // Fallback Mock test
    const mockData = [
      { ID: "1", Type: "Event", Message: "Event 1", Timestamp: "2024-05-19T10:00:00Z" },
      { ID: "2", Type: "Result", Message: "Result 1", Timestamp: "2024-05-20T10:00:00Z" },
      { ID: "3", Type: "Placement", Message: "Placement 1", Timestamp: "2024-05-18T10:00:00Z" },
      { ID: "4", Type: "Result", Message: "Result newer", Timestamp: "2024-05-21T10:00:00Z" },
      { ID: "5", Type: "Event", Message: "Event newer", Timestamp: "2024-05-22T10:00:00Z" },
      { ID: "6", Type: "Placement", Message: "Placement newer", Timestamp: "2024-05-23T10:00:00Z" }
    ];

    const heap = new MinHeap(3);
    for (const notif of mockData) {
      heap.insert(notif);
    }
    
    console.log("=== Expected: Placement newer, Placement 1, Result newer ===");
    console.log(JSON.stringify(heap.getItems(), null, 2));
  }
}

verify();
