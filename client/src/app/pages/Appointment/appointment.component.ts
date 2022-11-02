import { Component, OnInit } from '@angular/core';
import { Family } from 'src/app/models/family.model';
import { FamilyService } from 'src/app/services/family.service';

@Component({
  selector: 'appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  family: Family = {} as Family;
  nextAppointment: string = "";

  constructor(public familyService: FamilyService) { }

  isDisplay = false;
  clicked = false;

  toggle()
  {
    this.isDisplay = true;
    this.clicked = true;
  }

  ngOnInit(): void {
  }

  updateAppointment() {
    this.family = this.familyService.getFamily();
    this.family.nextAppointment = this.nextAppointment;
    this.familyService.postFamily(this.family);
    console.log();
  }

  
}
