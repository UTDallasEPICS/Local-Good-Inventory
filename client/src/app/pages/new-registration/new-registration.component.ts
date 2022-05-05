import { Component, OnInit } from '@angular/core';
import { Family } from 'src/app/models/family.model';
import { Member } from 'src/app/models/member.model';

@Component({
  selector: 'app-new-registration',
  templateUrl: './new-registration.component.html',
  styleUrls: ['./new-registration.component.css']
})
export class NewRegistrationComponent implements OnInit {

  family: Family = {phoneNumber: "", name: "", members: [], checkedIn: [], nextAppointment: ""};


  members: Member[] = [
    { name: "", age: "", allergies: []}
  ];
  numMembers = 2;

  constructor() { }

  ngOnInit(): void {
  }

}
