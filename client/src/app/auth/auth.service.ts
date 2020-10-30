
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthService 
{

  isLoggedAsGuest: BehaviorSubject<boolean>;
  isLoggedAsSuperUser: BehaviorSubject<boolean>;
  isLoggingAsGuest: BehaviorSubject<boolean>;
  isLoggingAsSuperUser: BehaviorSubject<boolean>;

  userLoggedInName: Subject<String>;

  loginStatus: Boolean;

  constructor(private http: HttpClient) 
  { 
    //let userName:string = "Guest";

    this.isLoggedAsGuest = new BehaviorSubject<boolean>(false);
    this.isLoggedAsSuperUser = new BehaviorSubject<boolean>(false);
    this.isLoggingAsGuest = new BehaviorSubject<boolean>(false);
    this.isLoggingAsSuperUser = new BehaviorSubject<boolean>(false);

    this.userLoggedInName = new Subject<String>();
    this.userLoggedInName.next("Guest");

    this.loginStatus = false;
  }

  setUserLogOut() 
  {
    console.log("auth.service - setUserLogOut()");
    this.isLoggedAsGuest.next(false);
    this.isLoggedAsSuperUser.next(false);
    this.userLoggedInName.next("Guest");
  }

  getUserName(): Observable<String>
  {
   console.log("auth.service - getUserName()");

   return this.userLoggedInName.asObservable();
  }

  login(email: String, password: String): Observable<boolean> 
  {
    var body = {};
    body['email'] = email;
    body['password'] = password;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    console.log("auth.service - login(...)")

   return this.http
        .get( '/Certify', {withCredentials: true})

        .pipe( map((response: any) => 
        {
           console.log("auth.service - login(..)http.pipe: response =  " + response);
           let stringyData = JSON.stringify(response);
           var myObj = JSON.parse(stringyData);
           console.log(myObj);
           var len = myObj.data.length;
           for (let i = 0; i < len; i++)
           {
              console.log("length = " + i);
              console.log(myObj.data[i].email);
              console.log(myObj.data[i].password);

              if ( (myObj.data[i].email == email) &&
                   (myObj.data[i].password == password) )
              {
                 if (this.isLoggingAsSuperUser.getValue())
                 {
                   this.isLoggedAsSuperUser.next(true);
                   this.isLoggedAsGuest.next(true);
                   this.userLoggedInName.next(email);
                   console.log("auth.service - login(..).http.pipe: LoggedAsSuperUser")
                 }
                 else if (this.isLoggingAsGuest.getValue())
                 {
                   this.isLoggedAsGuest.next(true);
                   this.isLoggedAsSuperUser.next(false);
                   this.userLoggedInName.next(email);
                   console.log("auth.service - login(..).http.pipe: LoggedAsGuest")
                 }
                 else
                 {
                   this.isLoggedAsSuperUser.next(false);
                   this.isLoggedAsGuest.next(false);
                   console.log("auth.service - login(..).http.pipe: Not Logged")
                 }
              }
           };
           this.isLoggingAsGuest.next(false);
           this.isLoggingAsSuperUser.next(false);
           response = true;
           this.loginStatus = true;
           //this.isLogged.next(response);
           return response;
        }
       ));

    /*
    this.http
        .post('/Certify', body)
        .subscribe(responseData => {console.log(responseData);});

    this.isLoggedAsSuperUser.next(true);
    this.isLoggedAsGuest.next(true);
    this.isLogged.next(true);
    return this.isLogged;
    */
  }

  isLoggedIn() 
  {
    console.log("auth.service - isLoggedIn()")

    return this.http.get( '/Certify', {withCredentials: true})

                    .pipe( map((response: any) => 
                           {
                              console.log("auth.service - isLoggedIn().pipe")
                              console.log("auth.service - isLoggedIn().pipe: response =  " + response)
                              let stringyData = JSON.stringify(response);
                              var myObj = JSON.parse(stringyData);
                              console.log(myObj);
                              response = true;
                              this.loginStatus = true;
                              //this.isLogged.next(response);
                              return response;
                           }
                          ));
  }

  isDBConnected() 
  {
    console.log("auth.service - isDBConnected()")

    return this.http.get( '/Certify', {withCredentials: true})

                    .pipe( map((response: any) => 
                           {
                              console.log("auth.service - isDBConnected().pipe")
                              console.log("auth.service - isDBConnected().pipe: response =  " + response)
                              let stringyData = JSON.stringify(response);
                              var myObj = JSON.parse(stringyData);
                              console.log(myObj);
                              response = true;
                              this.loginStatus = true;
                              //this.isLogged.next(response);
                              return response;
                           }
                          ));
  }
}
