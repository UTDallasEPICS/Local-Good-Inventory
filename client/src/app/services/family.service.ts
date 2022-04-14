import { Family } from "../models/family.model"
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class FamilyService {
    private family: Family = {name: "", phoneNumber: "", members: []};
    private familyUpdated = new Subject<Family>();

    constructor(private http: HttpClient) { }

    getFamily() {
        return {...this.family};
    }

    getFamilyUpdateListener() {
        return this.familyUpdated.asObservable();
    }

    updateFamily(phoneNumber: string) {
        if(phoneNumber.length == 10) {
            this.http.get<{family: Family}>(`http://localhost:3000/family?phoneNumber=${phoneNumber}`)
            .subscribe((family) => {
                this.family = family.family;
                this.familyUpdated.next({...this.family});
            });
        } else {
            this.http.get<{family: Family}>('http://localhost:3000/family')
            .subscribe((family) => {
                this.family = family.family;
                this.familyUpdated.next({...this.family});
            });
        }
        
    }
}