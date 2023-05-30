import { Component, OnInit } from '@angular/core';
import { SetupService } from 'src/app/services/setup.service';

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.css']
})
export class AdvancedComponent implements OnInit {

  constructor(private setupService: SetupService) { }

  ngOnInit(): void {
  }

  setupEvents() {
    this.setupService.setupEvents();
    window.alert("Database Initialized");
  }

}
