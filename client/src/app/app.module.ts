import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReviewChangesComponent } from './pages/review-changes/change.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { CheckinComponent } from './pages/checkin/checkin.component';
import { NgxMaskModule } from 'ngx-mask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { NewRegistrationComponent } from './pages/new-registration/new-registration.component';
import { CommonModule } from '@angular/common';
import { CheckinCompleteComponent } from './pages/events-check-in/checkin-complete.component';
import { DietaryPageComponent } from './pages/dietary-page/dietary-page.component';
import { AdminComponent } from './pages/admin/admin.component';
import { SettingsComponent } from './pages/admin/settings/settings.component';
import { FamiliesComponent } from './pages/admin/families/families.component';
import { StatsComponent } from './pages/admin/stats/stats.component';
import { AppointmentsComponent } from './pages/admin/appointments/appointments.component';
import { ExportComponent } from './pages/admin/export/export.component';
import { EventsComponent } from './pages/admin/events/events.component';
import { FamilyInfoComponent } from './components/family-info/family-info.component';
import { PopupComponent } from './pages/popup/popup.component';
import { AdvancedComponent } from './pages/admin/advanced/advanced.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ReviewChangesComponent,
    FooterComponent,
    HomeComponent,
    CheckinComponent,
    AppointmentComponent,
    DatepickerComponent,
    NewRegistrationComponent,
    CheckinCompleteComponent,
    DietaryPageComponent,
    AdminComponent,
    SettingsComponent,
    FamiliesComponent,
    StatsComponent,
    AppointmentsComponent,
    ExportComponent,
    EventsComponent,
    FamilyInfoComponent,
    PopupComponent,
    AdvancedComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgxMaskModule.forRoot(),
    AuthModule.forRoot({
      domain: environment.AUTH_0_DOMAIN,
      clientId: environment.AUTH_0_CLIENT_ID,
      useRefreshTokens: true,
      cacheLocation: "localstorage",
      audience: environment.API_URL
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
