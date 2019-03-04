
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentModel } from './payment.model';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class PaymentService {

  public impNumber = new Subject<number>();

constructor(private http: HttpClient) {}

  // toefl reading general description 추가 기능
  createIamportPayment() {

    const sample = 'this is a sample';

    return this.http.post<{ msg: string }>('http://localhost:3000/iamport/createPayment', sample)
                    .subscribe(data => {
                      const paymentMsg = data.msg;
                      console.log(paymentMsg);
                    }),
                    (error) => console.log(error);           // 나중에 이 error는 alert로 처리한다

  }

  paymentListener() {
    return this.impNumber.asObservable();
  }

}
