import { solveKnapsack } from './src/utils/knapsack';

async function verify() {
  const mockDepots = [
    { ID: 1, MechanicHours: 60 },
    { ID: 2, MechanicHours: 100 }
  ];

  const mockVehicles = [
    { TaskID: "uuid1", Duration: 15, Impact: 30 },
    { TaskID: "uuid2", Duration: 20, Impact: 45 },
    { TaskID: "uuid3", Duration: 30, Impact: 50 },
    { TaskID: "uuid4", Duration: 10, Impact: 25 },
    { TaskID: "uuid5", Duration: 40, Impact: 60 },
    { TaskID: "uuid6", Duration: 5, Impact: 15 }
  ];

  const schedules = mockDepots.map(depot => {
    const result = solveKnapsack(mockVehicles, depot.MechanicHours);
    return {
      depotId: depot.ID,
      mechanicHours: depot.MechanicHours,
      selectedTasks: result.selectedTasks,
      totalDuration: result.totalDuration,
      totalImpact: result.totalImpact
    };
  });

  console.log(JSON.stringify(schedules, null, 2));
}

verify();
