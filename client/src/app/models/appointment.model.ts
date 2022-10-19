import { Family } from "./family.model";

export interface Appointment {
    date: string;
    startTime: string;
    endTime: string;
    interval: number;
    quantity: number;
    timeslots: {time: string, family: Family}[];
}