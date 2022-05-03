import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewFamilyMemberComponent } from './New-Family-Member/newfamilymember.component';
import { ChangeMemberInfo1Component } from './Change-Member-Info1/changememberinfo1.component';  
import { ChangeMemberInfo2Component } from './Change-Member-Info2/changememberinfo2.component'; 
import { FamilyOrMemberComponent } from './Family-or-Member/family-or-member.component'; 
import { NewRegistrationComponent } from './new-registration/new-registration.component';
import { CheckinComponent } from './pages/checkin/checkin.component';
import { HomeComponent } from './pages/home/home.component';
import { AppointmentComponent } from './pages/Appointment/appointment.component'; 
import { Appointment2Component } from './pages/Appointment2/appointment2.component'; 
import { ReviewChangesComponent } from './pages/review-changes/change.component';


const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'checkin', component:CheckinComponent},
  {path: 'review', component: ReviewChangesComponent},
  {path:'Appointment', component:AppointmentComponent},
  {path:'Appointment2', component:Appointment2Component},
  {path:'New-Family-Member', component:NewFamilyMemberComponent},
  {path:'Change-Member-Info2', component:ChangeMemberInfo2Component},
  {path:'Change-Member-Info1', component:ChangeMemberInfo1Component},
  {path:'Family-or-Member', component:FamilyOrMemberComponent},
  {path:'new-registration', component:NewRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
