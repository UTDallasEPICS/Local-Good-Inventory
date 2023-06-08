import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { SetupService } from 'src/app/services/setup.service';

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.css']
})
export class AdvancedComponent implements OnInit {

  constructor(private setupService: SetupService, 
              private appointmentService: AppointmentService) { }

  ngOnInit(): void {
  }

  setupEvents() {
    this.setupService.setupEvents();
    window.alert("Database Initialized");
  }

  deleteAllAppointments() {
    if(confirm("Are you sure you wish to delete ALL appointments for all families?")) {
      this.appointmentService.deleteAllAppointments();
    }
  }

}
