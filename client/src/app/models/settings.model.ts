export interface Settings {
    dates: {
        day: string;
        startTime: string; //Time appointments should start on each day
        endTime: string; //Time appointments should end on each day
        active: boolean;
    }[]; //Days of the week that are valid for appointments
    interval: number; //Time in minutes each appointment should last (15 minutes)
    quantity: number; //Number of peoople who can sign up for each appointment slot
}