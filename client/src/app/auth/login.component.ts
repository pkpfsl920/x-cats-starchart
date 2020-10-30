
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';
import { AuthService } from "./auth.service";
import { LoggedInService } from '../services/loggedin.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit, OnDestroy
{
  loginForm: FormGroup;
  subscription: Subscription;
  returnUrl: string;

  model: User = new User();

  constructor(private authService: AuthService, 
              private router: Router,
              private route: ActivatedRoute,
              private loggedInService: LoggedInService) 
  {}

  onSubmit() 
  {
    this.subscription = 
            this.authService

                .login( this.loginForm.value.email,    
                        this.loginForm.value.password )
  
                .subscribe( (response: any) => 
                    { 
                      console.log("login.component - onSubmit() - subscribe : response =  " + response)
                      this.loggedInService.setUserLoggedIn(true)
                      this.router.navigateByUrl(this.returnUrl); 
                    },
                    error => 
                    {
                        //  login failed so display error
                        //this.alertService.error(error);
                        this.loggedInService.setUserLoggedIn(false)
                        console.log("login.component - onSubmit() - subscribe : error =  " + error)
                        this.router.navigate(['/']);
                    });
  }

  ngOnInit() 
  {
     this.loginForm = 
          new FormGroup(
          {
            email: new FormControl(null, [Validators.required,
                                          Validators.pattern("[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?")
                                         ]),
            password: new FormControl(null, Validators.required)
          });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        console.log("the return URL : " + this.returnUrl);   
  }

  ngOnDestroy() 
  {
     if (this.subscription) 
       this.subscription.unsubscribe();
  }
}


export class User 
{
  constructor( ) {  }

  public userName: string;
  public password: string;

}
