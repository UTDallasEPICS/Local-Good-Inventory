import { Member } from "./member.model";

export interface Family {
    phoneNumber: string;
    firstName: string;
    lastName: string;
    members: Member[];
    minors: number;
    adults: number;
    seniors: number;
    allergies: string[];
    checkedIn: string[];
    nextAppointment: string;
    color: string;
}
