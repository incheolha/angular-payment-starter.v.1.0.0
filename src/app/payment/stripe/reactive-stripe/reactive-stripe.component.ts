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


  cardNumber: StripeElement;
  cardExpiry: StripeElement;
  cardCvc: StripeElement;

  elements: Elements;

  // optional parameters

  elementOptions: ElementsOptions = {
    locale: 'en'
  };

  myForm: FormGroup;

  constructor(private fb: FormBuilder,
              private stripeService: StripeService) { }

  ngOnInit() {

    this.myForm = this.fb.group({
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

  onStripeSubmit() {
    console.log(this.myForm.value);
    console.log(this.cardNumber);
    this.stripeService
                      .createToken(this.cardNumber, { name })
                      .subscribe(result => {
                        if ( result.token ) {
                            console.log(result.token.id);
                            const token = result.token.id;
                            this.gotoStripeCharge(token);
                        } else if (result.error) {
                          console.log(result.error.message);
                        }
                      });
  }

  gotoStripeCharge(token: string) {

      
      // console.log(token)
      // const headers = new Headers({'token':token, 'amount':100});
      // this.http.post('http://localhost:3000/stripepayment', {}, {headers: headers})
      //   .subscribe(res =>{
      //     console.log(res);
      //   })
      // }
   }
}