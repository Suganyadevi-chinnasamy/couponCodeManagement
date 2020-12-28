import { Injectable,Inject } from '@angular/core';
import { ApiListService } from './api-list.service';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  apiUrl =  "https://demo.emeetify.com:81/coupon";

  constructor(
    public http: HttpClient, 
    public utils: ApiListService,
  ) { }

  buildHeaders() {
    // let temp = JSON.parse(localStorage.getItem("adminDetails"));
    let headers;
  
    // let token = JSON.parse(temp);
    // console.log("Temp", token);
    // (token[0].token) ? this.authToken = token[0].token : this.authToken = "";
    // this.authToken = token? token[0]? token[0].token? token[0].token :"" : "" :"";

   
    // console.log("Auth token", this.authToken);
    headers = {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + this.authToken
    }; 
    // console.log("headers", headers);
    return headers;

  }

  invokeService(methodType, path, payload) {
    if (methodType == 'GET') {
      // console.log("Get");
      return this.getMethod(path, payload);
    } else if (methodType == 'POST') {
      // console.log("post");
      return this.postMethod(path, payload);
    } else if (methodType == 'PUT') {
      // return this.putMethod(path, payload);
    } else if (methodType == 'DELETE') {
      // return this.deleteMethod(path, payload);
    }
  }
  /**
   * call get method from the component
   * @param path 
   * @param payload 
   */
  getMethod(path, payload) {
    let payData = (payload) ? '/' + payload : '';
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/' + path + payData, { headers: this.buildHeaders() })
        .map((res) => res).subscribe((data) => {
          resolve(data);
        }, (err) => {
          // this.spinner.hide();
          // const modalRef = this.modalService.open(ModalPopupComponent);
          // modalRef.componentInstance.flag = 'server_error';
        });
    });
  }

  /**
   * call post method from the component
   * @param path 
   * @param payload 
   */
  postMethod(path, payload) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/' + path, payload, { headers: this.buildHeaders() })
        .map((res: any) => res).subscribe((res) => {
          resolve(res);
        }, (err) => {
          // this.spinner.hide();
          // const modalRef = this.modalService.open(ModalPopupComponent);
          // modalRef.componentInstance.flag = 'server_error';
        });
    });
  }
}
