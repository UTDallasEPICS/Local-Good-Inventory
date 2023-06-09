import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Family } from 'src/app/models/family.model';
//import { Member } from 'src/app/models/member.model';
import { FamilyService } from 'src/app/services/family.service';
import * as Constants from 'src/app/models/constants.model';

@Component({
  selector: 'app-new-registration',
  templateUrl: './new-registration.component.html',
  styleUrls: ['./new-registration.component.css']
})
export class NewRegistrationComponent implements OnInit {

  dietaryRestrictions = Constants.dietaryRestrictions;

  family: Family = Constants.FamilyDefaults;

  constructor(private familyService: FamilyService, private router: Router) { }

  ngOnInit(): void {
  }

  onClick(){
    this.familyService.uploadFamily(this.family);
    this.familyService.setCurrentFamily(this.family);
    this.router.navigate(['/appointment']);
  }

  updateRestriction(restriction: string) {
    if(!this.family.allergies.includes(restriction))
      this.family.allergies.push(restriction);
    else
      this.family.allergies.splice(this.family.allergies.indexOf(restriction), 1);
  }

}
