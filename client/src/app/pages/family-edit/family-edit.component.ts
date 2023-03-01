import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Family } from 'src/app/models/family.model';
import { FamilyService } from 'src/app/services/family.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import * as Constants from 'src/app/models/constants.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-family-edit',
  templateUrl: './family-edit.component.html',
  styleUrls: ['./family-edit.component.css']
})
export class FamilyEditComponent implements OnInit {

    family: Family = {firstName: "", lastName: "", phoneNumber: "", members: [], allergies: [], checkedIn: [], nextAppointment: "", color:"", minors: 0, adults: 0, seniors: 0};
    private familySubscription: Subscription = new Subscription;

    public restrictionsVisble = false;
    public editMode = false;

    dietaryRestrictions = Constants.dietaryRestrictions;
  
    constructor(public http: HttpClient, public familyService: FamilyService, private router: Router) { }
  
    ngOnInit() {
      this.family = this.familyService.getFamily();
      this.familySubscription = this.familyService.getFamilyUpdateListener()
        .subscribe((family: Family) => {
          this.family = family;
        });
    }
    ngOnDestroy() {
      this.familySubscription.unsubscribe();
    }

    updateFamily(): void {
      if(this.editMode) {
        if(this.family.phoneNumber.length == 10) {
          this.http.post(`http://localhost:3000/family?phoneNumber=${this.family.phoneNumber}`, this.family)
          .subscribe();
        }
        this.editMode = false;
        this.router.navigate(['/appointment']);
      } else {
        this.editMode = true;
      }
    }

    updateRestriction(restriction: string) {
      if(!this.family.allergies.includes(restriction))
        this.family.allergies.push(restriction);
      else
        this.family.allergies.splice(this.family.allergies.indexOf(restriction), 1);
    }
  
  }
