import { Component, OnInit } from '@angular/core';
import { FamilyService } from 'src/app/services/family.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  phoneNumber: string = "";

  constructor(public familyService: FamilyService) { }

  ngOnInit(): void {
  }

  updatePhoneNumber() {
    this.familyService.updateFamily(this.phoneNumber);
  }

  
}
