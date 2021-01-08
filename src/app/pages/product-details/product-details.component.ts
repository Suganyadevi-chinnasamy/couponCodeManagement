import { Component, OnInit } from '@angular/core';
import { ApiListService } from 'src/app/services/api-list.service';
import { CommonService } from 'src/app/services/common.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  public display = "none";
  productData: any = [];
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
  category: any;
  categoryDetails: any;
  storeIdData: any;

  constructor(
    public utils: ApiListService,
    public commonservice: CommonService,
    public globalService: GlobalService
  ) {
    let user = JSON.parse(localStorage.getItem('storeUserDetails'));
    this.userData = JSON.parse(user);
    this.storeUserid = this.userData[0].user_id;
    this.storeIdData = this.userData[0].id;
  }

  ngOnInit(): void {
    this.getStoreDetails();
    this.getProductDetails();
    this.getCouponforProduct();
    this.getCategory();
  }

  onChange(data){
    console.log("data", data);
    this.storeIdData = data;
    this.getProductDetails();
  }

  getProductDetails() {
    console.log("storeIdData", this.storeIdData);
    // const servicePath = this.utils.getApiConfigs('productDetails');
    this.commonservice.getMethod(`store?user_id=${this.storeUserid}&store_id=${this.storeIdData}`, '')
      .then((resp: any) => {
        console.log("product details", resp);
        if (resp.status_code == "200") {
          this.productData = resp.data;
        } else if (resp.status_code == "400") {
          this.globalService.showError(resp.data);
        }
      });
  }

  getCategory(){
    const servicePath = this.utils.getApiConfigs('getCategory');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, '')
      .then((resp: any) => {
        console.log("Category details", resp);
        if (resp.status_code == "200") {
          this.categoryDetails = resp.data;
        } else if (resp.status_code == "400") {
          this.globalService.showError(resp.data);
        }
      });
  }

  getCouponforProduct(){
    const servicePath = this.utils.getApiConfigs('couponforProduct');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, '')
      .then((resp: any) => {
        // console.log("Coupon for product details", resp);
        if (resp.status_code == "200") {
          this.couponforPro = resp.data;
          console.log("coupon for products", this.couponforPro );
        } else if (resp.status_code == "400") {
          this.globalService.showError(resp.data);
        }
      });
  }

  addCoupon(item) {
    this.getCouponDetails();
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
          // console.log("coupon details", this.couponDetails);
        } else if (resp.status_code == "400") {
          // this.spinner.hide();
          this.globalService.showError(resp.data);
          // console.log("data", resp.data);
        }
      })
  }

  getStoreDetails() {
    this.commonservice.getMethod(`storedetails?user_id=${this.storeUserid}`, '')
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
        // console.log("product details", resp);
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
      "quantity": this.proQuantity
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('addProduct');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("Added product details", resp);
        if (resp.status_code == "200") {
          this.productData.push(resp.data);
          this.globalService.showSuccess("Product mapped successfully");
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

  addCategory(){
    
    let payload = {
      "category_type": this.category
    }

    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('addcategory');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("Added product details", resp);
        if (resp.status_code == "200") {
          this.productData.push(resp.data);
          this.globalService.showSuccess("Category added successfully");
        } else if (resp.status_code == "400") {
          this.globalService.showError(resp.data);
        }
    });
  }


}
