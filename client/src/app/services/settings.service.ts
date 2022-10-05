import { Settings } from "../models/settings.model"
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";



@Injectable({providedIn: 'root'})
export class FamilyService {
    private settings: Settings = 
        {
            dates: ['F','S'],
            startTime: "9:30am",
            endTime: "11:30am",
            interval: 15,
            quantity: 4
        };
    private settingsUpdated = new Subject<Settings>();

    constructor(private http: HttpClient) { }

    getFamily() {
        return {...this.settings};
    }

    getFamilyUpdateListener() {
        return this.settingsUpdated.asObservable();
    }

    updateFamily() {
        const promiseToken = new Promise((resolve, reject) => {
            this.http.get<{settings: Settings}>(`http://localhost:3000/settings`)
            .subscribe((settings) => {
                    this.settings = settings.settings;
                    this.settingsUpdated.next({...this.settings});
                    resolve(settings);
            });    
        });

        return promiseToken;
        
    }

    postFamily(settings: Settings) {
        this.http.post(`http://localhost:3000/settings`, this.settings)
            .subscribe();
    }
}