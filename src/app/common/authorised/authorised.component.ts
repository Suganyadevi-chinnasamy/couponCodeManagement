import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-authorised',
  templateUrl: './authorised.component.html',
  styleUrls: ['./authorised.component.scss']
})
export class AuthorisedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("test")
  }

}
