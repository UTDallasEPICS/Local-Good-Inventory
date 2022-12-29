import { Report } from '../models/report.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private report: Report = {} as Report
  private reportUpdated = new Subject<Report>();

  private accessToken: string = "";

  constructor(private http: HttpClient, private auth: AuthService) {
    auth.getAccessTokenSilently().subscribe(token => {
      this.accessToken = token;
      console.log('Bearer ' + token);
    });
    console.log('Bearer ' + this.accessToken);
  }

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
          `${environment.API_URL}/report?month=${month}&year=${year}`,
          {
            headers: { Authorization: 'Bearer ' + this.accessToken }
          }
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
    this.http.post(
      `${environment.API_URL}/report`, 
      report,
      {
        headers: { Authorization: 'Bearer ' + this.accessToken }
      }).subscribe();
  }
}
