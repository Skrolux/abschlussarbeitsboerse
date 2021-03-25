import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedIn: Boolean = false;

  constructor() { }

  ngOnInit(): void { 
    this.loggedIn = (sessionStorage.getItem('auth-token') != null && sessionStorage.getItem('auth-user') != null);
  }

  ngOnChanges(): void { 
    this.loggedIn = (sessionStorage.getItem('auth-token') != null && sessionStorage.getItem('auth-user') != null);
  }

}
