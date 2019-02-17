
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxStripeModule } from 'ngx-stripe';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { PaypalService } from './payment/paypal/paypal-server-integration/paypal.service';
import { appRoutingComponent, AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
                  appRoutingComponent,
                  AppComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CreditCardDirectivesModule,
    MDBBootstrapModulesPro.forRoot(),
    NgxStripeModule.forRoot('pk_test_erzDoCmLOPEP1n4tLjvtT7Y2'),
    AppRoutingModule
   ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    MDBSpinningPreloader,
    PaypalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
