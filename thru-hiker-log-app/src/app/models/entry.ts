export interface IEntry {
  id?: number;
  trailId: number;
  name: string;
  startTime: Date;
  endTime: Date;
  startMileage: number;
  endMileage: number;
  notes: string;
}