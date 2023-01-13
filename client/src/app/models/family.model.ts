import { Member } from "./member.model";

export interface Family {
    phoneNumber: string;
    name: string;
    members: Member[];
    allergies: string[];
    checkedIn: string[];
    nextAppointment: string;
    color: string;
}
