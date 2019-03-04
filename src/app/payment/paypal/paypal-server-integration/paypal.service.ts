
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentModel } from '../../payment.model';


@Injectable()
export class PaypalService {

constructor(private http: HttpClient) {}

  // toefl reading general description 추가 기능
  addPaymentExam(payment: PaymentModel) {

    return this.http.post<{ url: string }>('http://localhost:3000/paypal/createPayment', payment)
                    .subscribe(data => {
                      const paymentUrl = data.url;
                      console.log(paymentUrl);
                      window.location.href = paymentUrl;        // 외부에 있는 url 호출시 사용

                    }),

                    (error) => console.log(error);           // 나중에 이 error는 alert로 처리한다

  }


}
