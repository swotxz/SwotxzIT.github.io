import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authServ: AuthService, private router: Router, private route: ActivatedRoute) { }

  canActivate(route, state) {
    return this.authServ.user$.pipe(map(user => {
      if (user) {
        return true;
      } else {
        this.router.navigate(['/login'], {relativeTo: this.route , queryParams: { returnUrl:state.url } });
        return false;
      }
    }))
    }

}
