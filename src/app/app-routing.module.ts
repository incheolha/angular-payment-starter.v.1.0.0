import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { DefaultPaypalComponent } from './payment/paypal/default-paypal/default-paypal.component';
import { DefaultStripeComponent } from './payment/stripe/default-stripe/default-stripe.component';
import { CustomStripeComponent } from './payment/stripe/custom-stripe/custom-stripe.component';
import { ReactiveStripeComponent } from './payment/stripe/reactive-stripe/reactive-stripe.component';
import { PaypalServerIntegrationComponent } from './payment/paypal/paypal-server-integration/paypal-server-integration.component';
import { HomeComponent } from './home/home.component';
import { IamporterHomeComponent } from './payment/iamporterKorea/iamporter-home/iamporter-home.component';

const App_Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'paypal', component: DefaultPaypalComponent},
  { path: 'stripe', component: DefaultStripeComponent},
  { path: 'iamporterhome', component: IamporterHomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(App_Routes, {
                                              preloadingStrategy: PreloadAllModules
           })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const appRoutingComponent = [
                                      HomeComponent,
                                      DefaultPaypalComponent,
                                      DefaultStripeComponent,
                                      IamporterHomeComponent,
                                      CustomStripeComponent,
                                      ReactiveStripeComponent,
                                      PaypalServerIntegrationComponent
                                    ];
