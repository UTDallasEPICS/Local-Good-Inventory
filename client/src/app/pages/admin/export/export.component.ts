import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Family } from 'src/app/models/family.model';
import * as Constants from 'src/app/models/constants.model';
import { environment } from 'src/environments/environment';
import { AuthService } from '@auth0/auth0-angular';



@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {
  private accessToken: string = "";

  constructor(private http: HttpClient, private auth: AuthService) {
    auth.getAccessTokenSilently().subscribe(token => {
      this.accessToken = token;
    })
  }

  ngOnInit(): void {}

  onUpload(){

  }


}
