import { Family } from "./family.model";

export const dietaryRestrictions = [
    "Allergy",
    "Blood Pressure",
    "Dairy Free",
    "Diabetes",
    "Gluten Free",
    "Halal",
    "Kosher",
    "Vegan",
    "Vegetarian"
] as const;

export const FamilyDefaults: Family = {
    phoneNumber: "",
    firstName: "",
    lastName: "",
    minors: 0,
    adults: 0,
    seniors: 0,
    allergies: [],
    appointments: [],
    color: "",
    referralSource: "",
    notes: "",
    invitedDate: "",
    needsLGMApplication: false,
    needsTEFAPForm: false,
    TEFAPForms: []
}