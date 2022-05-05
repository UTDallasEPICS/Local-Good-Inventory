export interface Family {
    phoneNumber: string;
    name: string;
    members: Member[];
    checkedIn: string[];
    nextAppointment: string;
}
interface Member {
    name: string;
    age: string;
    allergies: string[];
}