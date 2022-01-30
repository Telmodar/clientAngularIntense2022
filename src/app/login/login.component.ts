import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  username="";
  password="";
  thereIsAnError=false;

  ngOnInit(): void {
  }
  
  login() {
    if (!this.authService.loggedIn) {
      this.thereIsAnError = !this.authService.logIn(this.username,this.password);
      if(this.authService.logIn(this.username,this.password)) {
      }
    }
  }

}
