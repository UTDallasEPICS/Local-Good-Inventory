import { Component, OnInit } from '@angular/core';
import { Family } from 'src/app/models/family.model';
import { FamilyService } from 'src/app/services/family.service';
import { Settings } from 'src/app/models/settings.model';
import { SettingsService } from 'src/app/services/settings.service';
import { Subscription } from 'rxjs';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/models/appointment.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {
  popup = document.getElementById("popup");

  family: Family = {} as Family;
  settings: Settings = {} as Settings;
  appointment: Appointment = {} as Appointment;
  private settingsSubscription: Subscription = new Subscription();
  familySubscription: Subscription = new Subscription();
  nextAppointment: string = '';
  nextAppointmentTime: string = 'T10:00';
  selectedTime: string = '';

  availableTimes: string[] = [];

  constructor(
    public familyService: FamilyService,
    private settingsService: SettingsService,
    private appointmentService: AppointmentService,
    private eventService: EventService
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

    this.family = this.familyService.getFamily();
    this.familySubscription = this.familyService
      .getFamilyUpdateListener()
      .subscribe((family: Family) => {
        this.family = family;
      });
  }
  //make appointment time show up on front end
  //date string to date obj

  //day of week from day obj
  //output start and end time for that specific date && week of the settings obj
  buttonDisplay() {
    this.selectedTime = '';
    var dateSelected = new Date(this.nextAppointment);
    this.availableTimes = [];
    var dateNumSelected = dateSelected.getDay() + 1;
    //console.log(`Datenumselected: ${dateNumSelected}`)
    if(dateNumSelected > 6) dateNumSelected = 0;
    var settingsDate = this.settings.dates[dateNumSelected];
    if(settingsDate.active && !this.settings.blockOuts.includes(this.nextAppointment)) {
      var startTime = parseInt(settingsDate.startTime.split(':')[0]) * 60 + 
                      parseInt(settingsDate.startTime.split(':')[1]);
      var endTime = parseInt(settingsDate.endTime.split(':')[0]) * 60 + 
                    parseInt(settingsDate.endTime.split(':')[1]);
      //console.log(`Start time: ${startTime} End time: ${settingsDate.endTime}`)
      //console.log("Appointment Object: ")
      this.appointmentService.updateAppointment(this.nextAppointment).then((res) => {
        this.appointment = res
        //console.log(this.appointment);
        
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

    //console.log(this.availableTimes);
    
  }

  selectTime(time: string) {
    this.selectedTime = time;
    this.nextAppointmentTime = `T${time}`;

    var slotExists = false;
    //console.log("APPOINTMENT OBJECT ON TIME SELECTION");
    //console.log(this.appointment.timeslots);
    //console.log(this.appointment.timeslots.length);
    this.appointment.timeslots.forEach(slot => {
      //console.log(`SLOT TIME: ${slot.time}`);
      if(slot.time == time) {
        console.log("FOUND A MATCH");
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


    this.appointment.event_id=this.eventService.getEvent().id; //update event_id
    if(this.appointment.event_id == null)
      this.appointment.event_id = "000000000000000000000000";
    //console.log(`TIME SELECTED OBJECT: ${slotExists}\nTime: ${time}\nPhone Number ${this.family.phoneNumber}`);
    //console.log(this.appointment);
  }


  updateAppointment() {
    this.family = this.familyService.getFamily();
    if(Array.isArray(this.family.appointments)) {
      this.family.appointments.push({id: this.eventService.getEvent().id , date: this.nextAppointment + this.nextAppointmentTime, checkedIn: false});
    } else {
      this.family.appointments = [{id: "000000000000000000000000", date: this.family.appointments, checkedIn: false}];
      this.family.appointments.push({id: this.eventService.getEvent().id , date: this.nextAppointment + this.nextAppointmentTime, checkedIn: false});
    }
    this.familyService.postFamily(this.family);
    this.appointmentService.postAppointment(this.appointment);
    window.alert('Appointment successfully booked for ' + this.family.appointments[this.family.appointments.length-1].date.replace('T', " at "));
  }

  openPopup(){
    // this.popup!.classList.add("open-popup");
    document.getElementById("popup")?.classList.toggle("open-popup");
    // document.body.style.height = '100%';
// document.body.style.width = '100%';
// document.documentElement.style.height = '100%';
// document.documentElement.style.width = '100%';
    // document.getElementById("popup")?.classList.toggle("open-background");
    // document.getElementById("popup")?.classList.toggle("active");
  }

  // closePopup(){
  //     this.popup!.classList.remove("open-popup");
  // }

}

