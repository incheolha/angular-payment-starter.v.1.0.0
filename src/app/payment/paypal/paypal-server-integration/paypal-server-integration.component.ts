import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PaypalService } from './paypal.service';
import { PaymentModel } from '../../payment.model';

@Component({
  selector: 'app-paypal-server-integration',
  templateUrl: './paypal-server-integration.component.html',
  styleUrls: ['./paypal-server-integration.component.css']
})
export class PaypalServerIntegrationComponent implements OnInit {

  paypalFormGroup: FormGroup;

  constructor(private paypalService: PaypalService) { }

  ngOnInit() {

  this.paypalFormGroup = new FormGroup({
    'amount': new FormControl('', Validators.required)
  });

  }

  onSubmit() {
    console.log('click');

    console.log(this.paypalFormGroup.value);

    const paypalPayment = new PaymentModel(this.paypalFormGroup.value.amount);


    console.log(paypalPayment);
    this.paypalService.addPaymentExam(paypalPayment);

  }
}
