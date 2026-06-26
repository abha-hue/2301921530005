import { VehicleTask, KnapsackResult } from '../types';

export function solveKnapsack(tasks: VehicleTask[], capacity: number): KnapsackResult {
  const n = tasks.length;
  const dp: number[][] = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const task = tasks[i - 1];
    for (let w = 0; w <= capacity; w++) {
      if (task.Duration <= w) {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          dp[i - 1][w - task.Duration] + task.Impact
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  const selectedTasks: string[] = [];
  let w = capacity;
  let totalDuration = 0;
  let totalImpact = dp[n][capacity];

  for (let i = n; i > 0 && totalImpact > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      const task = tasks[i - 1];
      selectedTasks.push(task.TaskID);
      totalDuration += task.Duration;
      w -= task.Duration;
      totalImpact -= task.Impact;
    }
  }

  // totalImpact in our tracking variable became 0, we can restore it from the dp table
  totalImpact = dp[n][capacity];

  // Optional: reverse to keep original relative order if preferred, though order doesn't strictly matter
  selectedTasks.reverse();

  return {
    selectedTasks,
    totalDuration,
    totalImpact
  };
}
