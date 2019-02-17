import { Component, OnInit } from '@angular/core';

declare var IMP: any;
@Component({
  selector: 'app-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.scss']
})
export class IamporterComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    IMP.init('imp66601308');
    IMP.request_pay({

        pg: 'inicis',
        pay_method: 'card',
        merchant_uid : 'merchant_' + new Date().getTime(),
        name : '주문명:결제테스트',
        amount : 1000,
        buyer_email : 'iamport@siot.do',
        buyer_name : '하인철',
        buyer_tel : '010-4023-9334',
        buyer_addr : '경기도 군포시 고산로 643-9',
        buyer_postcode : '158-4',
        m_redirect_url : 'https://www.yourdomain.com/payments/complete'
    }, function(rsp) {
      if ( rsp.success ) {
        let msg = '결제 성공';
        msg += '고유ID : ' + rsp.imp_uid;
        msg += '상점 거래ID : ' + rsp.merchant_uid;
        msg += '결제 금액 : ' + rsp.paid_amount;
        msg += '카드 승인번호 : ' + rsp.apply_num;

        console.log(rsp);
        console.log(msg);
      } else {
        const msg = '결제 실패..';
        console.log('에러 내용:' + rsp.error_msg);
      }
    });
  }

}
