import { Component, OnInit } from '@angular/core';
import { ToastService } from 'ng-uikit-pro-standard';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PaymentService } from '../../payment.service';
import { PaymentModel } from '../../payment.model';
import * as crypto from 'crypto-js';
import * as $ from 'jquery';

declare var IMP: any;    // Iamporter 결제 모듈로 연결하기 위한 초기작업

@Component({
  selector: 'app-iamporter-home',
  templateUrl: './iamporter-home.component.html',
  styleUrls: ['./iamporter-home.component.scss']
})

export class IamporterHomeComponent implements OnInit {

  tableData: object[] = [
// tslint:disable-next-line: max-line-length
    { first: 'Mark MarkMarkMarkMarkMar' , last: 'Otto', username: '@mdo', email: 'markotto@gmail.com', country: 'USA', city: 'San Francisco' },
    { first: 'Jacob', last: 'Thornton', username: '@fat', email: 'jacobt@gmail.com', country: 'France', city: 'Paris' },
    { first: 'Larry', last: 'the Bird', username: '@twitter', email: 'larrybird@gmail.com', country: 'Germany', city: 'Berlin' },
    { first: 'Paul', last: 'Topolski', username: '@P_Topolski', email: 'ptopolski@gmail.com', country: 'Poland', city: 'Warsaw' },
    { first: 'Anna', last: 'Doe', username: '@andy', email: 'annadoe@gmail.com', country: 'Spain', city: 'Madrid' }
  ];

   statusImporter: any;

  constructor(public toaster: ToastService,
              public router: Router) {}

  ngOnInit() {

  }

  goIamPort() {
   console.log('I am porter button  has been clicked');
      const sample = '주문명:결제테스트';
      const tel = '010-4023-9334';
      this.iamportPayment(sample, tel);
  }

  iamportPayment(sample, tel) {

    console.log(sample);

    IMP.init('imp66601308');
    IMP.request_pay({
        pg: 'inicis',
        pay_method: 'card',
        merchant_uid : 'merchant_' + new Date().getTime(),
        name : sample,
        amount : 1000,
        buyer_email : 'iamport@siot.do',
        buyer_name : '하인철',
        buyer_tel : tel,
        buyer_addr : '경기도 군포시 고산로 643-9',
        buyer_postcode : '158-4',
        m_redirect_url : 'https://www.yourdomain.com/payments/complete'
    }, function(rsp) {
      if ( rsp.success ) {
        $.ajax({
          url: '/iamport/createPayment',
          type: 'post',
          dataType: 'json',
          data: {
                   apply_num : rsp.apply_num,      // 카드승인번호
                   paymentAgency : 'iamport',       // iam port
                   buyer_addr : rsp.buyer_addr,    // 주소
                   buyer_email : rsp.buyer_email,   // 이메일
                   buyer_name : rsp.buyer_name,     // 고객 이름
                   buyer_postcode : rsp.buyer_postcode,
                   buyer_tel : rsp.buyer_tel,
                   card_name : rsp.card_name,         // 카드 이름
                   currency : rsp.currency,
                   imp_uid : rsp.imp_uid,
                   merchant_uid : rsp.merchant_uid,     // 상점 거래ID
                   name : rsp.name,                     // 결제 설명
                   paid_amount : rsp.paid_amount,       // 결제 금액
                   paid_at : rsp.paid_at,               // 결제 장소
                   pay_method : rsp.pay_method,         // 결제 방법
                   pg_provider : rsp.pg_provider,       // 제공업체
                   pg_type : rsp.pg_type,               // 제공 종류
                   status : rsp.status,                 // 결제 형태 (paid / cancel )
                   success : rsp.success,               // 결제 성공여부
                   paidDate: new Date()

                }
        })
        .done( function(data) {
          if ( data.status ) {
            console.log( data.status);
            console.log( data.message );
            const msg = data.message;
// tslint:disable-next-line: max-line-length
            window.location.replace('http://localhost:3000/home/' + '?paymentStatus=' + data.status + '&message=' + data.message);
          } else {

// tslint:disable-next-line: max-line-length
            window.location.replace('http://localhost:3000/home/' + '?paymentStatus=' + data.status + '&message=' + data.message);
          }
        });
      } else {
        const errorMsg = 'Payment has been canceled..';
         window.location.replace('http://localhost:3000/home/' + '?paymentStatus=' + false + '&message=' + errorMsg);
      }
    });
  }
}
