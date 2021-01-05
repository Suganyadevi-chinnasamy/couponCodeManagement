import { Component, OnInit } from '@angular/core';
import { ApiListService } from 'src/app/services/api-list.service';
import { CommonService } from 'src/app/services/common.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  productData: any;
  userData: any;
  storeUserid: any;
  storeDetails: any;
  storeId: any;
  couponDetails: any;
  couponId: any;
  productId: any;
  userDetails: any;
  userid: any;
  productid: any;
  couponforuser: any;
  
  constructor(
    public utils: ApiListService,
    public commonservice: CommonService,
    public globalservice: GlobalService
  ) {
    let user = JSON.parse(localStorage.getItem('storeUserDetails'));
    this.userData = JSON.parse(user);
    this.storeUserid = this.userData[0].user_id;
    this.getStoreDetails(this.storeUserid);
   }

  ngOnInit(): void {
    this.getUserDetails();
    this.getProductDetails();
    this.getCouponforUsers();
  }

  getUserDetails(){
    // console.log("Users details");
    const servicePath = this.utils.getApiConfigs('user');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, '')
      .then((resp: any) => {
        console.log("Users details", resp);
        if (resp.status_code == "200") {
           this.userDetails = resp.data;
           // for(let i=0;i<this.allLocations.length;i++){
             // this.locations.push(this.allLocations[i].city.concat(',', this.allLocations[i].district));  
           // }
           // console.log("temp", this.locations);
        }else if(resp.status_code == "400"){
          this.globalservice.showError(resp.data);
        }
      });
  }

  getProductDetails(){
    const servicePath = this.utils.getApiConfigs('productDetails');
     this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, '')
       .then((resp: any) => {
         console.log("product details", resp);
         if (resp.status_code == "200") {
            this.productData = resp.data;
            console.log("product data", this.productData);
            // for(let i=0;i<this.allLocations.length;i++){
              // this.locations.push(this.allLocations[i].city.concat(',', this.allLocations[i].district));  
            // }
            // console.log("temp", this.locations);
         }else if(resp.status_code == "400"){
          this.globalservice.showError(resp.data);
         }  
       });
  }

  addCoupon(item){ 
    this.getCouponDetails();
    this.userid = item.id;
  }

  getCouponDetails(){
    const servicePath = this.utils.getApiConfigs('getCoupon');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, '')
      .then((resp: any) => {
        // console.log("get coupon resp", resp);
        // this.spinner.hide();
        if (resp.status_code == "200") {
          this.couponDetails = resp.data;
          console.log("couponDetails", this.couponDetails);
        }else if(resp.status_code == "400"){
          // this.spinner.hide();
          this.globalservice.showError(resp.data);
          // console.log("data", resp.data);
        }
      })
  }

  getCouponforUsers(){
    const servicePath = this.utils.getApiConfigs('couponforUsers');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, '')
      .then((resp: any) => {
        console.log("Coupon for User details", resp);
        if (resp.status_code == "200") {
          this.couponforuser = resp.data;
        } else if (resp.status_code == "400") {
          // this.globalService.showError(resp.data);
        }
      });
  }

  getStoreDetails(item){
    console.log("item", item);
    this.commonservice.getMethod(`store?user_id=${item}`, '')
      .then((resp: any) => {
        console.log("Store Details resp", resp);
        // this.spinner.hide();
        if (resp.status_code == "200") {
          this.storeDetails = resp.data;
          console.log("Store details", this.storeDetails);
        }else if(resp.status_code == "400"){
          // this.spinner.hide();
          this.globalservice.showError(resp.data);
          // console.log("data", resp.data);
        }
      })
  }

  addCouponProd(){
    let payload = {
      "coupon_id": this.couponId,
      "store_id": this.storeId,
      "prod_id": this.productid,
      "user_id": this.userid
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('addcouponprod');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("product details", resp);
        if (resp.status_code == "200") {
           this.productData = resp.data;
           this.globalservice.showSuccess("Coupon mapped successfully");
        }else if(resp.status_code == "400"){
          this.globalservice.showError(resp.data);
        }
      });
  }

}
