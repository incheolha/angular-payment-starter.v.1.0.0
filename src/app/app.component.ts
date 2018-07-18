import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  mainNavHide = false;
  val = 0;

  constructor() { }

  ngOnInit() {}

}
