import { Component, OnInit } from '@angular/core';
declare var particlesJS: any;
import { AuthService } from '../services/auth.service';
import { appUsers } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginMode = true;
  signUpMode = false;
  signErrorMessage: string = '';
  loginErrorMessage: string = '';
  constructor(private authSer: AuthService, private userServ: UserService, private router: Router
    , private route: ActivatedRoute) { }


  ngOnInit() {
    particlesJS.load('particles-js', 'assets/particles.json');

    var winH = $(window).height();
    $('.bgImage').css('minHeight', winH);
    $('.bgImage .overlay').css('minHeight', winH);
   

  }


  signup(form) {
    let data: appUsers = form.value;
    this.authSer.signup(data).then().catch(
      error => {
        this.signErrorMessage = error.message;
      }
    );
  }

  login(form) {
    let data = form.value;
    this.authSer.login(data.email, data.password).then().catch(
      error => {
        this.loginErrorMessage = error.message;
      }
    )
  }

  ReSignUp() {
    this.loginMode = true;
    this.signUpMode = false;

  }
  
  Relogin() {
    this.signUpMode = true;
    this.loginMode = false;
  }
}
