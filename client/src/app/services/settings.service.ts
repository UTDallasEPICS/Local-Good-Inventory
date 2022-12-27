import { Settings } from "../models/settings.model"
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";



@Injectable({providedIn: 'root'})
export class SettingsService {
    private settings: Settings = 
        {
            dates: [{day: 'Sun', startTime:"09:30", endTime:"11:30", active:false},
                    {day: 'Mon', startTime:"09:30", endTime:"11:30", active:false},
                    {day: 'Tue', startTime:"09:30", endTime:"11:30", active:false},
                    {day: 'Wed', startTime:"09:30", endTime:"11:30", active:false},
                    {day: 'Thu', startTime:"09:30", endTime:"11:30", active:false},
                    {day: 'Fri', startTime:"09:30", endTime:"11:30", active:true},
                    {day: 'Sat', startTime:"09:30", endTime:"11:30", active:true}],
            interval: 15,
            quantity: 4,
            blockOuts: []
        };
    private settingsUpdated = new Subject<Settings>();

    constructor(private http: HttpClient) { }

    getSettings() {
        return {...this.settings};
    }

    getSettingsUpdateListener() {
        return this.settingsUpdated.asObservable();
    }

    updateSettings() {
        const promiseToken = new Promise((resolve, reject) => {
            this.http.get<{settings: Settings}>(`http://${environment.API_URL}/settings`)
            .subscribe((settings) => {
                    this.settings = settings.settings;
                    this.settingsUpdated.next({...this.settings});
                    resolve(settings);
            });    
        });
        console.log("Updated settings");
        //console.log(this.settings);
        return promiseToken;
        
    }

    postSettings(settings: Settings) {
        console.log("Posted settings");
        console.log(settings);
        this.http.post(`http://${environment.API_URL}/settings`, settings)
            .subscribe();
    }
}