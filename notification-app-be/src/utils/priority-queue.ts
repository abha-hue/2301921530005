import { Notification } from '../models/notification.model';

export class MinHeap {
  private heap: Notification[];
  private maxSize: number;

  constructor(maxSize: number) {
    this.heap = [];
    this.maxSize = maxSize;
  }

  // Calculate priority score for comparison
  // Placement (3) > Result (2) > Event (1)
  // Higher score = higher priority
  private getScore(notification: Notification): number {
    let score = 0;
    if (notification.Type === 'Placement') score = 3;
    else if (notification.Type === 'Result') score = 2;
    else if (notification.Type === 'Event') score = 1;
    return score;
  }

  // Returns true if a has HIGHER priority than b
  // We need a MIN heap, so the root should be the LOWEST priority element
  // among the top K elements.
  // Therefore, a "smaller" element in this heap is one with a lower priority score.
  // If scores are equal, the older timestamp is "smaller" (lower priority).
  private isSmaller(a: Notification, b: Notification): boolean {
    const scoreA = this.getScore(a);
    const scoreB = this.getScore(b);

    if (scoreA !== scoreB) {
      return scoreA < scoreB;
    }

    // Newer timestamps have higher priority.
    // So the older timestamp is smaller/lower priority.
    const timeA = new Date(a.Timestamp).getTime();
    const timeB = new Date(b.Timestamp).getTime();
    return timeA < timeB;
  }

  public insert(notification: Notification): void {
    if (this.heap.length < this.maxSize) {
      this.heap.push(notification);
      this.bubbleUp(this.heap.length - 1);
    } else {
      // If the new notification has HIGHER priority than the minimum in our heap,
      // we replace the minimum with the new notification.
      if (!this.isSmaller(notification, this.heap[0])) {
        this.heap[0] = notification;
        this.sinkDown(0);
      }
    }
  }

  public getItems(): Notification[] {
    // Return items sorted by highest priority first
    return [...this.heap].sort((a, b) => (this.isSmaller(a, b) ? 1 : -1));
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.isSmaller(this.heap[index], this.heap[parentIndex])) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  private sinkDown(index: number): void {
    const length = this.heap.length;
    while (true) {
      let smallest = index;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;

      if (leftChild < length && this.isSmaller(this.heap[leftChild], this.heap[smallest])) {
        smallest = leftChild;
      }
      if (rightChild < length && this.isSmaller(this.heap[rightChild], this.heap[smallest])) {
        smallest = rightChild;
      }

      if (smallest !== index) {
        this.swap(index, smallest);
        index = smallest;
      } else {
        break;
      }
    }
  }

  private swap(i: number, j: number): void {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
}
