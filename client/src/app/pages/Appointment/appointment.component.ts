import { Component, OnInit } from '@angular/core';
import { FamilyService } from 'src/app/services/family.service';

@Component({
  selector: 'appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  constructor(public famiyService: FamilyService) { }

  isDisplay = false;
  clicked = false;

  toggle()
  {
    this.isDisplay = true;
    this.clicked = true;
  }

  ngOnInit(): void {
  }

  
}
