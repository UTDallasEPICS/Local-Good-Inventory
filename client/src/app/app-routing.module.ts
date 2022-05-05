import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewFamilyMemberComponent } from './pages/New-Family-Member/newfamilymember.component';
import { ChangeMemberInfo1Component } from './pages/Change-Member-Info1/changememberinfo1.component';  
import { ChangeMemberInfo2Component } from './pages/Change-Member-Info2/changememberinfo2.component'; 
import { FamilyOrMemberComponent } from './pages/Family-or-Member/family-or-member.component'; 
import { NewRegistrationComponent } from './pages/new-registration/new-registration.component';
import { CheckinComponent } from './pages/checkin/checkin.component';
import { HomeComponent } from './pages/home/home.component';
import { AppointmentComponent } from './pages/Appointment/appointment.component'; 
import { Appointment2Component } from './pages/Appointment2/appointment2.component'; 
import { ReviewChangesComponent } from './pages/review-changes/change.component';
import { RemoveFamilyMemberComponent } from './pages/Removing-Family-Member/removefamilymember.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'checkin', component:CheckinComponent},
  {path:'review', component: ReviewChangesComponent},
  {path:'appointment', component:AppointmentComponent},
  {path:'familyormember', component:FamilyOrMemberComponent},
  {path:'appointment2', component:Appointment2Component},
  {path:'new-registration', component:NewRegistrationComponent},
  {path:'newfamilymember', component:NewFamilyMemberComponent},
  {path:'removefamilymember', component:RemoveFamilyMemberComponent},
  {path:'changememberinfo1', component:ChangeMemberInfo1Component},
  {path:'changememberinfo2', component:ChangeMemberInfo2Component},
  {path:'new-registration', component:NewRegistrationComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
