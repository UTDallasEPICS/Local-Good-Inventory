import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Family } from 'src/app/models/family.model';
import * as Constants from 'src/app/models/constants.model';
import { FamilyService } from 'src/app/services/family.service';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';


@Component({
  selector: 'app-family-info',
  templateUrl: './family-info.component.html',
  styleUrls: ['./family-info.component.css']
})
export class FamilyInfoComponent implements OnInit {

  @Input() modalVisible: boolean = false;
  @Output() modalVisibleChange = new EventEmitter();

  @Input() isAdmin: boolean = false;

  @Input() callback: (() => void) | undefined;

  @Input() set family(value: string) {
    this.familyService.getFamily(value).then(res => {
      this.selectedFamily = res;
      this.sortAppointments();
    });
  }

  dietaryRestrictions = Constants.dietaryRestrictions;

  families: Family[] = []

  filteredFamilies: Family[] = [];

  selectedFamily: Family = Constants.FamilyDefaults;

  eventData = new Map<string, Event>();

  nextAppointmentFormatted: Date = new Date();

  futureAppointments: {id: string, date: string, checkedIn: boolean}[] = [];
  pastAppointments: {id: string, date: string, checkedIn: boolean}[] = [];

  editMode = false;
  restrictionsVisble = false;

  private accessToken: string = "";
  
  constructor(private familyService: FamilyService,
              private eventService: EventService) { }

  ngOnInit(): void {
  }

  updateFamily(): void {
    if(this.editMode) {
      this.familyService.uploadFamily(this.selectedFamily);
      this.editMode = false;
    } else {
      this.editMode = true;
    }
  }

  updateColor(color: string) {
    this.selectedFamily.color = color;
  }

  updateRestriction(restriction: string) {
    if(!this.selectedFamily.allergies.includes(restriction))
      this.selectedFamily.allergies.push(restriction);
    else
      this.selectedFamily.allergies.splice(this.selectedFamily.allergies.indexOf(restriction), 1);
  }

  deleteFamily() {
    if(confirm("Are you sure you want to delete this family?")) {
      this.familyService.deleteFamily(this.selectedFamily.phoneNumber);
    }
  }

  deleteAppointment(i: number) {
    if(confirm("Are you sure you want to delete this appointment?")) {
      this.familyService.deleteAppointment(this.selectedFamily.phoneNumber, this.futureAppointments[i].id, this.futureAppointments[i].date);
      this.futureAppointments.splice(i, 1);
    }
  }

  async sortAppointments() {
    this.futureAppointments = [];
    this.pastAppointments = [];
    this.eventData.clear();
    var today = new Date().valueOf();
    for(var appointment of this.selectedFamily.appointments) {
      var appointmentDate = new Date(Date.parse(appointment.date)).valueOf();
      if(today > appointmentDate || appointment.checkedIn) {
        this.pastAppointments.push(appointment);
      } else {
        this.futureAppointments.push(appointment);
      }
      if(appointment.id == null || appointment.id == "")
        appointment.id = "000000000000000000000000";
      if(!this.eventData.has(appointment.id)) {
        this.eventData.set(appointment.id, await this.eventService.getEvent(appointment.id))
      }
    }
  }

  showModal(number: string): void {
    this.families.forEach((family) => {
      if(family.phoneNumber == number) {
        this.selectedFamily = family;
        this.nextAppointmentFormatted = new Date(this.selectedFamily.appointments[-1].date);
      }
    })

    this.modalVisible = true;
    this.editMode = false;
    this.modalVisibleChange.emit(this.modalVisible);
  }

  hideModal(): void {
    this.modalVisible = false;
    this.selectedFamily = Constants.FamilyDefaults;
    this.editMode = false;
    this.modalVisibleChange.emit(this.modalVisible);
    if(this.callback != undefined) {
      this.callback();
    }
  }

}
