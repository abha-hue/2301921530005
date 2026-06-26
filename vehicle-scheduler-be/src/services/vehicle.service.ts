import axios from 'axios';
import { Log } from '../../../logging-middleware/index';
import { Depot, VehicleTask, ScheduleResponse } from '../types';
import { solveKnapsack } from '../utils/knapsack';

const DEPOTS_API_URL = 'http://4.224.186.213/evaluation-service/depots';
const VEHICLES_API_URL = 'http://4.224.186.213/evaluation-service/vehicles';

// Provided hardcoded token
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJndXB0YWFiaGF5NjkzQGdtYWlsLmNvbSIsImV4cCI6MTc4MjQ1NjUxMCwiaWF0IjoxNzgyNDU1NjEwLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNTQ2YzIxODEtNjRlMC00OTVmLWJlNGItMzU1ZTNlMmEyZjAzIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWJoYXkgZGFzIGd1cHRhIiwic3ViIjoiZTMwZTRhMGUtMjk5My00MzYwLWE2NzEtYmFlNmI0OWViNzkzIn0sImVtYWlsIjoiZ3VwdGFhYmhheTY5M0BnbWFpbC5jb20iLCJuYW1lIjoiYWJoYXkgZGFzIGd1cHRhIiwicm9sbE5vIjoiMjMwMTkyMTUzMDAwNSIsImFjY2Vzc0NvZGUiOiJ4eGtKbmsiLCJjbGllbnRJRCI6ImUzMGU0YTBlLTI5OTMtNDM2MC1hNjcxLWJhZTZiNDllYjc5MyIsImNsaWVudFNlY3JldCI6IlNLYWFuQWN2RnVTQkNxcnkifQ.U0eR7saIfz-5mrzBxKbDjrKIBgrOgvpHFlT8RwDufrU';

export class VehicleService {
  public async generateSchedule(): Promise<ScheduleResponse[]> {
    try {
      await Log('backend', 'info', 'service', 'Fetching depots');
      const depots = await this.fetchDepots();
      
      if (!depots || depots.length === 0) {
        await Log('backend', 'warn', 'service', 'Empty depot list received');
      }

      await Log('backend', 'info', 'service', 'Fetching vehicles');
      const vehicles = await this.fetchVehicles();

      if (!vehicles || vehicles.length === 0) {
        await Log('backend', 'warn', 'service', 'Empty vehicle list received');
      }

      await Log('backend', 'info', 'service', 'Fetched vehicles successfully');

      const schedules: ScheduleResponse[] = [];

      for (const depot of depots) {
        await Log('backend', 'debug', 'service', `Running knapsack for depot ${depot.ID}`);
        
        const result = solveKnapsack(vehicles, depot.MechanicHours);
        
        schedules.push({
          depotId: depot.ID,
          mechanicHours: depot.MechanicHours,
          selectedTasks: result.selectedTasks,
          totalDuration: result.totalDuration,
          totalImpact: result.totalImpact
        });
      }

      return schedules;
    } catch (error: any) {
      await Log('backend', 'error', 'service', `Failed to generate schedule: ${error.message}`);
      throw error;
    }
  }

  private async fetchDepots(): Promise<Depot[]> {
    try {
      const response = await axios.get(DEPOTS_API_URL, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`
        },
        timeout: 10000
      });
      return response.data.depots || [];
    } catch (error: any) {
      await Log('backend', 'error', 'service', `Depot API request failed: ${error.message}`);
      throw error;
    }
  }

  private async fetchVehicles(): Promise<VehicleTask[]> {
    try {
      const response = await axios.get(VEHICLES_API_URL, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`
        },
        timeout: 10000
      });
      return response.data.vehicles || [];
    } catch (error: any) {
      await Log('backend', 'error', 'service', `Vehicle API request failed: ${error.message}`);
      throw error;
    }
  }
}
