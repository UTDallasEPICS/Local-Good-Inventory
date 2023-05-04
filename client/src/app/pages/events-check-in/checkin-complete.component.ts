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

  private userEvents: Event[] = [];
  private userAppointments: Appointment[] = [];

  constructor(private familyService: FamilyService,
              private appointmentService: AppointmentService,
              private eventService: EventService) { }

  async ngOnInit(): Promise<void> {
    this.family = this.familyService.getFamily();

    for(var appointment of this.family.nextAppointment) {
      if(appointment.id == null) 
        appointment.id = "000000000000000000000000";
      this.events.set(appointment.id, await this.eventService.retrieveEvent(appointment.id));
    }
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
