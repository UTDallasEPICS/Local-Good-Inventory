import { Family } from "../models/family.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";


@Injectable({providedIn: 'root'})
export class FamilyService {
    private family: Family = {} as Family;
    private familyUpdated = new Subject<Family>();

    constructor(private http: HttpClient) { }

    getFamily() {
        return {...this.family};
    }

    getFamilies() {
      this.http.get<{families: Family[]}>(`${environment.API_URL}/family`)
        .subscribe((families) => {
          return families;
        });
    }

    getFamilyUpdateListener() {
        return this.familyUpdated.asObservable();
    }

    updateFamily(phoneNumber: string) {
        const promiseToken = new Promise((resolve, reject) => {
            if(phoneNumber.length == 10) {
                this.http.get<{family: Family}>(`${environment.API_URL}/family?phoneNumber=${phoneNumber}`)
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

    postFamily(family: Family): void {
        if(family.phoneNumber.length == 10) {
        this.http.post(`${environment.API_URL}/family?phoneNumber=${family.phoneNumber}`, family)
            .subscribe();
        }
    }

    postFamilyDate(family: Family, date: string): void {
        if(family.phoneNumber.length == 10) {
        this.http.post(`${environment.API_URL}/family?phoneNumber=${family.phoneNumber}&date=${date}`, family)
            .subscribe();
        }
    }
}
