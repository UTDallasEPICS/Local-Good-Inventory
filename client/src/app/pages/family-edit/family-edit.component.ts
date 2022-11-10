import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Family } from 'src/app/models/family.model';
import { FamilyService } from 'src/app/services/family.service';

@Component({
  selector: 'app-family-edit',
  templateUrl: './family-edit.component.html',
  styleUrls: ['./family-edit.component.css']
})
export class FamilyEditComponent implements OnInit {

    family: Family = {name: "", phoneNumber: "", members: [], allergies: [], checkedIn: [], nextAppointment: "" };
    private familySubscription: Subscription = new Subscription;
  
    constructor(public familyService: FamilyService) { }
  
    ngOnInit() {
      //this.family = this.familyService.getFamily();
      this.familySubscription = this.familyService.getFamilyUpdateListener()
        .subscribe((family: Family) => {
          //this.family = family;
        });
    }
    ngOnDestroy() {
      this.familySubscription.unsubscribe();
    }
  
  }
