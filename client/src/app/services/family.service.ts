import { Family } from "../models/family.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthService } from "@auth0/auth0-angular";

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

    getFamilyUpdateListener() {
        return this.familyUpdated.asObservable();
    }

    getCurrentFamily() {
        return {...this.family};
    }

    setCurrentFamily(family: Family) {
        this.family = family;
        this.familyUpdated.next({...family});
    }

    loadFamily(phoneNumber: string) {
        this.http.get<{family: Family}>(
            `${environment.API_URL}/family/${phoneNumber}`,
            {
                headers: { Authorization: `Bearer ${this.accessToken}` }
            }
        )
        .subscribe({
            next: response => this.setCurrentFamily(response.family),
            error: error => window.alert(error.error)
        });
    }

    async getFamily(phoneNumber: string): Promise<Family> {
        const promiseToken = new Promise<Family>((resolve, reject) => {
            this.http.get<{family: Family}>(
                `${environment.API_URL}/family/${phoneNumber}`,
                {
                    headers: { Authorization: `Bearer ${this.accessToken}` }
                }
            ).subscribe({
                next: response => resolve(response.family),
                error: error => window.alert(error.error)
            });
        });
        return promiseToken;
    }

    async getAllFamilies(): Promise<Family[]> {
        const promiseToken = new Promise<Family[]>((resolve, reject) => {
            this.http.get<{families: Family[]}>(
                `${environment.API_URL}/family`,
                {
                    headers: { Authorization: `Bearer ${this.accessToken}` }
                }
            )
            .subscribe({
                next: response => resolve(response.families),
                error: error => window.alert(error.error)
            });
        });
        return promiseToken;
    }

    async uploadFamily(family: Family): Promise<void> {
        const promiseToken = new Promise<void>((resolve, reject) => {
            this.http.put(
                `${environment.API_URL}/family/${family.phoneNumber}`, 
                family,
                {
                    headers: { Authorization: `Bearer ${this.accessToken}` }
                }).subscribe({
                    error: error => window.alert(error.error)
                });
        });
        return promiseToken;
    }

    async bookAppointment(phoneNumber: string, id: string, date: string) {
        const promiseToken = new Promise<void>((resolve, reject) => {
            this.http.put(
                `${environment.API_URL}/family/${phoneNumber}/appointment?id=${id}&date=${date}`,
                null,
                {
                    headers: { Authorization: `Bearer ${this.accessToken}` }
                }).subscribe({
                    error: error => window.alert(error.error)
                });
        });
        return promiseToken;
    }

    async checkInToAppointment(phoneNumber: string, id: string, date: string) {
        const promiseToken = new Promise<void>((resolve, reject) => {
            this.http.post(
                `${environment.API_URL}/family/${phoneNumber}/checkin?id=${id}&date=${date}`,
                null,
                {
                    headers: { Authorization: `Bearer ${this.accessToken}` }
                }).subscribe({
                    error: error => window.alert(error.error)
                });
        });
        return promiseToken;
    }

    async deleteFamily(phoneNumber: string) {
        const promiseToken = new Promise<void>((resolve, reject) => {
            this.http.delete(
                `${environment.API_URL}/family/${phoneNumber}`, 
                {
                    headers: {Authorization: `Bearer ${this.accessToken}` }
                }).subscribe({
                    error: error => window.alert(error.error)
                });
        });
        return promiseToken;
    }

    async deleteAppointment(phoneNumber: string, id: string, date: string) {
        const promiseToken = new Promise<void>((resolve, reject) => {
            this.http.delete(
                `${environment.API_URL}/family/${phoneNumber}/appointment?id=${id}&date=${date}`, 
                {
                    headers: {Authorization: `Bearer ${this.accessToken}` }
                }).subscribe({
                    error: error => window.alert(error.error)
                });
        });
        return promiseToken;
    }
}
