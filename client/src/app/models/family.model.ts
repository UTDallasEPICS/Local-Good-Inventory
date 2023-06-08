export interface Family {
    phoneNumber: string;
    firstName: string;
    lastName: string;
    minors: number;
    adults: number;
    seniors: number;
    allergies: string[];
    appointments: {id: string, date: string, checkedIn: boolean}[];
    color: string;
}
