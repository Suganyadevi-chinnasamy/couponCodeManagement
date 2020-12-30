import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    //Toggle Click Function
    $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });
}

dashboard(){
  this.router.navigate(["/home"]);
}

productDetails(){
  this.router.navigate(["/product-details"]);
}

userDetails(){
  this.router.navigate(["/userDetails"]);
}
couponall(){
  this.router.navigate(["/couponAll"]);
}

}
