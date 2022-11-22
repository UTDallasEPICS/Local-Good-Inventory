import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/models/report.model';
import { ReportService } from 'src/app/services/report.service';

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

  report: Report = {
    month: 0,
    year: 0,
    daysDistributed: 0,
    households: 0,
    individualHouseholds: 0,
    newHouseholds: 0,
    numberOfClients: 0,
    numberOfYouth: 0,
    numberOfSeniors: 0
}

  today: Date = new Date();
  selectedMonth = this.today.getMonth() + 1;
  selectedYear = this.today.getFullYear();

  constructor(private reportsService: ReportService) { }

  ngOnInit(): void {
    this.reportsService.updateReport(this.selectedMonth, this.selectedYear).then((report) => {
      console.log(report);
      this.report = report as Report;
    });
  }

  updateReport(month: number, year: number) {
    console.log(`Month: ${month}, year: ${year}`);
    this.reportsService.updateReport(this.selectedMonth, this.selectedYear).then((report) => {
      if(report == null) {
        report = {
          month: 0,
          year: 0,
          daysDistributed: 0,
          households: 0,
          individualHouseholds: 0,
          newHouseholds: 0,
          numberOfClients: 0,
          numberOfYouth: 0,
          numberOfSeniors: 0
        }
      }
      this.report = report as Report;
    });
  }

}
