import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';
import { Event } from 'src/app/models/event.model';
import { Family } from 'src/app/models/family.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { EventService } from 'src/app/services/event.service';
import { FamilyService } from 'src/app/services/family.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-checkin-complete',
  templateUrl: './checkin-complete.component.html',
  styleUrls: ['./checkin-complete.component.css']
})
export class CheckinCompleteComponent implements OnInit {

  family: Family = {} as Family;
  events = new Map<string, Event>();
  filteredAppointments: {id: string, date: string}[] = [];

  private userEvents: Event[] = [];
  private userAppointments: Appointment[] = [];

  constructor(private familyService: FamilyService,
              private appointmentService: AppointmentService,
              private eventService: EventService) { }

  async ngOnInit(): Promise<void> {
    this.family = this.familyService.getFamily();

    var today = new Date();

    for(var appointment of this.family.nextAppointment) {
      var curr = appointment;
      var appointmentDate = new Date(Date.parse(curr.date));
      console.log("Appointment Date: ", appointmentDate.toLocaleString());
      console.log("Hour Deficit: " + (today.valueOf() - appointmentDate.valueOf()) / 36e5);
      if((today.valueOf() - appointmentDate.valueOf())/36e5 < 48) {
        if(curr.id == null) {
          curr.id = "000000000000000000000000";
          console.log("null appointment found");
        }
        this.filteredAppointments.push(curr);
        this.events.set(curr.id, await this.eventService.retrieveEvent(curr.id));
      }
    }
    console.log(this.family.nextAppointment);

  }

  checkIn(eventId: string) {
    var dateString: string = "";
    for (const appointment of this.family.nextAppointment) {
      if (appointment.id == eventId) {
        dateString = appointment.date;
      }
    }
    this.family.checkedIn.push({id: eventId, date: formatDate(dateString, 'dd-MM-yyyy', 'en-US', 'CST')});
    this.familyService.postFamilyDate(this.family, this.family.checkedIn[this.family.checkedIn.length - 1].date);
    this.eventService.loadEvent(eventId);
  }

}
