import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckinComponent } from './pages/checkin/checkin.component';
import { HomeComponent } from './pages/home/home.component';
import { AppointmentComponent } from './pages/Appointment/appointment.component'; 
import { Appointment2Component } from './pages/Appointment2/appointment2.component'; 
import { ReviewChangesComponent } from './pages/review-changes/review-changes.component';


const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'checkin', component:CheckinComponent},
  {path: 'review', component: ReviewChangesComponent},
  {path:'Appointment', component:AppointmentComponent},
  {path:'Appointment2', component:Appointment2Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
