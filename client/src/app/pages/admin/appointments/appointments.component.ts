import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';
import { Family } from 'src/app/models/family.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { FamilyService } from 'src/app/services/family.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppointmentsComponent implements OnInit {

  appointment: Appointment = {} as Appointment;
  times: string[] = [];
  families = new Map<string, Family[]>();

  appointmentString: string = "";

  loading = false;

  constructor(private appointmentService: AppointmentService, 
              private familyService: FamilyService,
              private ref: ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  async getAppointments() {
    this.loading = true;
    this.times = [];
    this.families.clear();
    this.appointment = await this.appointmentService.updateAppointment(this.appointmentString);
    for await(var slot of this.appointment.timeslots) {
      this.times.push(slot.time);
      var familyArray: Family[] = []
      for await(var phoneNumber of slot.phoneNumber) {
        if(phoneNumber != null) {
          var family = await this.familyService.pullFamily(phoneNumber);
          familyArray.push(family);
        }
      }
      this.families.set(slot.time, familyArray);
    }
    this.times.sort(this.sortTimes);
    this.ref.markForCheck();
    console.log(this.times);
    this.loading = false;
  }

  sortTimes(a: string, b: string) {
    var hourA = parseInt(a.split(':')[0]);
    var hourB = parseInt(b.split(':')[0]);

    var minuteA = parseInt(a.split(':')[1]);
    var minuteB = parseInt(b.split(':')[1]);

    if(hourA == hourB) {
      if(minuteA == minuteB) {
        return 0;
      }
      return minuteA < minuteB ? -1 : 1;
    }
    return hourA < hourB ? -1 : 1;
  }

}
