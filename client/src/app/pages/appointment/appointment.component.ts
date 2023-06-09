import { Component, OnInit } from '@angular/core';
import { Family } from 'src/app/models/family.model';
import { FamilyService } from 'src/app/services/family.service';
import { Settings } from 'src/app/models/settings.model';
import { SettingsService } from 'src/app/services/settings.service';
import { Subscription } from 'rxjs';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/models/appointment.model';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { FamilyDefaults } from 'src/app/models/constants.model';

@Component({
  selector: 'appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {
  popup = document.getElementById("popup");

  family: Family = FamilyDefaults;
  settings: Settings = {} as Settings;
  appointment: Appointment = {} as Appointment;
  private settingsSubscription: Subscription = new Subscription();
  familySubscription: Subscription = new Subscription();
  nextAppointment: string = '';
  nextAppointmentTime: string = '';
  selectedTime: string = '';

  availableTimes: string[] = [];

  constructor(
    public familyService: FamilyService,
    private settingsService: SettingsService,
    private appointmentService: AppointmentService,
    private eventService: EventService,
    private router: Router
  ) {}

  isDisplay = false;
  clicked = false;

  toggle() {
    this.isDisplay = true;
    this.clicked = true;
  }

  ngOnInit(): void {
    this.popup = document.getElementById("popup");
    
    this.settings = this.settingsService.getSettings();
    this.settingsService.updateSettings();
    this.settingsSubscription = this.settingsService
      .getSettingsUpdateListener()
      .subscribe((settings: Settings) => {
        this.settings = settings;
      });

    this.family = this.familyService.getCurrentFamily();
    this.familySubscription = this.familyService
      .getFamilyUpdateListener()
      .subscribe((family: Family) => {
        this.family = family;
      });
  }

  buttonDisplay() {
    this.selectedTime = '';
    var dateSelected = new Date(this.nextAppointment);
    this.availableTimes = [];
    var dateNumSelected = dateSelected.getDay() + 1;

    if(dateNumSelected > 6) dateNumSelected = 0;
    var settingsDate = this.settings.dates[dateNumSelected];
    if(settingsDate.active && !this.settings.blockOuts.includes(this.nextAppointment)) {
      var startTime = parseInt(settingsDate.startTime.split(':')[0]) * 60 + 
                      parseInt(settingsDate.startTime.split(':')[1]);
      var endTime = parseInt(settingsDate.endTime.split(':')[0]) * 60 + 
                    parseInt(settingsDate.endTime.split(':')[1]);

      this.appointmentService.updateAppointment(this.nextAppointment).then((res) => {
        this.appointment = res
        
        var full;
        for(var i = startTime; i <= endTime; i+= this.settings.interval) {
          full = false;
          this.appointment.timeslots.forEach(slot => { // Check if the timeslot that's being pushed has met maximum capacity
            if(slot.time == `${Math.floor(i / 60)}:${(i % 60) == 0 ? "00" : i % 60}` && slot.quantity >= this.settings.quantity)
            full = true;
          });

          if(!full)
            this.availableTimes.push(`${Math.floor(i / 60)}:${(i % 60) == 0 ? "00" : i % 60}`);
        }
      });
      
    }
    
  }

  selectTime(time: string) {
    this.selectedTime = time;
    if(time.length < 5)
      time = "0" + time;
    this.nextAppointmentTime = `T${time}`;

    var slotExists = false;
    this.appointment.timeslots.forEach(slot => {
      if(slot.time == time) {
        slot.quantity++;
        slot.phoneNumber.push(this.family.phoneNumber);
        slotExists = true;
      }
    });

    if(!slotExists) {
      this.appointment.timeslots.push({
        time: time,
        quantity: 1,
        phoneNumber: [this.family.phoneNumber]
      })
    }


    this.appointment.eventID=this.eventService.getCurrentEvent().id; //update event_id
    if(this.appointment.eventID == null)
      this.appointment.eventID = "000000000000000000000000";
  }


  updateAppointment() {
    if(this.nextAppointment.length > 0 && this.nextAppointmentTime.length > 0) {
      this.family = this.familyService.getCurrentFamily();
      this.familyService.bookAppointment(this.family.phoneNumber, this.appointment.eventID, this.nextAppointment + this.nextAppointmentTime);
      this.appointmentService.postAppointment(this.appointment);
      window.alert(`Appointment successfully booked for ${this.nextAppointment} at ${this.nextAppointmentTime}`);
      this.router.navigate(['/dietary-page']);
    } else {
      window.alert("Please select a date and time for your appointment.");
    }
  }

  openPopup(){
    document.getElementById("popup")?.classList.toggle("open-popup");
  }

}

