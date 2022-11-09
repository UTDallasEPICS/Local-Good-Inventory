import { Component, OnInit } from '@angular/core';
import { FamilyService } from 'src/app/services/family.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
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

  onFormSubmit(form: NgForm) {  
    this.isValidFormSubmitted = false;  
    if (form.invalid) {  
      return;  
    }  
    this.isValidFormSubmitted = true;  
    this.familyService.updateFamily(this.user.mobileNumber).then(response => {
      this.family = this.familyService.getFamily();
      if(this.family.name == "") {
        this.router.navigate(['new-registration'])
      } else {
        var today = new Date();
        console.log(formatDate(today, 'dd-MM-yyyy', 'en-US', 'CST'));
        this.family.checkedIn.push(formatDate(today, 'dd-MM-yyyy', 'en-US', 'CST'));
        //console.log("Updated family: " + this.family.checkedIn);
        this.familyService.postFamily(this.family);
        this.router.navigate(['/review']);
      }
    });
    
    form.resetForm(); 
    
 }
   
}

export class User {  
  mobileNumber: string = "";  
 }  
