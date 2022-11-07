import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  breakfastCount = 0;
  lunchCount = 0;
  dinnerCount = 0;
  supplementalSnackCount = 0;
  totalDaysDistributed = 8;
  totalHouseholdsServed = 49;
  totalIndividualsServed = 97;
  totalNewHouseholdsServed = 12;
  totalClientsUnder17 = 107;
  totalClients18to59 = 126;
  totalClients60andOver = 25;
  percentFoodUsedFromNFTB = 90;

  constructor() { }

  ngOnInit(): void {
  }

}
