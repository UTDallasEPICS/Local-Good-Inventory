import { Component, OnInit } from '@angular/core';
import { Family } from 'src/app/models/family.model';
import { Report } from 'src/app/models/report.model';
import { FamilyService } from 'src/app/services/family.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  selectedField: string = "";

  familyList: {family: Family, date: string}[] = [];

  report: Report = {
    month: 0,
    year: 0,
    daysDistributed: 0,
    households: 0,
    householdsList: [],
    individualHouseholds: 0,
    individualHouseholdsList: [],
    newHouseholds: 0,
    newHouseholdsList: [],
    numberOfClients: 0,
    clientsList: [],
    numberOfYouth: 0,
    youthList: [],
    numberOfSeniors: 0,
    seniorsList: []
}

  today: Date = new Date();
  selectedMonth = this.today.getMonth() + 1;
  selectedYear = this.today.getFullYear();

  constructor(private reportsService: ReportService,
              private familyService: FamilyService) { }

  ngOnInit(): void {
    this.reportsService.updateReport(this.selectedMonth, this.selectedYear).then((report) => {
      this.report = report as Report;
    });
  }

  updateReport(month: number, year: number) {
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

  async loadFamilies(list: {phone: string, date: string}[]) {
    this.familyList = [];
    list.forEach(async x => {
      this.familyList.push({family: await this.familyService.getFamily(x.phone), date: x.date});
    });
  }

  async select(field: string) {
    if(this.selectedField == field) {
      this.selectedField = ""
    } else {
      this.selectedField = field;
    }

    switch(this.selectedField) {
      case 'individualHouseholds':
        await this.loadFamilies(this.report.individualHouseholdsList); break;
      case 'households':
        await this.loadFamilies(this.report.householdsList); break;
      case 'newHouseholds':
        await this.loadFamilies(this.report.newHouseholdsList); break;
      case 'numberOfSeniors':
        await this.loadFamilies(this.report.seniorsList); break;
      case 'numberOfYouth':
        await this.loadFamilies(this.report.youthList); break;
      case 'numberOfClients':
        await this.loadFamilies(this.report.clientsList); break;
    }

  }

}
