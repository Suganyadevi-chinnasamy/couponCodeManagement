import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ApiListService } from 'src/app/services/api-list.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userRole:any;
  username:any;
  phonenumber:any;
  ownerEmail:any;
  storeName:any;
  address:any;
  storePhonenumber:any;
  password:any;

  constructor(
    public router: Router,
    public commonservice: CommonService,
    public utils: ApiListService
  ) { }

  ngOnInit(): void {
  }

  register(){
    let payload = {
      "user_name": this.username,
      "contact_no": this.phonenumber,
      "email_id": this.ownerEmail,
      "password": this.password,
      "address": this.address,
      "roles": this.userRole,
      "store_details":[{
          "store_name": this.storeName,
          "store_address": this.address,
          "store_contact_no": this.storePhonenumber
      }]
  }

    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('signup');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("registration resp", resp);
        // this.spinner.hide();
        if (resp.status_code == "200") {
          this.router.navigate(["/home"]);
          // console.log(resp);
          // this.spinner.hide();
          // this.globalService.showSuccess("Student Added Successfully");
          // this.display = "none";
          // this.studentForm.reset();
        }else if(resp.status_code == "400"){
        }
      });
  }

  signIn(){
    this.router.navigate(["/login"]);
  }

}
