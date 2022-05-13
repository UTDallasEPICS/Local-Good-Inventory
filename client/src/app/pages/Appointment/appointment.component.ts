import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  constructor() { }

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
