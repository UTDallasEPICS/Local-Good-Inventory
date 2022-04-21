import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReviewChangesComponent } from './pages/review-changes/review-changes.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { CheckinComponent } from './pages/checkin/checkin.component';
import { NgxMaskModule } from 'ngx-mask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { AppointmentComponent } from './pages/Appointment/appointment.component';
import { Appointment2Component } from './pages/Appointment2/appointment2.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ReviewChangesComponent,
    FooterComponent,
    HomeComponent,
    CheckinComponent,
    AppointmentComponent,
    Appointment2Component,
    DatepickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
