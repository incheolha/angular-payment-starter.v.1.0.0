
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';

import { AppComponent } from './app.component';
import { DefaultPaypalComponent } from './payment/paypal/default-paypal/default-paypal.component';
import { DefaultStripeComponent } from './payment/stripe/default-stripe/default-stripe.component';
import { CustomStripeComponent } from './payment/stripe/custom-stripe/custom-stripe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxStripeModule } from 'ngx-stripe';
import { ReactiveStripeComponent } from './payment/stripe/reactive-stripe/reactive-stripe.component';
import { CreditCardDirectivesModule } from 'angular-cc-library';
@NgModule({
  declarations: [
    AppComponent,
    DefaultPaypalComponent,
    DefaultStripeComponent,
    CustomStripeComponent,
    ReactiveStripeComponent
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CreditCardDirectivesModule,
    MDBBootstrapModulesPro.forRoot(),
    NgxStripeModule.forRoot('pk_test_erzDoCmLOPEP1n4tLjvtT7Y2')

   ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    MDBSpinningPreloader
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
