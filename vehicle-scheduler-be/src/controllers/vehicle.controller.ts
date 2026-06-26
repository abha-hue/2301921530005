import { Request, Response } from 'express';
import { VehicleService } from '../services/vehicle.service';
import { Log } from '../../../logging-middleware/index';

export class VehicleController {
  private vehicleService: VehicleService;

  constructor() {
    this.vehicleService = new VehicleService();
  }

  public getSchedule = async (req: Request, res: Response): Promise<void> => {
    try {
      await Log('backend', 'info', 'controller', 'Received request for vehicle schedule');
      
      const schedules = await this.vehicleService.generateSchedule();
      
      await Log('backend', 'info', 'controller', 'Successfully generated vehicle schedule');
      res.status(200).json(schedules);
    } catch (error: any) {
      await Log('backend', 'error', 'controller', `Failed to get vehicle schedule: ${error.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}
