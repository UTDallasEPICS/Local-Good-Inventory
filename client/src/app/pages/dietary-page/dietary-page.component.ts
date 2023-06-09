import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FamilyDefaults } from 'src/app/models/constants.model';
import { Family } from 'src/app/models/family.model';
import { FamilyService } from 'src/app/services/family.service';

@Component({
  selector: 'app-dietary-page',
  templateUrl: './dietary-page.component.html',
  styleUrls: ['./dietary-page.component.css']
})
export class DietaryPageComponent implements OnInit {

  icons = {
    'Gluten':'fa-wheat-awn-circle-exclamation',
    'Vegan':'fa-leaf',
    'Vegetarian':'fa-seedling',
    'Kosher': 'fa-hotdog',
    'Diabetes': 'fa-cubes-stacked'
  }

  family: Family = FamilyDefaults;
  private familySubscription: Subscription = new Subscription;

  constructor(public familyService: FamilyService) { }

  ngOnInit() {
    this.family = this.familyService.getCurrentFamily();
    this.familySubscription = this.familyService.getFamilyUpdateListener()
      .subscribe((family: Family) => {
        this.family = family;
      });
  }
  ngOnDestroy() {
    this.familySubscription.unsubscribe();
  }

}
