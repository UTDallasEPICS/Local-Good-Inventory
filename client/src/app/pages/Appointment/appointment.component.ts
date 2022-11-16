import { Component, OnInit } from '@angular/core';
import { Family } from 'src/app/models/family.model';
import { FamilyService } from 'src/app/services/family.service';
import { Settings } from 'src/app/models/settings.model';
import { SettingsService } from 'src/app/services/settings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {
  family: Family = {} as Family;
  settings: Settings = {} as Settings;
  private settingsSubscription: Subscription = new Subscription();
  nextAppointment: string = '';
  nextAppointmentTime: string = 'T10:00';

  constructor(
    public familyService: FamilyService,
    private settingsService: SettingsService
  ) {}

  isDisplay = false;
  clicked = false;

  toggle() {
    this.isDisplay = true;
    this.clicked = true;
  }

  ngOnInit(): void {
    this.settings = this.settingsService.getSettings();
    this.settingsService.updateSettings();
    this.settingsSubscription = this.settingsService
      .getSettingsUpdateListener()
      .subscribe((settings: Settings) => {
        this.settings = settings;
      });
  }
  //make appointment time show up on front end
  //date string to date obj

  //day of week from day obj
  //output start and end time for that specific date && week of the settings obj
  buttonDisplay() {
    window.alert(this.settings);
  }
  updateAppointment() {
    this.family = this.familyService.getFamily();
    this.family.nextAppointment =
      this.nextAppointment + this.nextAppointmentTime;
    this.familyService.postFamily(this.family);
    console.log('Next appointment: ' + this.family.nextAppointment);
  }
}
