import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CreditCardValidator } from 'angular-cc-library';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';
import { StripeModel } from '../stripeModel/stripeModel';

import { Http, Headers, Response } from '@angular/http';

@Component({
  selector: 'app-reactive-stripe',
  templateUrl: './reactive-stripe.component.html',
  styleUrls: ['./reactive-stripe.component.scss']
})
export class ReactiveStripeComponent implements OnInit {

  stripeInfo: StripeModel;

  cardNumber: StripeElement;
  cardExpiry: StripeElement;
  cardCvc: StripeElement;

  elements: Elements;

  // optional parameters

  elementOptions: ElementsOptions = {
    locale: 'en'
  };

  stripeForm: FormGroup;

  constructor(private fb: FormBuilder,
              private http: Http,
              private stripeService: StripeService) { }

  ngOnInit() {

    this.stripeForm = this.fb.group({
      cardHolderName: ['', [Validators.required]],
      cardHolderEmail: ['', [Validators.required]],
      cardHolderZip: ['', [Validators.required]]
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

  onStripeSubmit() {
    console.log(this.stripeForm.value);
    
    console.log(this.cardNumber);
    console.log(this.cardExpiry);
    console.log(this.cardCvc);
  
    this.stripeService
                      .createToken(this.cardNumber, { name })
                      .subscribe(result => {
                        if ( result.token ) {
                            console.log(result.token.id);
                            const token = result.token.id;
                              
                                    this.stripeInfo = new StripeModel(
                                      this.stripeForm.value.cardHolderName,
                                      this.stripeForm.value.cardHolderEmail,
                                      this.stripeForm.value.cardHolderZip,
                                      token
                                    )

                            this.gotoStripeCharge(this.stripeInfo);
                        } else if (result.error) {
                          console.log(result.error.message);
                        }
                      });
  }

  gotoStripeCharge(stripeCardInfo: StripeModel) {

      const body = JSON.stringify(stripeCardInfo);
      
      console.log(body);
    
      const header = new Headers({'Content-Type': 'application/json'});
      this.http.post('http://localhost:3000/stripepayment', body, {headers: header})
           .subscribe(res =>{
                console.log(res);
           }),
           (error => console.error(error));
   }
}