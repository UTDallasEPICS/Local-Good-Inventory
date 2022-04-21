export interface Family {
    phoneNumber: string;
    name: string;
    members: Member[];
    lastCheckedIn: string;
    nextAppointment: string;
}
interface Member {
    name: string;
    age: string;
    allergies: string[];
}