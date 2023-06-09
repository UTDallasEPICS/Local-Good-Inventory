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
    if(confirm("Are you sure you wish to delete ALL appointments for ALL families?")) {
      if(confirm("Are you sure? This will delete all past and future appointments, including ones that have been checked into.\n\nNOTE: This will currently not reset the monthly reports.")) {
        this.appointmentService.deleteAllAppointments();
        window.alert("All appointments sucessfully deleted.");
      }
    }
  }

}
