export interface Family {
    phoneNumber: string;
    name: string;
    members: Member[];
}
interface Member {
    name: string;
    age: string;
    allergies: string[];
}