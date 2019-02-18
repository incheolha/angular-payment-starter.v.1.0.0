import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iamporter-home',
  templateUrl: './iamporter-home.component.html',
  styleUrls: ['./iamporter-home.component.scss']
})
export class IamporterHomeComponent implements OnInit {

  tableData: object[] = [
    { first: 'Mark MarkMarkMarkMarkMarkMarkccccccccccccccccccccc' , last: 'Otto', username: '@mdo', email: 'markotto@gmail.com', country: 'USA', city: 'San Francisco' },
    { first: 'Jacob', last: 'Thornton', username: '@fat', email: 'jacobt@gmail.com', country: 'France', city: 'Paris' },
    { first: 'Larry', last: 'the Bird', username: '@twitter', email: 'larrybird@gmail.com', country: 'Germany', city: 'Berlin' },
    { first: 'Paul', last: 'Topolski', username: '@P_Topolski', email: 'ptopolski@gmail.com', country: 'Poland', city: 'Warsaw' },
    { first: 'Anna', last: 'Doe', username: '@andy', email: 'annadoe@gmail.com', country: 'Spain', city: 'Madrid' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
