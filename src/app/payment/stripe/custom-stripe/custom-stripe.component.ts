import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { StripeService, Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';

@Component({
  selector: 'app-custom-stripe',
  templateUrl: './custom-stripe.component.html',
  styleUrls: ['./custom-stripe.component.scss']
})
export class CustomStripeComponent implements OnInit {

  cardNumber: StripeElement;
  cardExpiry: StripeElement;

  cardCvc: StripeElement;

  elements: Elements;
  card: StripeElement;

  // optional parameters

  elementOptions: ElementsOptions = {
    locale: 'es'
  };

  stripeTest: FormGroup;


  constructor(private fb: FormBuilder,
              private stripeService: StripeService) {}

  ngOnInit() {

    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });

    this.stripeService.elements(this.elementOptions)
              .subscribe(elements => {
                this.elements = elements;
                // Only mount the element for the first time

                console.log('현재 stripe elements의 각요소들은..?' + this.elements);

                if (!this.cardNumber) {
                  this.cardNumber = this.elements.create('cardNumber', {}
                  );
                  this.cardNumber.mount('#card-number');
                }

                if (!this.cardExpiry) {
                  this.cardExpiry = this.elements.create('cardExpiry', {}
                  );
                  this.cardExpiry.mount('#card-expiry');
                }

                if (!this.cardCvc) {
                  this.cardCvc = this.elements.create('cardCvc', {}
                  );
                  this.cardCvc.mount('#card-cvc');
                }
              });
  }

  buy() {
    const name = this.stripeTest.get('name').value;

    this.stripeService
                      .createToken(this.cardNumber, { name })
                      .subscribe(result => {
                        if ( result.token ) {
                            console.log(result.token);
                        } else if (result.error) {
                          console.log(result.error.message);
                        }
                      });
  }


}
