import { Family } from './family.model';

export interface Appointment {
  date: string;
  timeslots: {
    time: string;
    quantity: number;
    phoneNumber: string[];
  };
  month: number;
  year: number;
}
