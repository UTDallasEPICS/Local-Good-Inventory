import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Family } from 'src/app/models/family.model';

@Component({
  selector: 'app-families',
  templateUrl: './families.component.html',
  styleUrls: ['./families.component.css']
})
export class FamiliesComponent implements OnInit {

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

  modalVisible = false;
  editMode = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log("OnInit");
    this.http.get<{families: Family[]}>(`http://localhost:3000/family`)
      .subscribe((families) => {
          this.families = families.families;
          this.filteredFamilies = families.families.filter(t=>t);
      });
  }

  updateFilter(): void {

  }

  showModal(number: string): void {
    this.families.forEach((family) => {
      if(family.phoneNumber == number)
        this.selectedFamily = family;
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
        this.http.post(`http://localhost:3000/family?phoneNumber=${this.selectedFamily.phoneNumber}`, this.selectedFamily)
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

  deleteFamily() {
    if(this.selectedFamily.phoneNumber.length == 10) {
      this.http.delete(`http://localhost:3000/family?phoneNumber=${this.selectedFamily.phoneNumber}`)
        .subscribe();
    }
    this.modalVisible = false;
  }

}
