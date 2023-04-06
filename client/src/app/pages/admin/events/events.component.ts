import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
  }

  getEvent(id: string) {
    this.eventService.retrieveEvent(id);
  }

  updateImage(){

  }

  toggleEdit(){

  }

}
