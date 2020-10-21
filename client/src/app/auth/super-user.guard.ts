import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable()
export class SuperUserGuard implements CanActivate 
{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean 
  {
      return this.authService.isLoggedAsSuperUser.pipe(map(logged => 
                        {
                           console.log("super-user.guard - canActivate().pipe: isLoggedAsSuperUser =  " + logged)
                           if(!logged) 
                           {
                              this.authService.isLoggingAsSuperUser.next(true);
                              this.router.navigate(['login']);
                              return false;
                           }
                           return true; 
                        }))
  }
}