import { Report } from '../models/report.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '@auth0/auth0-angular';
import { Event } from '../models/event.model';

@Injectable({ providedIn: 'root' })
export class EventService {
  private event: Event = {} as Event
  private eventUpdated = new Subject<Event>();

  private accessToken: string = "";

  constructor(private http: HttpClient, private auth: AuthService) {
    auth.getAccessTokenSilently().subscribe(token => {
      this.accessToken = token;
    });
  }

  getEvent() {
    return { ...this.event };
  }

  getEventUpdateListener() {
    return this.eventUpdated.asObservable();
  }

  async retrieveEvent(id: string) {
    const promiseToken = new Promise<Event>((resolve, reject) => {
    this.http
      .get<{ event: Event }>(
        `${environment.API_URL}/event?id=${id}`,
        {
          headers: { Authorization: 'Bearer ' + this.accessToken }
        }
      )
      .subscribe((res) => {
        this.event = res.event;
        this.eventUpdated.next({ ...this.event });
        resolve(res.event);
      });
    });

    return promiseToken;
  }

  async getFutureEvents() {
    const promiseToken = new Promise<Event[]>((resolve, reject) => {
    this.http
      .get<{ events: Event[] }>(
        `${environment.API_URL}/event?date=${new Date().toISOString()}`,
        {
          headers: { Authorization: 'Bearer ' + this.accessToken }
        }
      )
      .subscribe((res) => {
        resolve(res.events);
      });
    });

    return promiseToken;
  }

  async getAllEvents() {
    const promiseToken = new Promise<Event[]>((resolve, reject) => {
      this.http
        .get<{ events: Event[] }>(
          `${environment.API_URL}/event`,
          {
            headers: { Authorization: 'Bearer ' + this.accessToken }
          }
        )
        .subscribe((res) => {
          resolve(res.events);
        });
      });
  
      return promiseToken;
  }

  async scrapeEvents() {
    const promiseToken = new Promise<Event[]>((resolve, reject) => {
      this.http
        .get<{ events: Event[] }>(
          `${environment.API_URL}/event/scrape`,
          {
            headers: { Authorization: 'Bearer ' + this.accessToken }
          }
        )
        .subscribe((res) => {
          resolve(res.events);
        });
      });
  
      return promiseToken;
  }

  postEvent(event: Event) {
    this.http.post(
      `${environment.API_URL}/event`,
      event,
      {
        headers: { Authorization: 'Bearer ' + this.accessToken }
      }).subscribe();
  }
}
