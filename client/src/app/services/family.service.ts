import { Family } from "../models/family.model"
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class FamilyService {
    private family: Family = 
        {
            name: "", 
            phoneNumber: "", 
            members: [], 
            allergies: [],
            checkedIn: [], 
            nextAppointment: ""
        };
    private familyUpdated = new Subject<Family>();

    constructor(private http: HttpClient) { }

    getFamily() {
        return {...this.family};
    }

    getFamilyUpdateListener() {
        return this.familyUpdated.asObservable();
    }

    updateFamily(phoneNumber: string) {
        const promiseToken = new Promise((resolve, reject) => {
            if(phoneNumber.length == 10) {
                this.http.get<{family: Family}>(`http://localhost:3000/family?phoneNumber=${phoneNumber}`)
                .subscribe((family) => {
                    this.family = family.family;
                    this.familyUpdated.next({...this.family});
                    resolve(family);
                });
            } else {
                reject("Not a valid phone number");
            }        
        });

        return promiseToken;
        
    }

    postFamily(family: Family) {
        if(family.phoneNumber.length == 10) {
        this.http.post(`http://localhost:3000/family?phoneNumber=${family.phoneNumber}`, family)
            .subscribe();
        }
    }
}