import { Report } from '../models/report.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private report: Report = {

  } as Report
  private reportUpdated = new Subject<Report>();

  constructor(private http: HttpClient) {}

  getReport() {
    return { ...this.report };
  }

  getReportUpdateListener() {
    return this.reportUpdated.asObservable();
  }

  updateReport(month: number, year: number) {
    const promiseToken = new Promise((resolve, reject) => {
      this.http
        .get<{ report: Report }>(
          `http://localhost:3000/report?month=${month}&year=${year}`
        )
        .subscribe((report) => {
          this.report = report.report;
          this.reportUpdated.next({ ...this.report });
          resolve(report.report);
        });
    });
    console.log('Updated appointments');
    //console.log(this.settings);
    return promiseToken;
  }

  postReport(report: Report) {
    this.http.post(`http://localhost:3000/report`, report).subscribe();
  }
}
