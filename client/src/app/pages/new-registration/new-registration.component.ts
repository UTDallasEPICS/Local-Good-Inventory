import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Family } from 'src/app/models/family.model';
import { Member } from 'src/app/models/member.model';
import { FamilyService } from 'src/app/services/family.service';
import * as Constants from 'src/app/models/constants.model';

@Component({
  selector: 'app-new-registration',
  templateUrl: './new-registration.component.html',
  styleUrls: ['./new-registration.component.css']
})
export class NewRegistrationComponent implements OnInit {

  dietaryRestrictions = Constants.dietaryRestrictions;

  family: Family = {
    name: "", 
    phoneNumber: "", 
    members: [{name: "", age: "", lastName: ""}], 
    allergies: [],
    checkedIn: [], 
    nextAppointment: "",
    color: ""
  };

  constructor(private familyService: FamilyService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.family);
  }

  onClick(){
    this.familyService.postFamily(this.family);
    this.router.navigate(['/appointment']);
  }

  addMember() {
    this.family.members.push({name: "", age: "", lastName: ""})
  }

  removeMember(index: number) {
    this.family.members.splice(index,1);
  }

  updateRestriction(restriction: string) {
    if(!this.family.allergies.includes(restriction))
      this.family.allergies.push(restriction);
    else
      this.family.allergies.splice(this.family.allergies.indexOf(restriction), 1);
  }

}
