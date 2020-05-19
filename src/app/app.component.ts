import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UserService } from './services/user.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
declare var particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{

  subscribe :Subscription;

  constructor(private AuthSerivce:AuthService,private route:ActivatedRoute,private router:Router,
    private UserService:UserService){
    this.AuthSerivce.user$.subscribe(
      user=>{
        if(user){

          let returnUrl= localStorage.getItem('returnUrl');
          if(!returnUrl) return;

          localStorage.removeItem('returnUrl');
          router.navigateByUrl(returnUrl);
        }
      }
    )
  }


  ngOnInit(){
    particlesJS.load('particles-js', 'assets/particles.json');

  this.subscribe = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(()=>{window.scrollTo(0,0)} )
  }

  ngOnDestroy(){
    this.subscribe.unsubscribe();
  }
}
