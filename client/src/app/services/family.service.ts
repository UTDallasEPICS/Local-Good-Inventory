import { Family } from "../models/family.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthService } from "@auth0/auth0-angular";
import { lastValueFrom } from "rxjs";


@Injectable({providedIn: 'root'})
export class FamilyService {
    private family: Family = {} as Family;
    private familyUpdated = new Subject<Family>();

    private accessToken: string = "";

    constructor(private http: HttpClient, private auth: AuthService) { 
        auth.getAccessTokenSilently().subscribe(token => {
            this.accessToken = token;
        })
    }

    getFamily() {
        return {...this.family};
    }

    async pullFamily(phoneNumber: string) {
        const promiseToken = new Promise<Family>((resolve, reject) => {
            this.http.get<{family: Family}>(
                `${environment.API_URL}/family?phoneNumber=${phoneNumber}`,
                {
                    headers: { Authorization: 'Bearer ' + this.accessToken }
                }
            )
            .subscribe((family) => {
                resolve(family.family);
            });
        });

        return promiseToken;
    }

    async getFamilies() {
        this.http.get<{families: Family[]}>(
            `${environment.API_URL}/family`,
            {
                headers: { Authorization: 'Bearer ' + this.accessToken }
            }
        )
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
                this.http.get<{family: Family}>(
                    `${environment.API_URL}/family?phoneNumber=${phoneNumber}`,
                    {
                        headers: { Authorization: 'Bearer ' + this.accessToken }
                    }
                )
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

    async postFamily(family: Family): Promise<void> {
        if(family.phoneNumber.length == 10) {
            this.http.post(
                `${environment.API_URL}/family?phoneNumber=${family.phoneNumber}`, 
                family,
                {
                    headers: { Authorization: 'Bearer ' + this.accessToken}
                })
            .subscribe();
        }
    }

    postFamilyDate(family: Family, date: string): void {
        if(family.phoneNumber.length == 10) {
            this.http.post(
                `${environment.API_URL}/family?phoneNumber=${family.phoneNumber}&date=${date}`, 
                family,
                {
                    headers: {Authorization: 'Bearer ' + this.accessToken }
                })
                .subscribe();
        }
    }

    deleteAppointment(phoneNumber: string, id: string, date: string) {
        this.http.delete(
            `${environment.API_URL}/family/${phoneNumber}/appointment?id=${id}&date=${date}`, 
            {
                headers: {Authorization: 'Bearer ' + this.accessToken }
            })
            .subscribe();
    }
}
