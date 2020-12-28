import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ApiListService } from 'src/app/services/api-list.service';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailId: any;
  password: any;
  userDetails: any;

  constructor(
    public router: Router,
    public commonservice: CommonService,
    public utils: ApiListService,
    public globalService: GlobalService,
    public spinner : NgxSpinnerService,
    public globalservice: GlobalService
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.spinner.show();
    let payload = {
      "email_id": this.emailId,
      "password": this.password
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('login');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        this.spinner.hide();
        console.log("login resp", resp);
        // this.spinner.hide();
        if (resp.status_code == "200") {
          this.router.navigate(['/home']);
          this.userDetails = resp.data;
          this.globalService.setLocalStore('storeUserDetails', JSON.stringify(this.userDetails));
          // console.log(resp);
          // this.spinner.hide();
          // this.globalService.showSuccess("Student Added Successfully");
          // this.display = "none";
          // this.studentForm.reset();
        }else if(resp.status_code == "400"){
          // this.spinner.hide();
          this.globalService.showError(resp.data);
          // console.log("data", resp.data);
        }
      });

    // this.router.navigate(['/home']);

  }

  signUp(){
    this.router.navigate(['/signup']);
  }


}
