import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public pages = [{page: "Families", active: true},
                  {page: "Appointments", active: false},
                  {page: "Stats", active: false},
                  {page: "Events", active: false},
                  {page: "Import", active: false},
                  {page: "Settings", active: false},
                  {page: "Advanced", active: false}];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  setActive(id: number) {
    for(var i = 0; i < this.pages.length; i++) {
      this.pages[i].active = false;
      if(id == i) {
        this.pages[i].active = true;
      }
    }
  }
}
