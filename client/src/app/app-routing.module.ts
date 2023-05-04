import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewFamilyMemberComponent } from './pages/New-Family-Member/newfamilymember.component';
import { ChangeMemberInfo1Component } from './pages/Change-Member-Info1/changememberinfo1.component';  
import { FamilyOrMemberComponent } from './pages/Family-or-Member/family-or-member.component'; 
import { NewRegistrationComponent } from './pages/new-registration/new-registration.component';
import { CheckinComponent } from './pages/checkin/checkin.component';
import { HomeComponent } from './pages/home/home.component';
import { AppointmentComponent } from './pages/Appointment/appointment.component'; 
import { ReviewChangesComponent } from './pages/review-changes/change.component';
import { RemoveFamilyMemberComponent } from './pages/Removing-Family-Member/removefamilymember.component';
import { CheckinCompleteComponent } from './pages/checkin-complete/checkin-complete.component';
import { DietaryPageComponent } from './pages/dietary-page/dietary-page.component';
import { AdminComponent } from './pages/admin/admin.component';
import {FamilyEditComponent } from './pages/family-edit/family-edit.component';
import { PopupComponent } from './pages/popup/popup.component';

const routes: Routes = [
  {path:'', component: CheckinComponent},
  {path:'checkin', component:CheckinComponent},
  {path:'review', component: ReviewChangesComponent},
  {path:'appointment', component:AppointmentComponent},
  {path:'familyormember', component:FamilyOrMemberComponent},
  {path:'new-registration', component:NewRegistrationComponent},
  {path:'newfamilymember', component:NewFamilyMemberComponent},
  {path:'removefamilymember', component:RemoveFamilyMemberComponent},
  {path:'changememberinfo1', component:ChangeMemberInfo1Component},
  {path:'new-registration', component:NewRegistrationComponent},
  {path:'checkin-complete', component:CheckinCompleteComponent},
  {path: 'dietary-page', component:DietaryPageComponent},
  {path:'admin', component:AdminComponent},
  {path:'popup', component:PopupComponent},
  {path:'family-edit', component:FamilyEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
