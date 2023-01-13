import { Settings } from "../models/settings.model"
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthService } from "@auth0/auth0-angular";



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

    private accessToken: string = "";

    constructor(private http: HttpClient, private auth: AuthService) { 
        auth.getAccessTokenSilently().subscribe(token => {
            this.accessToken = token;
        })
    }

    getSettings() {
        return {...this.settings};
    }

    getSettingsUpdateListener() {
        return this.settingsUpdated.asObservable();
    }

    updateSettings() {
        const promiseToken = new Promise((resolve, reject) => {
            this.http.get<{settings: Settings}>(
                `${environment.API_URL}/settings`,
                {
                    headers: { Authorization: 'Bearer ' + this.accessToken }
                })
            .subscribe((settings) => {
                    this.settings = settings.settings;
                    this.settingsUpdated.next({...this.settings});
                    resolve(settings);
            });    
        });
        //console.log(this.settings);
        return promiseToken;
        
    }

    postSettings(settings: Settings) {
        this.http.post(
            `${environment.API_URL}/settings`, 
            settings,
            {
                headers: { Authorization: 'Bearer ' + this.accessToken }
            })
            .subscribe();
    }
}