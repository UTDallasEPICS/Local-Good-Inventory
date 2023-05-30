import { Settings } from '../models/settings.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth0Client } from '@auth0/auth0-spa-js';
import { AuthService } from '@auth0/auth0-angular';
import { Appointment } from '../models/appointment.model';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private appointment: Appointment = {} as Appointment;
  private appointmentUpdated = new Subject<Appointment>();

  private accessToken: string = "";

  constructor(private http: HttpClient, private auth: AuthService) {
    auth.getAccessTokenSilently().subscribe(token => {
      this.accessToken = token;
    })
  }

  getAppointment() {
    return { ...this.appointment };
  }

  getAppointmentUpdateListener() {
    return this.appointmentUpdated.asObservable();
  }

  updateAppointment(date: string) {
    const promiseToken = new Promise<Appointment>((resolve, reject) => {
      this.http
        .get<{ appointment: Appointment }>(
          `${environment.API_URL}/appointment?date=${date}`,
          {
            headers: {Authorization: 'Bearer ' + this.accessToken}
          }
        )
        .subscribe((res) => {
          this.appointment = res.appointment;
          if(!res.appointment) {
            this.appointment = {
              date: +date.split('-')[2],
              month: +date.split('-')[1],
              year: +date.split('-')[0],
              timeslots: [],
              eventID: "000000000000000000000000"
            }
          }
          this.appointmentUpdated.next({ ...this.appointment });
          resolve(this.appointment);
        });
    });
    return promiseToken;
  }

  postAppointment(appointment: Appointment) {
    this.http.post(
      `${environment.API_URL}/appointment`, 
      appointment,
      {
        headers: { Authorization: 'Bearer ' + this.accessToken }
      }).subscribe();
  }

  deleteAllAppointments() {
    this.http.delete(
      `${environment.API_URL}/appointment/all`, 
      {
        headers: { Authorization: 'Bearer ' + this.accessToken }
      }).subscribe();
  }
}
