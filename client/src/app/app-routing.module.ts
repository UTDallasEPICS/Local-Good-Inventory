import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckinComponent } from './checkin/checkin.component';
import { HomeComponent } from './home/home.component';
import { AppointmentComponent } from './Appointment/appointment.component'; 
import { Appointment2Component } from './Appointment2/appointment2.component'; 
import { NewFamilyMemberComponent } from './New-Family-Member/newfamilymember.component'; 
import { ChangeMemberInfo2Component } from './Change-Member-Info2/changememberinfo2.component'; 
import { NewRegistrationComponent } from './new-registration/new-registration.component';


const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'checkin', component:CheckinComponent},
  {path:'Appointment', component:AppointmentComponent},
  {path:'Appointment2', component:Appointment2Component},
  {path:'New-Family-Member', component:NewFamilyMemberComponent},
  {path:'Change-Member-Info2', component:ChangeMemberInfo2Component},
  {path:'new-registration', component:NewRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
