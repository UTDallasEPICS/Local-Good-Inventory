import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FamilyService } from 'src/app/services/family.service';
import { Family } from 'src/app/models/family.model';


@Component({
  selector: 'app-appointment2',
  templateUrl: './appointment2.component.html',
  styleUrls: ['./appointment2.component.css'],
})

export class Appointment2Component implements OnInit {

  family: Family = {name: "", phoneNumber: "", members: [], allergies: [], checkedIn: [], nextAppointment: ""};

  datePicked: Date = new Date(Date.now());
  appointmentTime: string = "";
  pipe = new DatePipe('en-US');
  nextAppointment: string = "";
  isActive: number = this.datePicked.getDate();
  isTimeActive: string = "";

  dates = Array(31).fill(0).map((x,i)=>i+1);
  startTime = 9.5;
  EndTime = 11.5;
  interval = .25;

  months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  n = new Date();
  day = this.n.getDay();
  month = this.n.getMonth();
  year = this.n.getFullYear();


  totalTime = (this.EndTime - this.startTime) / this.interval;
  times = Array(this.totalTime);

  appointmentconfirm = false;

  isDisabled: boolean = true;

  constructor(public familyService: FamilyService) { }

  ngOnInit(): void {
    for(let x = 0; x < this.totalTime; x++){
      this.times[x] = this.startTime + (x * this.interval);
    }
  }

  updateAppointment() {
    this.appointmentconfirm = true;
    var nextAppointment = this.pipe.transform(this.datePicked, 'dd-MM-YYYY')+ " at " + this.appointmentTime;
    this.family = this.familyService.getFamily();
    this.family.nextAppointment = nextAppointment? nextAppointment: "";
    this.familyService.postFamily(this.family);
    console.log(nextAppointment);
  }

}
