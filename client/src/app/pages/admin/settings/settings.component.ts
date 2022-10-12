import { Component, OnInit } from '@angular/core';
import { Settings } from 'src/app/models/settings.model';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: Settings = {
    dates: [],
    startTime: '',
    endTime: '',
    interval: 0,
    quantity: 0
  }

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settings = this.settingsService.getSettings();
  }

  updateSettings() {
    this.settingsService.postSettings(this.settings);
    window.alert(this.settings.startTime);
    console.log(this.settings.startTime);
  }

}
