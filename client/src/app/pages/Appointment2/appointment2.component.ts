import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FamilyService } from 'src/app/services/family.service';
import { Family } from 'src/app/models/family.model';


@Component({
  selector: 'app-appointment2',
  templateUrl: './appointment2.component.html',
  styleUrls: ['./appointment2.component.css'],
})

// export const HEROES: Hero[] = [
//   { id: 12, name: 'Dr. Nice' },
//   { id: 13, name: 'Bombasto' },
//   { id: 14, name: 'Celeritas' },
//   { id: 15, name: 'Magneta' },
//   { id: 16, name: 'RubberMan' },
//   { id: 17, name: 'Dynama' },
//   { id: 18, name: 'Dr. IQ' },
//   { id: 19, name: 'Magma' },
//   { id: 20, name: 'Tornado' }
// ];

export class Appointment2Component implements OnInit {

  family: Family = {name: "", phoneNumber: "", members: [], allergies: [], checkedIn: [], nextAppointment: ""};

  datePicked: Date = new Date();
  pipe = new DatePipe('en-US');
  nextAppointment: string = "";

  appointmentconfirm = false;

  isDisabled: boolean = true;

  constructor(public familyService: FamilyService) { }

  ngOnInit(): void {

}

  updateAppointment() {
    this.appointmentconfirm = true;
    var nextAppointment = this.pipe.transform(this.datePicked, 'dd-MM-YYYY');
    this.family = this.familyService.getFamily();
    this.family.nextAppointment = nextAppointment? nextAppointment: "";
    this.familyService.postFamily(this.family);
    console.log();
  }

}
