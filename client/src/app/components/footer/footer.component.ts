import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear = this.getYear();

  constructor() { }

  ngOnInit(): void {
  }

  getYear(): number {
    var d = new Date(); 
    const year = d.getFullYear(); 
    return year;
  }
}