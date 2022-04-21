import { Component, OnInit } from '@angular/core';
import { FamilyService } from 'src/app/services/family.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


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

  constructor(public familyService: FamilyService, private router: Router) { }

  ngOnInit(): void {
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

  onFormSubmit(form: NgForm) {  
    this.isValidFormSubmitted = false;  
    if (form.invalid) {  
      return;  
    }  
    this.isValidFormSubmitted = true;  
    this.familyService.updateFamily(this.user.mobileNumber);
    
    form.resetForm(); 

    this.router.navigate(['/review']);
 }
   
}

export class User {  
  mobileNumber: string = "";  
 }  
