import { Settings } from '../models/settings.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private settings: Settings = {
    dates: [{day: 'Fri', startTime: '09:30', endTime: '11:30', active: true}],
    interval: 15,
    quantity: 4,
    blockOuts: []
  };
  private settingsUpdated = new Subject<Settings>();

  constructor(private http: HttpClient) {}

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
          `http://${environment.API_URL}/appointment?date=${date}`
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
    this.http.post(`http://${environment.API_URL}/appointment`, settings).subscribe();
  }
}
