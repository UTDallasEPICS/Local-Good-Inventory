import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  
  popup = document.getElementById("popup");

  events: Event[] = [];

  constructor(private eventService: EventService, private auth: AuthService, private http: HttpClient) {
    console.log("Popup instantiated");
  }
  
  ngOnInit(): void {

    this.popup = document.getElementById("popup");
    this.loadEvents();
  }

  async loadEvents() {
    this.auth.getAccessTokenSilently().subscribe(token => {
      this.http
      .get<{ events: Event[] }>(
        `${environment.API_URL}/event`,
        {
          headers: { Authorization: 'Bearer ' + token }
        }
      )
      .subscribe((res) => {
        this.events = res.events;
        console.log(this.events);
      });
    });
    //this.events = await this.eventService.getFutureEvents();
    console.log("Events loaded");
    console.log(this.events);
  }


  // openPopup(){
      // document.querySelector(".container")!.style.display= "flex";
  //     this.popup!.classList.add("open-popup");
  // } 

  // openPopup(){
  //     document.getElementById("popup")?.classList.toggle("active");
  // }

  closePopup(){
      this.popup!.classList.remove("open-popup");
      document.body.style.backgroundColor = ' transparent ';
  }

  //  const cancelPop = document.getElementById("close");

  //  cancelPop.addEventListener("click", CancelPopOut);

  //  CancelPopOut(e){
  //     e.preventDefault();
  //     document.querySelector(".popup").style.display="none";
  //  }
 

  // popOutNow(e){
  //   e.preventDefault();

  //   document.querySelector
  // }
  
  // const exitPopUP = document.getElementById("popup");
  // document.addEventListener("mouseout", exitPage);

  // exitPage(event: any)
  // {
  //     if (event.clientY < 50)
  //     {
  //         this.popup!.classList.add("open-popup");
  //     }
  // }

 }
