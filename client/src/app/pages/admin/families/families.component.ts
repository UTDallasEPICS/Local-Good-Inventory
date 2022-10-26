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

  selectedFamily: Family = {
    name: "", 
    phoneNumber: "", 
    members: [], 
    allergies: [],
    checkedIn: [], 
    nextAppointment: ""
  };

  modalVisible = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log("OnInit");
    this.http.get<{families: Family[]}>(`http://localhost:3000/family`)
      .subscribe((families) => {
          this.families = families.families;
      });
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
  }

}
