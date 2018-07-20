
import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { PaymentModel } from './payment.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class PaypalService {

constructor(private http: Http

) {}

  // toefl reading general description 추가 기능
  addPaymentExam(payment: PaymentModel) {

    const body = JSON.stringify(payment);
    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post('http://localhost:3000/paypal/createPayment', body, {headers: headers})
                    .subscribe(data => {
                      const paymentUrl = data.json();
                      console.log(paymentUrl.url);
                      window.location.href = paymentUrl.url;        // 외부에 있는 url 호출시 사용

                    }),

                    (error) => this.handleErrors(error);           // 나중에 이 error는 alert로 처리한다

  }

  handleErrors(error: Response) {
    const err = error.json();
    console.log(err);
    return Observable.throw(err);
  }


}
