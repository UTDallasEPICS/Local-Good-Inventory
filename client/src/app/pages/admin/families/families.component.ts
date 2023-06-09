import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Family } from 'src/app/models/family.model';
import * as Constants from 'src/app/models/constants.model';
import { environment } from 'src/environments/environment';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-families',
  templateUrl: './families.component.html',
  styleUrls: ['./families.component.css']
})
export class FamiliesComponent implements OnInit {

  dietaryRestrictions = Constants.dietaryRestrictions;

  families: Family[] = []

  filteredFamilies: Family[] = [];

  selectedFamily: string = "";

  nextAppointmentFormatted: Date = new Date();

  searchString: string = "";

  modalVisible = false;
  editMode = false;
  restrictionsVisble = false;

  private accessToken: string = "";

  constructor(private http: HttpClient, private auth: AuthService) { 
    auth.getAccessTokenSilently().subscribe(token => {
      this.accessToken = token;
    })
  }

  ngOnInit(): void {
    this.auth.getAccessTokenSilently().subscribe(token => {
      this.http.get<{families: Family[]}>(
        `${environment.API_URL}/family`,
        {
          headers: { Authorization: 'Bearer ' + token }
        })
        .subscribe((families) => {
            this.families = families.families;
            this.filteredFamilies = families.families.filter(t=>t);
            this.filteredFamilies.sort(this.sortFamilies);
        });
    })
  }

  filterFamilies(value: string) {
    value = value.toLowerCase();
    this.filteredFamilies = this.families.filter((family) => `${family.firstName} ${family.lastName} ${family.color} ${family.phoneNumber}`.toLowerCase().includes(value));
    this.filteredFamilies.sort(this.sortFamilies);
  }

  sortFamilies(a: Family, b: Family) {
    var colorA = a.color;
    var colorB = b.color;

    var firstNameA = a.firstName;
    var firstNameB = b.firstName;

    if(colorA == colorB) {
      if(firstNameA == firstNameB) {
        return 0;
      }
      return firstNameA < firstNameB ? -1 : 1;
    }
    return colorA < colorB ? 1 : -1;
  }

  updateFilter(): void {

  }

  getLocalDateString(date: string): string {
    return date.length >=10 ? new Date(Date.parse(date)).toLocaleString() : "None"
  }

  showModal(number: string): void {
    this.selectedFamily = number;
    this.modalVisible = true;
  }

  hideModal(): void {
    this.modalVisible = false;
    this.selectedFamily = "";
  }

}
