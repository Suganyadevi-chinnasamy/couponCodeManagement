import { Component, OnInit } from '@angular/core';
import { ApiListService } from 'src/app/services/api-list.service';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
// import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';
import * as $ from 'jquery';
import { DatePipe } from '@angular/common';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public display = "none";
  storeName: any;
  storeAddress: any;
  storePhoneNumber: any;
  storeUserid: any;
  userData: any;
  discountFlat: any;
  usageLimit: any;
  couponName: any;
  discountType: any;
  miniAmount: any;
  miniQuantity: any;
  startDate: any;
  endDate: any;
  storeDetails: any;
  storeId: any;
  couponDetails: any;
  activeCoupon: any = [];
  expiredCoupon: any = [];
  noData = false;
  usedCoupons: any;
  discountPercentage: any;
  offerFor: any;
  allAddedCoupon: any = [];
  addedWholeStore: any = [];
  couponCode: any;
  showDeactivateCoupon = false;
  showAddCoupon = false;
  showReactivateCoupon = false;
  showAdd = false;
  showEdit = false;
  showAddStore = false;
  selStoreID: any;
  // @ViewChild(BsDatepickerDirective, { static: false }) datepicker: BsDatepickerDirective;

  constructor(
    public utils:ApiListService,
    public commonservice:CommonService,
    public router: Router,
    private spinner: NgxSpinnerService,
    public datepipe: DatePipe,
    public globalService: GlobalService
  ) {
    let user = JSON.parse(localStorage.getItem('storeUserDetails'));
    this.userData = JSON.parse(user);
    this.storeUserid = this.userData[0].user_id;
    console.log("user Data", this.userData);
    this.getCoupon();
    // $('.datepicker').datepicker();
   }

  ngOnInit(): void {
    this.getCouponDetails();
  }

  getCoupon(){
    const servicePath = this.utils.getApiConfigs('getCoupon');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, '')
      .then((resp: any) => {
        // console.log("Coupon details", resp);
        this.spinner.hide();
        if (resp.status_code == "200") {
          this.allAddedCoupon = resp.data;
          let currentDate = moment().format();

          console.log("all added", this.allAddedCoupon);
          for(let i=0;i<this.allAddedCoupon.length;i++){
            if(this.allAddedCoupon[i].type == "ALL"){
              this.addedWholeStore.push(this.allAddedCoupon[i]);
            }
            let end_date = moment(this.allAddedCoupon[i].val_end_date).format();
            let start_date = moment(this.allAddedCoupon[i].val_start_date).format();
            if(currentDate <= end_date){
              this.allAddedCoupon[i]["active_status"] = "Active";
            }else{
              this.allAddedCoupon[i]["active_status"] = "Expired";
            }
            // let temp =;

            if(moment(start_date).isAfter(currentDate)){
              this.allAddedCoupon[i]["active_status"] = "Futured";
            }
          }

          console.log("all added coupons", this.allAddedCoupon);
        }else if(resp.status_code == "400"){
          this.globalService.showError(resp.data);
          // console.log("data", resp.data);
        }
      })
  }

  getCouponDetails(){
    console.log("storeUserid", this.storeUserid);
    this.commonservice.getMethod(`storedetails?user_id=${this.storeUserid}`, '')
      .then((resp: any) => {
        // console.log("Store Details resp", resp);
        this.spinner.hide();
        if (resp.status_code == "200") {
          this.storeDetails = resp.data;
          console.log("id", this.storeDetails);
          this.storeId = this.storeDetails[0].id;
          this.getStoreCoupon(this.storeId);
          this.spinner.hide();
          // this.globalService.showSuccess(" Added Successfully");
          // this.studentForm.reset();
        }else if(resp.status_code == "400"){
          this.spinner.hide();
          console.log("coupon");
          this.globalService.showError(resp.data);
          // console.log("data", resp.data);
        }
      })
  }

  getStoreCoupon(item){
    // console.log("store id", item);
    this.commonservice.getMethod(`individualstorecoupon?store_id=${item}`, '')
      .then((resp: any) => {
        // console.log("Store Coupon resp", resp);
        this.spinner.hide();
        if (resp.status_code == "200") {
          this.couponDetails = resp.data;
          let currentDate = moment().format();
          // console.log("current date", currentDate);
          
          this.couponDetails.map( item => {
            let end_date = moment(item.val_end_date).format();
            // console.log("end date", end_date);
            if(currentDate <= end_date){
              item.active_status = "Active";
              this.activeCoupon.push(item);
              // console.log("length", this.activeCoupon.length);
              if(this.activeCoupon.length == 0){
                this.noData = true;
              }else{
                this.noData = false;
              }
            }else{
              // console.log("no data");
              // console.log("end date", end_date, "current date", currentDate);
              item.active_status = "Expired";
              this.expiredCoupon.push(item);
              if(this.expiredCoupon.length == 0){
                this.noData = true;
              }else{
                this.noData = false;
              }
            }
          });
          // console.log("ActiveCoupon", this.activeCoupon);
        }else if(resp.status_code == "400"){
          this.spinner.hide();
          this.globalService.showError(resp.data);
        }
      });
  }

  addStore(){
    this.display = "block";
    this.showAddStore = true;
    this.showAddCoupon = false;
    // this.showAdd = false;
    // this.showEdit = false;
    this.showDeactivateCoupon = false;
    this.showReactivateCoupon = false;
    // console.log("this.storeDetails", this.storeDetails);
  }

  addCouponModal(){
    this.display = "block";
    this.showAddCoupon = true;
    this.showAddStore = false;
    this.showAdd = true;
    this.showEdit = false;
    this.showDeactivateCoupon = false;
    this.showReactivateCoupon = false;
  }

  editCouponModal(data){
    console.log("data", data);
    this.display = "block";
    this.showAddCoupon = true;
    this.showAddStore = false;
    this.showAdd = false;
    this.showEdit = true;
    this.showDeactivateCoupon = false;
    this.showReactivateCoupon = false;

    this.couponName = data.coupon_name;
    this.discountType = data.discount_type;
    this.discountFlat = data.discount_amount;
    this.miniAmount = data.minimum_amount;
    this.miniQuantity = data.minimum_quantity;
    this.usageLimit = data.usage_limits;
    this.startDate = data.val_start_date;
    this.endDate = data.val_end_date;
    this.offerFor = data.type;
    this.couponCode = data.coupon_code;
  }

  deactivateCouponModal(){
    this.display = "block";
    this.showDeactivateCoupon = true;
    this.showAddStore = false;
    this.showAddCoupon = false;
    this.showReactivateCoupon = false;
  }

  reactivateCouponModal(){
    this.display = "block";
    this.showReactivateCoupon = true;
    this.showAddStore = false;
    this.showDeactivateCoupon = false;
    this.showAddCoupon = false;
  }

  onCloseHandled(){
    this.display = "none";
  }

  addNewStore(){
    this.spinner.show();
    let payload = {
        "store_name": this.storeName,
        "store_address": this.storeAddress,
        "store_user_id": this.storeUserid,
        "store_contact_no": this.storePhoneNumber
    }
    // console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('addStore');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        // console.log("add store resp", resp);
        this.spinner.hide();
        if (resp.status_code == "200") {
          // this.router.navigate(['/home']);
          // console.log(resp);
          this.spinner.hide();
          this.globalService.showSuccess("Store Added Successfully");
          // this.display = "none";
          // this.studentForm.reset();
        }else if(resp.status_code == "400"){
          this.spinner.hide();
          this.globalService.showError(resp.data);
          // console.log("data", resp.data);
        }
      });
  }

  addCoupon(){
    this.spinner.show();

    if(this.miniQuantity == undefined){
      this.miniQuantity = 0;
    }else if(this.miniAmount == undefined){
      this.miniAmount = 0;
    }else if(this.discountFlat == undefined){
      this.discountFlat = 0;
    // }else if(this.discountPercentage == undefined){
      // this.discountPercentage = 0;
    }

    let payload = {
      "coupon_name" : this.couponName,
      "discount_type" : this.discountType,
      "discount_amount" : this.discountFlat,
      "minimum_amount" : this.miniAmount,
      "minimum_quantity" : this.miniQuantity,
      "usage_limits" : this.usageLimit,
      "val_start_date" : this.startDate,
      "val_end_date" : this.endDate,
      // "percentage" : this.discountPercentage,
      "type" : this.offerFor, 
      "store_id": this.selStoreID
    }

    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('addCoupon');
    console.log("service path", servicePath);
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("add coupon resp", resp);
        this.spinner.hide();
        if (resp.status_code == "200") {
          this.spinner.hide();
          this.globalService.showSuccess("Coupon Added Successfully");
        }else if(resp.status_code == "400"){
          this.spinner.hide();
          this.globalService.showError(resp.data);
        }
      });
  }

  generateCoupon(){
    const servicePath = this.utils.getApiConfigs('');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, '')
      .then((resp: any) => {
        // console.log("Coupon details", resp);
        this.spinner.hide();
        if (resp.status_code == "200") {
        }else if(resp.status_code == "400"){
          this.globalService.showError(resp.data);
          // console.log("data", resp.data);
        }
      }) 
  }

  dateFormat(date) {
    let returnDate = moment(date).format('DD-MM-YYYY')
    return returnDate;
  }

  usedCoupon(){
    const servicePath = this.utils.getApiConfigs('usedCoupon');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, '')
      .then((resp: any) => {
        // console.log("used coupons resp", resp);
        if (resp.status_code == "200") {
          this.usedCoupons = resp.data;
          this.spinner.hide();
        }else if(resp.status_code == "400"){
          this.spinner.hide();
          this.globalService.showError(resp.data);
        }
      });
  }

}
