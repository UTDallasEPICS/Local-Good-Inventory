import { Component, OnInit } from '@angular/core';
import { Family } from 'src/app/models/family.model';

@Component({
  selector: 'app-new-registration',
  templateUrl: './new-registration.component.html',
  styleUrls: ['./new-registration.component.css']
})
export class NewRegistrationComponent implements OnInit {

  private family: Family = {phoneNumber: "", name: "", members: [], checkedIn: [], nextAppointment: ""};

  constructor() { }

  ngOnInit(): void {
  }

}
