import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {

  }

  goStripe() {

    this.router.navigate(['/stripe']);

  }

  goPayPal() {
    this.router.navigate(['/paypal']);
  }

  goIamporter() {
    this.router.navigate(['/iamporterhome']);
  }
}
