import { Component, OnInit } from '@angular/core';
import { FamilyService } from 'src/app/services/family.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Family } from 'src/app/models/family.model';


@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  phoneNumber: string = "";


  mobNumberPattern = "^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$";  
  isValidFormSubmitted = false;  
  user = new User();
  family: Family = {} as Family;

  constructor(public familyService: FamilyService, private router: Router) { }

  ngOnInit(): void {
    this.user.mobileNumber = "";
  }

  OnlyNumbersAllowed(event: { which: any; keyCode: any; }):boolean
   {
    const charCode = (event.which)?event.which: event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode >57))
    {
      console.log('charCode restricted is' + charCode);
      return false;
    }

    return true;
  }

  async onFormSubmit(form: NgForm) {  
    this.isValidFormSubmitted = false;  
    if (form.invalid) {  
      return;  
    }  
    this.isValidFormSubmitted = true;
    this.familyService.loadFamily(this.user.mobileNumber);  
    this.family = await this.familyService.getFamily(this.user.mobileNumber);
    if(this.family.lastName == "") {
      this.router.navigate(['new-registration'])
    } else {
      this.router.navigate(['/events-check-in']);
    }
    
    form.resetForm(); 
    
 }
   
}

export class User {  
  mobileNumber: string = "";  
 }  
