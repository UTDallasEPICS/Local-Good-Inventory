import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Settings } from 'src/app/models/settings.model';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  private settingsSubscription: Subscription = new Subscription;

  settings: Settings = {} as Settings;

  days = [
    {day: 'Sun', active: false},
    {day: 'Mon', active: false},
    {day: 'Tue', active: false},
    {day: 'Wed', active: false},
    {day: 'Thu', active: false},
    {day: 'Fri', active: false},
    {day: 'Sat', active: false}
  ];

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settings = this.settingsService.getSettings();
    this.settingsService.updateSettings();
    this.settingsSubscription = this.settingsService.getSettingsUpdateListener()
      .subscribe((settings: Settings) => {
        this.settings = settings;
      });
    this.days.forEach(day => {
      if(this.settings.dates.find(date => date.day == day.day))
        day.active = true;
    });
  }

  updateDays(day: string) {
    let date = this.settings.dates.find(date => date.day == day);
    if(date)
      date.active = !date?.active;
  }

  dateSelected(day: string): boolean {
    let date = this.settings.dates.find(date => date.day == day);
    if(date)
      return date.active
    return false;
  }

  updateSettings() {
    this.settingsService.postSettings(this.settings);
    //window.alert(this.settings.startTime);
    //console.log(this.settings.startTime);
  }

  ngOnDestroy() {
    this.settingsSubscription.unsubscribe();
  }

}
