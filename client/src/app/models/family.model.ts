import { Member } from "./member.model";

export interface Family {
    phoneNumber: string;
    name: string;
    members: Member[];
    checkedIn: string[];
    nextAppointment: string;
}
