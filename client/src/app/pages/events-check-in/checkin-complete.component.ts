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
  filteredAppointments: {id: string, date: string, checkedIn: boolean}[] = [];

  private userEvents: Event[] = [];
  private userAppointments: Appointment[] = [];

  constructor(private familyService: FamilyService,
              private appointmentService: AppointmentService,
              private eventService: EventService) { }

  async ngOnInit(): Promise<void> {
    this.family = this.familyService.getFamily();

    var today = new Date();

    for(var appointment of this.family.appointments) {
      var curr = appointment;
      var appointmentDate = new Date(Date.parse(curr.date));
      if(!curr.checkedIn && (today.valueOf() - appointmentDate.valueOf())/36e5 < 48) {
        if(curr.id == null) {
          curr.id = "000000000000000000000000";
          console.log("null appointment found");
        }
        this.filteredAppointments.push(curr);
        this.events.set(curr.id, await this.eventService.retrieveEvent(curr.id));
      }
    }
    console.log(this.family.appointments);

  }

  checkIn(eventId: string, date: string) {
    var dateString: string = "";
    for (const appointment of this.family.appointments) {
      if (appointment.id == eventId && appointment.date == date) {
        appointment.checkedIn = true;
      }
    }
    //this.family.checkedIn.push({id: eventId, date: formatDate(dateString, 'dd-MM-yyyy', 'en-US', 'CST')});
    this.familyService.postFamilyDate(this.family, date);
    this.eventService.loadEvent(eventId);
  }

}
