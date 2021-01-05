import { Component, OnInit } from '@angular/core';
import { ApiListService } from 'src/app/services/api-list.service';
import { CommonService } from 'src/app/services/common.service';
import { of } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  public display = "none";
  productData: any;
  userData: any;
  storeUserid: any;
  storeDetails: any;
  storeId: any;
  couponDetails: any;
  couponId: any;
  productId: any;
  proName: any;
  proCategory: any;
  proPrice: any;
  proQuantity: any;
  couponforPro: any;

  constructor(
    public utils: ApiListService,
    public commonservice: CommonService,
    public globalService: GlobalService
  ) {
    let user = JSON.parse(localStorage.getItem('storeUserDetails'));
    this.userData = JSON.parse(user);
    this.storeUserid = this.userData[0].user_id;
  }

  ngOnInit(): void {
    this.getProductDetails();
    this.getCouponforProduct();
  }

  getProductDetails() {
    const servicePath = this.utils.getApiConfigs('productDetails');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, '')
      .then((resp: any) => {
        // console.log("product details", resp);
        if (resp.status_code == "200") {
          this.productData = resp.data;
        } else if (resp.status_code == "400") {
          this.globalService.showError(resp.data);
        }
      });
  }

  getCouponforProduct(){
    const servicePath = this.utils.getApiConfigs('couponforProduct');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, '')
      .then((resp: any) => {
        console.log("Coupon for product details", resp);
        if (resp.status_code == "200") {
          this.couponforPro = resp.data;
        } else if (resp.status_code == "400") {
          this.globalService.showError(resp.data);
        }
      });
  }

  addCoupon(item) {
    this.getCouponDetails();
    this.getStoreDetails();
    this.productId = item.id;
  }

  getCouponDetails() {
    const servicePath = this.utils.getApiConfigs('getCoupon');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, '')
      .then((resp: any) => {
        // console.log("get coupon resp", resp);
        // this.spinner.hide();
        if (resp.status_code == "200") {
          this.couponDetails = resp.data;
          console.log("coupon details", this.couponDetails);
        } else if (resp.status_code == "400") {
          // this.spinner.hide();
          this.globalService.showError(resp.data);
          // console.log("data", resp.data);
        }
      })
  }

  getStoreDetails() {
    this.commonservice.getMethod(`store?user_id=${this.storeUserid}`, '')
      .then((resp: any) => {
        // console.log("Store Details resp", resp);
        // this.spinner.hide();
        if (resp.status_code == "200") {
          this.storeDetails = resp.data;
          console.log("id", this.storeDetails);
        } else if (resp.status_code == "400") {
          // this.spinner.hide();
          this.globalService.showError(resp.data);
          // console.log("data", resp.data);
        }
      })
  }

  addCouponProd() {
    let payload = {
      "coupon_id": this.couponId,
      "store_id": this.storeId,
      "prod_id": this.productId
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('addcouponprod');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("product details", resp);
        if (resp.status_code == "200") {
          this.productData = resp.data;
          this.globalService.showSuccess("Coupon mapped successfully");
        } else if (resp.status_code == "400") {
          this.globalService.showError(resp.data);
        }
      });
  }

  addNewProduct() {
    let payload = {
      "product_name": this.proName,
      "product_price": this.proPrice,
      "store_id": this.storeId,
      "prod_quantity":[{
      "quantity": this.proQuantity
      }]
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('addProduct');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("product details", resp);
        if (resp.status_code == "200") {
          this.productData = resp.data;
          this.globalService.showSuccess("Coupon mapped successfully");
        } else if (resp.status_code == "400") {
          this.globalService.showError(resp.data);
        }
      });
  }

  addProduct() {
    this.display = "block";
  }

  onCloseHandled() {
    this.display = "none";
  }



}
