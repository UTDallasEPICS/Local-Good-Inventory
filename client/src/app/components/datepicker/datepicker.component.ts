import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  @Input() selectedDates: string[] = [];
  @Output() selectedDatesChange = new EventEmitter();

  @Input() selectedDate: string = "";
  @Output() selectedDateChange = new EventEmitter();

  @Input() multiSelect: boolean = false;

  today: Date = new Date();
  pipe = new DatePipe('en-US');
  
  selectedMonth = this.today.getMonth();
  selectedYear = this.today.getFullYear();
  
  dates = Array(this.daysInMonth(this.selectedMonth, this.today.getFullYear())).fill(0).map((x,i)=>i+1);
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  constructor() { }
  
  ngOnInit(): void {
    for(var i = 0; i < this.firstDayOfMonth(); i++) {
      this.dates.unshift(0);
    }
  }

  changeMonth(month: number) {
    if(month == 13) {
      this.selectedYear++;
      month = 1;
    } else if(month == 0) {
      this.selectedYear--;
      month = 12;
    }
    this.selectedMonth = month;
    this.dates = Array(this.daysInMonth(this.selectedMonth, this.selectedYear)).fill(0).map((x,i)=>i+1);
    for(var i = 0; i < this.firstDayOfMonth(); i++) {
      this.dates.unshift(0);
    }
  }

  daysInMonth (month: number, year: number): number {
    return new Date(year, month, 0).getDate();
  }

  firstDayOfMonth(): number {
    return new Date(this.selectedYear, this.selectedMonth - 1, 1).getDay();
  }

  dateSelected(date: number) {
    let dateString = this.pipe.transform(new Date(this.selectedYear, this.selectedMonth - 1, date).toDateString(), 'YYYY-MM-dd');
    if(dateString) {
      if(this.multiSelect)
        return this.selectedDates.includes(dateString);
      return this.selectedDate == dateString;
    }
    return false;
  }

  selectDate(date: number) {
    let dateString = this.pipe.transform(new Date(this.selectedYear, this.selectedMonth - 1, date).toDateString(), 'YYYY-MM-dd');
    if(dateString != null) {
      if(this.multiSelect) {
        if(this.dateSelected(date)) {
          this.selectedDates.splice(this.selectedDates.indexOf(dateString), 1);
        } else {
          this.selectedDates.push(dateString);
        }
      } else if(this.dateSelected(date)) {
        this.selectedDate = "";
      } else {
        this.selectedDate = dateString;
      }
    }
    this.selectedDateChange.emit(this.selectedDate);
    this.selectedDatesChange.emit(this.selectedDates);
  }

  
}
