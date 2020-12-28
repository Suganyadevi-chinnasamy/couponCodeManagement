import { Component, OnInit, ViewEncapsulation, AfterViewInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],

  encapsulation: ViewEncapsulation.None

})
export class NavBarComponent implements OnInit {

  isCollapsed = true;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  registerHostel(){
    this.router.navigate(['/register-hostel'])
  }

  home(){
    this.router.navigate(['/home']);
  }

  addRooms(){
    this.router.navigate(['/add-room']);
  }

}
