
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable()
export class GuestGuard implements CanActivate 
{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean 
  {
    return this.authService.isLoggedAsGuest.pipe(map(logged => 
                        { 
                          console.log("guest.guard - canActivate().pipe: isLoggedAsGuest =  " + logged)
                          if(!logged) 
                          {
                             this.authService.isLoggingAsGuest.next(true);
                              //  not logged in so redirect to login page with the 
                              //  return url and return false
                              console.log("guest.guard - canActivate().pipe: returnUrl =  " + state.url)
                              this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});                             return false;
                          }
                          return true;
                        }))
  }
}