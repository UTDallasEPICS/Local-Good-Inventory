import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReviewChangesComponent } from './pages/review-changes/review-changes.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CheckinComponent } from './checkin/checkin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ReviewChangesComponent,
    FooterComponent,
    HomeComponent,
    CheckinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
