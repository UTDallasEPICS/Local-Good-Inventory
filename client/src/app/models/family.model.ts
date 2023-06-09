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
    referralSource: string;
    notes: string;
    invitedDate: string;
    needsLGMApplication: boolean;
    needsTEFAPForm: boolean;
    TEFAPForms: string[];
}
