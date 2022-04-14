import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Family } from 'src/app/models/family.model';
import { FamilyService } from 'src/app/services/family.service';

@Component({
  selector: 'app-review-changes',
  templateUrl: './review-changes.component.html',
  styleUrls: ['./review-changes.component.css']
})
export class ReviewChangesComponent implements OnInit {

  family: Family = {name: "", phoneNumber: "", members: []}
  private familySubscription: Subscription = new Subscription;

  constructor(public familyService: FamilyService) { }

  ngOnInit() {
    this.family = this.familyService.getFamily();
    this.familySubscription = this.familyService.getFamilyUpdateListener()
      .subscribe((family: Family) => {
        this.family = family;
      });
    this.familyService.updateFamily("5128391223");
  }

  ngOnDestroy() {
    this.familySubscription.unsubscribe();
  }

}
