import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/filter';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  paymentStatus: boolean;
  paymentMessage: string;
  paymentObj: any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private toast: ToastService) { }

  ngOnInit() {

    // 아래에서 사용하고 있는 queryParams는 두가지 다 잘 작동하므로 어떤것을
    // 사용할것인지는 잘 판단하되 첫번째 경우는 곧바로 object를 사용하는것이고
    // 두번재는 object key값을 생성하면서 하는 방법이다
    // 또한 filter를 여기서는 사용하지 않아도 무방하다

    this.route.queryParams.filter(params => params.paymentStatus)
                          .subscribe(params => {
                            console.log( params );
                            this.paymentStatus = params.paymentStatus === 'true' ? true : false;
                            this.paymentMessage = params.message;
                            console.log(this.paymentStatus);
                            console.log(this.paymentMessage);

                            if (this.paymentStatus) {
                                    this.toast.success(this.paymentMessage);
                            } else {
                                  this.toast.error(this.paymentMessage);
                                  this.router.navigate(['/iamporterhome']);
                            }
                                  // this.route.queryParamMap.subscribe( params => {
                                  //   this.paymentObj = { ...params.keys, ...params };
                                  //   console.log(this.paymentObj);
                                  // });
                          });

  }

}
