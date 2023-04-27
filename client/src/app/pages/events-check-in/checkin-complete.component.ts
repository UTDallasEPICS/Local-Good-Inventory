import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';
import { Event } from 'src/app/models/event.model';
import { Family } from 'src/app/models/family.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { EventService } from 'src/app/services/event.service';
import { FamilyService } from 'src/app/services/family.service';

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
    console.log(this.family.nextAppointment);

    for(var appointment of this.family.nextAppointment) {
      this.events.set(appointment.id, await this.eventService.retrieveEvent(appointment.id));
    }

    console.log(this.events);
  }

}
