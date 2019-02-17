import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare let paypal: any;

@Component({
  selector: 'app-default-paypal',
  templateUrl: './default-paypal.component.html',
  styleUrls: ['./default-paypal.component.scss']
})
export class DefaultPaypalComponent implements AfterViewChecked {

  addScript = false;
  finalAmount = 1;
  paypalLoad = false;

    paypalConfig = {
      env: 'sandbox',
      style: {
        layout: 'vertical',  // horizontal | vertical
        size:   'medium',    // medium | large | responsive
        shape:  'rect',      // pill | rect
        color:  'gold'       // gold | blue | silver | black
            },
      client: {
        sandbox: 'AaGg81uWtXapD7Atz4uLGqpRZuQfw7dMlfco43fPxYAQrwVbVsHojatlBgZS2OagQ_d4wPULWcBI5U5U'  // sandbox ID
      },
      payment: (data, actions) => {
        return actions.payment.create({
            transactions: [
              { amount: { total: this.finalAmount, currency: 'USD'}}
            ]
        });
      },
      onAuthorize: (data, actions) => {
        return actions.payment.execute().then((payment) => {
          // 이곳은 payment가 성공하고난 후 에 redirect 할곳을 지정한다
        });
      }
    }

    ngAfterViewChecked(): void {

      if ( !this.addScript ) {
        this.addPaypalScript().then(() => {
            paypal.Button.render(this.paypalConfig, '#paypal-button-container');
            this.paypalLoad = true;
        });
      }
    }

    addPaypalScript() {
      this.addScript = true;
      return new Promise((resolve, reject) => {

       const scriptTagElement = document.createElement('script');   // <scrip src=""></script>
             scriptTagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
             scriptTagElement.onload = resolve;
             document.body.appendChild(scriptTagElement);
      });
    }
}
