import { Family } from './family.model';

export interface Appointment {
  date: number;
  timeslots: {
    time: string;
    quantity: number;
    phoneNumber: string[];
  }[];
  month: number;
  year: number;
}
