import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiListService {

  apiService: any = [{
    'key': 'signup',
    'path': 'store',
    'method': 'POST' 
  },
  {
    'key': 'login',
    'path': 'storelogin',
    'method': 'POST' 
  },
  {
    'key': 'addStore',
    'path': 'addstore',
    'method': 'POST' 
  },
  {
    'key': 'addCoupon',
    'path': 'coupon',
    'method': 'POST' 
  },
  {
    'key': 'getCoupon',
    'path': 'coupon',
    'method': 'GET' 
  },
  {
    'key': 'storeDetails',
    'path': 'store',
    'method': 'GET' 
  },
  {
    'key': 'productDetails',
    'path': 'product',
    'method': 'GET' 
  },
  {
    'key': 'addcouponprod',
    'path': 'addcoupontoproduser',
    'method': 'POST' 
  },
  {
    'key': 'user',
    'path': 'user',
    'method': 'GET' 
  },
  {
    'key': 'usedCoupon',
    'path': 'user',
    'method': 'POST' 
  },
  
]

  constructor() { }
  getApiConfigs(key: string) {
    return this.apiService.filter((item) => {
      if (item.key == key) {
        return item;
      }
    });
  }
}
