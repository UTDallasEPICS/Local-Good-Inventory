import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CheckinComponent } from './checkin/checkin.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { AppointmentComponent } from './Appointment/appointment.component';
import { Appointment2Component } from './Appointment2/appointment2.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { NewFamilyMemberComponent } from './New-Family-Member/newfamilymember.component';
import { ChangeMemberInfo2Component } from './Change-Member-Info2/changememberinfo2.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    CheckinComponent,
    AppointmentComponent,
    Appointment2Component,
    DatepickerComponent,
    NewFamilyMemberComponent,
    ChangeMemberInfo2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
