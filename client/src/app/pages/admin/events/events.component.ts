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

  async getEvent(id: string) {
    console.log(await this.eventService.retrieveEvent(id));
    console.log(await this.eventService.getFutureEvents());
  }

  updateImage(){

  }

  toggleEdit(){

  }

}
