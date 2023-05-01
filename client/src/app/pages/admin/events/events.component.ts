import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: Event[] = [];

  constructor(private eventService: EventService) {
   }


  async loadEvents() {
    console.log("Loading events");
    this.events = await this.eventService.getFutureEvents();
    console.log(this.events);
  }

  ngOnInit(): void {
    console.log("Events page initialized");
    this.loadEvents();
  }

  async getEvent(id: string) {
    console.log(await this.eventService.retrieveEvent(id));
    console.log(await this.eventService.getFutureEvents());
  }

  updateImage(){
    const fileInput = document.getElementById("image-input") as HTMLInputElement;
    fileInput.addEventListener("change", (event) => {
      const selectedFile = (event.target as HTMLInputElement).files?.[0];
      if (selectedFile) {
        const image = document.getElementById("event-image") as HTMLImageElement;
        const reader = new FileReader();
        reader.onload = (e) => {
          image.src = e.target?.result as string;
        };
        reader.readAsDataURL(selectedFile);
      }
    });
  }

  toggleEdit(){

  }

  toggleButton() {
    var button = document.getElementsByTagName("button")[0];
    var display;
    if (button.innerHTML == "Display") {
      display = true;
      button.innerHTML = "Hide";
      button.style.color = "#ffffff";
      button.style.backgroundColor =  "#9a3b3b";

    } else {
      display = false;
      button.innerHTML = "Display";
      button.style.backgroundColor =  "#28487b";
      button.style.color = "#ffffff";
    }
  }

}
