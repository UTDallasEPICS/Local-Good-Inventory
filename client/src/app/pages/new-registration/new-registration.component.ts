import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Family } from 'src/app/models/family.model';
import { Member } from 'src/app/models/member.model';
import { FamilyService } from 'src/app/services/family.service';

@Component({
  selector: 'app-new-registration',
  templateUrl: './new-registration.component.html',
  styleUrls: ['./new-registration.component.css']
})
export class NewRegistrationComponent implements OnInit {

  family: Family = {phoneNumber: "", name: "", members: [{name: "", age: "", lastName: ""}], allergies: [], checkedIn: [], nextAppointment: ""};

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

}
