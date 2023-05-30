import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Family } from 'src/app/models/family.model';
import * as Constants from 'src/app/models/constants.model';
import { environment } from 'src/environments/environment';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
    this.familyService.pullFamily(value).then(res => {
      this.selectedFamily = res;
      this.sortAppointments();
      //window.alert("function ran: " + value);
    });
  }

  dietaryRestrictions = Constants.dietaryRestrictions;

  families: Family[] = []

  filteredFamilies: Family[] = [];

  selectedFamily: Family = {
    firstName: "", 
    lastName: "",
    phoneNumber: "", 
    allergies: [],
    checkedIn: [], 
    appointments: [],
    color: "",
    minors: 0,
    adults: 0,
    seniors: 0
  };

  eventData = new Map<string, Event>();

  nextAppointmentFormatted: Date = new Date();

  futureAppointments: {id: string, date: string, checkedIn: boolean}[] = [];
  pastAppointments: {id: string, date: string, checkedIn: boolean}[] = [];

  editMode = false;
  restrictionsVisble = false;

  private accessToken: string = "";
  
  constructor(private http: HttpClient, 
              private auth: AuthService,  
              private familyService: FamilyService,
              private eventService: EventService) { 
    auth.getAccessTokenSilently().subscribe(token => {
      this.accessToken = token;
    })
  }

  ngOnInit(): void {
  }

  updateFamily(): void {
    if(this.editMode) {
      if(this.selectedFamily.phoneNumber.length == 10) {
        this.http.post(
          `${environment.API_URL}/family?phoneNumber=${this.selectedFamily.phoneNumber}`, 
          this.selectedFamily,
          {
            headers: { Authorization: 'Bearer ' + this.accessToken }
          })
        .subscribe();
      }
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
    if(this.selectedFamily.phoneNumber.length == 10) {
      this.http.delete(
        `${environment.API_URL}/family?phoneNumber=${this.selectedFamily.phoneNumber}`,
        {
          headers: { Authorization: 'Bearer ' + this.accessToken }
        })
        .subscribe();
    }
  }

  deleteAppointment(i: number) {
    //todo: remove index i from this.futureAppointments
    //api call to server
    this.familyService.deleteAppointment(this.selectedFamily.phoneNumber, this.futureAppointments[i].id, this.futureAppointments[i].date);
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
        this.eventData.set(appointment.id, await this.eventService.retrieveEvent(appointment.id))
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
    this.modalVisibleChange.emit(this.modalVisible);
  }

  hideModal(): void {
    this.modalVisible = false;
    this.selectedFamily = {
      firstName: "", 
      lastName: "",
      phoneNumber: "", 
      allergies: [],
      checkedIn: [], 
      appointments: [],
      color: "",
      minors: 0,
      adults: 0,
      seniors: 0
    };
    this.editMode = false;
    this.modalVisibleChange.emit(this.modalVisible);
    if(this.callback != undefined) {
      this.callback();
    }
  }

}
