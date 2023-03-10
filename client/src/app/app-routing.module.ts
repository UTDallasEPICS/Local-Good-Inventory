import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewRegistrationComponent } from './pages/new-registration/new-registration.component';
import { CheckinComponent } from './pages/checkin/checkin.component';
import { HomeComponent } from './pages/home/home.component';
import { AppointmentComponent } from './pages/appointment/appointment.component'; 
import { ReviewChangesComponent } from './pages/review-changes/change.component';
import { CheckinCompleteComponent } from './pages/checkin-complete/checkin-complete.component';
import { DietaryPageComponent } from './pages/dietary-page/dietary-page.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  {path:'', component: CheckinComponent},
  {path:'checkin', component:CheckinComponent},
  {path:'review', component: ReviewChangesComponent},
  {path:'appointment', component:AppointmentComponent},
  {path:'new-registration', component:NewRegistrationComponent},
  {path:'new-registration', component:NewRegistrationComponent},
  {path:'checkin-complete', component:CheckinCompleteComponent},
  {path: 'dietary-page', component:DietaryPageComponent},
  {path:'admin', component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
