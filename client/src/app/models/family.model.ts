import { Member } from "./member.model";

export interface Family {
    phoneNumber: string;
    firstName: string;
    lastName: string;
    minors: number;
    adults: number;
    seniors: number;
    allergies: string[];
    checkedIn: {id: string, date: string}[];
    nextAppointment: string;
    color: string;
}
