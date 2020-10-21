
import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth/auth.service';


@Injectable()
export class AppService 
{
   constructor(private injector: Injector) {}

   initializeApp(): Promise<any> 
   {
      console.log("app.service - initializeApp()")

      return new Promise(((resolve, reject) => 
                  {
                     console.log("app.service - initializeApp() - Promise(...)")

                     this.injector.get(AuthService).isDBConnected()
                                  .toPromise()
                                  .then(res => { resolve(); })
                  }))
   }
}