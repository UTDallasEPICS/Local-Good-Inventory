import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private appointment: Appointment = {
    date: "09-23-2022",
    startTime: "9:30am",
    endTime: "11:30am",
    quantity: 4,
    interval: 15,
    timeslots: []
  }

  public pages = [{page: "Stats", active: true}, 
                  {page: "Settings", active: false}];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  addAppointment() {
    this.http.post(`http://localhost:3000/appointment?date=${this.appointment.date}`, this.appointment)
      .subscribe();
  }

  setActive(id: number) {
    for(var i = 0; i < this.pages.length; i++) {
      this.pages[i].active = false;
      if(id == i) {
        this.pages[i].active = true;
      }
    }
  }
}