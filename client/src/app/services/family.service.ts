import { Family } from "../models/family.model"
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

export class FamilyService {
    private family: Family = {name: "", phoneNumber: "", members: []};
    private familyUpdated = new Subject<Family>();

    constructor(private http: HttpClient) {
        this.family = {
            phoneNumber: "5128391223",
            name: "Ross",
            members: [
              { name: "Michael", age: "18-59", allergies: ["nuts"]},
              { name: "Diane", age: "60+", allergies: []}
            ]
          }
    }

    getFamily() {
        return this.family;
    }

    getFamilyUpdateListener() {
        return this.familyUpdated.asObservable();
    }

    updateFamily(phoneNumber: string) {
        this.http.get<Family>('http://localhost:3000/family')
        .subscribe((family) => {
            this.family = family;
        });
    }
}