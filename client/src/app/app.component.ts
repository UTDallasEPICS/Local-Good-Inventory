import { Component, Inject, ɵflushModuleScopingQueueAsMuchAsPossible } from '@angular/core';
import { Family } from './models/family.model';
import { AuthService } from '@auth0/auth0-angular';
import { ReportService } from './services/report.service';
import { FamilyService } from './services/family.service';
import { SettingsService } from './services/settings.service';
import { AppointmentService } from './services/appointment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public auth: AuthService, 
    private reportService: ReportService, 
    private familyService: FamilyService,
    private settingsService: SettingsService,
    private appointmentService: AppointmentService) {}
}
