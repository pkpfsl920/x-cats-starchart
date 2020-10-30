import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class LoggedInService 
{

  private userLoggedIn = new Subject<boolean>();

  constructor() 
  {
    this.userLoggedIn.next(false);
  }

  setUserLoggedIn(userLoggedIn: boolean) 
  {
    console.log("loggedin.service - setUserLoggedIn()");

    this.userLoggedIn.next(userLoggedIn);
  }

  getUserLoggedIn(): Observable<boolean> 
  {
    console.log("loggedin.service - getUserLoggedIn()");

    return this.userLoggedIn.asObservable();
  }
}
