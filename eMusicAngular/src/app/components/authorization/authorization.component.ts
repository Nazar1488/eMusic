import { Component, OnInit } from '@angular/core';
import { BackgroundService } from 'src/app/services';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  constructor(private backgroundService: BackgroundService) { }

  ngOnInit() {
  }

}
