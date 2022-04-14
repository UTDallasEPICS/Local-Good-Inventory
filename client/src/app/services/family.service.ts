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
        this.http.get<Family>('http://localhost:3000/family')
        .subscribe((family) => {
            this.family = family;
        });
        this.familyUpdated.next({...this.family});
    }
}