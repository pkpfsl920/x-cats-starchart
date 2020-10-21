
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable()
export class GuestGuard implements CanActivate 
{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean 
  {
    return this.authService.isLoggedAsGuest.pipe(map(logged => 
                        { 
                          console.log("guest.guard - canActivate().pipe: isLoggedAsGuest =  " + logged)
                          if(!logged) 
                          {
                             this.authService.isLoggingAsGuest.next(true);
                             this.router.navigate(['login']);
                             return false;
                          }
                          return true;
                        }))
  }
}