import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@givaudan-production-angular/api-interfaces';

@Component({
  selector: 'givaudan-production-angular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private http: HttpClient) { }
}
