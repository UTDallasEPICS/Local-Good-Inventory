import { Settings } from '../models/settings.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth0Client } from '@auth0/auth0-spa-js';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private settings: Settings = {
    dates: [{day: 'Fri', startTime: '09:30', endTime: '11:30', active: true}],
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
    return { ...this.settings };
  }

  getSettingsUpdateListener() {
    return this.settingsUpdated.asObservable();
  }

  updateSettings(date: string) {
    const promiseToken = new Promise((resolve, reject) => {
      this.http
        .get<{ settings: Settings }>(
          `${environment.API_URL}/appointment?date=${date}`,
          {
            headers: {Authorization: 'Bearer ' + this.accessToken}
          }
        )
        .subscribe((settings) => {
          this.settings = settings.settings;
          this.settingsUpdated.next({ ...this.settings });
          resolve(settings);
        });
    });
    console.log('Updated appointments');
    //console.log(this.settings);
    return promiseToken;
  }

  postSettings(settings: Settings) {
    this.http.post(
      `${environment.API_URL}/appointment`, 
      settings,
      {
        headers: { Authorization: 'Bearer ' + this.accessToken }
      }).subscribe();
  }
}
