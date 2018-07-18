import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CreditCardValidator } from 'angular-cc-library';

import { StripeService, Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';

@Component({
  selector: 'app-reactive-stripe',
  templateUrl: './reactive-stripe.component.html',
  styleUrls: ['./reactive-stripe.component.scss']
})
export class ReactiveStripeComponent implements OnInit {

   
  myForm: FormGroup;
  monthSelect : Array<any>;
  yearSelect : Array<any>;
  colorSelect : Array<any>;
 
  constructor(private fb: FormBuilder,
              private stripeService: StripeService) { }

  ngOnInit() {

    this.monthSelect = [
      {value: 1, label: '01'},
      {value: 2, label: '02'},
      {value: 3, label: '03'},
      {value: 4, label: '04'},
      {value: 5, label: '05'},
      {value: 6, label: '06'},
      {value: 7, label: '07'},
      {value: 8, label: '08'},
      {value: 9, label: '09'},
      {value: 10, label: '10'},
      {value: 11, label: '11'},
      {value: 12, label: '12'}
    ];
    this.yearSelect = [
      {value: 2018, label: 2018},
      {value: 2019, label: 2019},
      {value: 2020, label: 2020},
      {value: 2021, label: 2021},
      {value: 2022, label: 2022},
      {value: 2023, label: 2023},
      {value: 2024, label: 2024},
      {value: 2025, label: 2025},

    ];


  this.myForm = this.fb.group({
    'paymentCardNumber' : ['', [<any>CreditCardValidator.validateCCNumber]],
    'paymentCardExpiredMonth' : ['', Validators.required],
    'paymentCardExpiredYear' : ['', Validators.required],
    'paymentCardCVCNumber' : ['', [<any>Validators.required, <any>Validators.minLength(3), <any>Validators.maxLength(4)]]
  });

  }
  onStripeSubmit(){
    console.log(this.myForm.value);
    const cardNumber = this.myForm.value.paymentCardNumber;
    const cardMonth = this.myForm.value.paymentCardExpiredMonth;
    const cardYear = this.myForm.value.paymentCardExpiredYear;
    const cardCVC = this.myForm.value.paymentCardCVCNumber;
    const name = 'incheol ha';
    this.stripeService
    .createToken(cardNumber, { name })
    .subscribe(result => {
      if ( result.token ) {
          console.log(result.token);
      } else if (result.error) {
        console.log(result.error.message);
      }
    });

  }
}
