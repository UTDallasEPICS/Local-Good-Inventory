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

  selectedFamily: Family = {
    name: "", 
    phoneNumber: "", 
    members: [], 
    allergies: [],
    checkedIn: [], 
    nextAppointment: "",
    color: ""
  };

  nextAppointmentFormatted: Date = new Date();

  modalVisible = false;
  editMode = false;
  restrictionsVisble = false;

  private accessToken: string = "";

  constructor(private http: HttpClient, private auth: AuthService) { 
    auth.getAccessTokenSilently().subscribe(token => {
      this.accessToken = token;
      console.log('Bearer ' + token);
    })
  }

  ngOnInit(): void {
    console.log("OnInit");
    this.auth.getAccessTokenSilently().subscribe(token => {
      this.http.get<{families: Family[]}>(
        `${environment.API_URL}/family`,
        {
          headers: { Authorization: 'Bearer ' + token }
        })
        .subscribe((families) => {
            this.families = families.families;
            this.filteredFamilies = families.families.filter(t=>t);
        });
    })
  }

  updateFilter(): void {

  }

  showModal(number: string): void {
    this.families.forEach((family) => {
      if(family.phoneNumber == number) {
        this.selectedFamily = family;
        this.nextAppointmentFormatted = new Date(this.selectedFamily.nextAppointment);
        
        console.log(this.nextAppointmentFormatted);
      }
    })

    this.modalVisible = true;
  }

  hideModal(): void {
    this.modalVisible = false;
    this.selectedFamily = {
      name: "", 
      phoneNumber: "", 
      members: [], 
      allergies: [],
      checkedIn: [], 
      nextAppointment: "",
      color: ""
    };
    this.editMode = false;
  }

  updateFamily(): void {
    if(this.editMode) {
      if(this.selectedFamily.phoneNumber.length == 10) {
        this.http.post(
          `${environment.API_URL}/family?phoneNumber=${this.selectedFamily.phoneNumber}`, 
          this.selectedFamily,
          {
            headers: { Authorization: 'Bearer ' + this.accessToken }
          })
        .subscribe();
        console.log(this.selectedFamily);
      }
      this.editMode = false;
    } else {
      this.editMode = true;
    }
  }

  updateColor(color: string) {
    this.selectedFamily.color = color;
  }

  updateRestriction(restriction: string) {
    if(!this.selectedFamily.allergies.includes(restriction))
      this.selectedFamily.allergies.push(restriction);
    else
      this.selectedFamily.allergies.splice(this.selectedFamily.allergies.indexOf(restriction), 1);
  }

  deleteFamily() {
    if(this.selectedFamily.phoneNumber.length == 10) {
      this.http.delete(
        `${environment.API_URL}/family?phoneNumber=${this.selectedFamily.phoneNumber}`,
        {
          headers: { Authorization: 'Bearer ' + this.accessToken }
        })
        .subscribe();
    }
    this.modalVisible = false;
  }

}
