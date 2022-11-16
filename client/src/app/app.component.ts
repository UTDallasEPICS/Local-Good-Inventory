import { Component, Inject, ɵflushModuleScopingQueueAsMuchAsPossible } from '@angular/core';
import { Family } from './models/family.model';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
