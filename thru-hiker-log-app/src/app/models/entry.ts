export interface IEntry {
  id?: number;
  trailId: number;
  name: string;
  startTime: Date;
  endTime: Date;
  startMileage: number;
  endMileage: number;
  elevationGain?: number;
  elevationLoss?: number;
  weather?: string;
  temperature?: number;
  notes?: string;
  dayNumber?: number; // computed field, not stored in DB
}