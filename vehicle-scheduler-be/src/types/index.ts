export interface Depot {
  ID: number;
  MechanicHours: number;
}

export interface VehicleTask {
  TaskID: string;
  Duration: number;
  Impact: number;
}

export interface KnapsackResult {
  selectedTasks: string[];
  totalDuration: number;
  totalImpact: number;
}

export interface ScheduleResponse {
  depotId: number;
  mechanicHours: number;
  selectedTasks: string[];
  totalDuration: number;
  totalImpact: number;
}
