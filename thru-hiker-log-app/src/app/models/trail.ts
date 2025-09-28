import { IEntry } from './entry';

export interface ITrail {
  id?: number;
  name: string;
  location: string;
  length: number;
  lengthType: string;
  startDate: Date;
  endDate?: Date;
  gearListUrl: string;
  notes: string;
  entries?: IEntry[];
}
