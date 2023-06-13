export interface Report {
    month: number,
    year: number,
    daysDistributed: number,
    households: number,
    householdsList: {phone: string, date: string}[],
    individualHouseholds: number,
    individualHouseholdsList: {phone: string, date: string}[],
    newHouseholds: number,
    newHouseholdsList: {phone: string, date: string}[],
    numberOfClients: number,
    clientsList: {phone: string, date: string}[],
    numberOfYouth: number,
    youthList: {phone: string, date: string}[],
    numberOfSeniors: number,
    seniorsList: {phone: string, date: string}[]
}