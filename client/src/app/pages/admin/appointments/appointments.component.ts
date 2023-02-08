import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';
import { Family } from 'src/app/models/family.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { FamilyService } from 'src/app/services/family.service';
import { FamilyOrMemberComponent } from '../../Family-or-Member/family-or-member.component';

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
        var family = await this.familyService.pullFamily(phoneNumber);
        familyArray.push(family);
      }
      this.families.set(slot.time, familyArray);
    }
    this.times.sort();
    this.ref.markForCheck();
    this.loading = false;
  }

}
