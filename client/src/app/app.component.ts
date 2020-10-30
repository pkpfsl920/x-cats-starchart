import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LoggedInService } from './services/loggedin.service';
import { AuthService } from "./auth/auth.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit 
{

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  title = 'angular-idle-timeout';
  
  showMsg: boolean = false;
  loggedInName: String = "Guest"

  public modalRef: BsModalRef;

  @ViewChild('childModal', { static: false }) childModal: ModalDirective;


  constructor(private idle: Idle, private keepalive: Keepalive, 
              private router: Router, private modalService: BsModalService, 
              private loggedInService: LoggedInService,
              private authService: AuthService) 
  {
    console.log("app.cmp - constructor - " + this.idleState);

    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(10);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(15);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => 
    { 
      this.idleState = 'No longer idle.'
      console.log("app.cmp - idle.onIdleEnd.subscribe - " + this.idleState);
      this.reset();
    });
    
    idle.onTimeout.subscribe(() => 
    {
      this.childModal.hide();
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.loggedInService.setUserLoggedIn(false);
      this.authService.setUserLogOut();
      console.log("app.cmp - idle.onTimeout.subscribe - " + this.idleState);
      this.router.navigate(['/']);
    });
    
    idle.onIdleStart.subscribe(() => 
    {
        this.idleState = 'You\'ve gone idle!'
        console.log("app.cmp - idle.onIdleStart.subscribe - " + this.idleState);
        this.childModal.show();
    });
    
    idle.onTimeoutWarning.subscribe((countdown) => 
    {
      this.idleState = 'You will time out in ' + countdown + ' seconds!'
      console.log("app.cmp - idle.onTimeoutWarning.subscribe - " + this.idleState);
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.loggedInService.getUserLoggedIn().subscribe(userLoggedIn => 
    {
      if (userLoggedIn) 
      {
        console.log("app.cmp - loggedInService.getUserLoggedIn().subscribe: userLoggedIn");
        idle.watch()
        this.timedOut = false;
        this.showMsg = true;
      } 
      else 
      {
        console.log("app.cmp - loggedInService.getUserLoggedIn().subscribe: user notLoggedIn");
        idle.stop();
        this.showMsg = false;
      }
    })

    this.authService.getUserName().subscribe(userName =>
    {
      this.loggedInName = userName;
    });

    // this.reset();
  }

  reset() 
  {
    console.log("app.cmp - reset()");

    this.idle.watch();
    //xthis.idleState = 'Started.';
    this.timedOut = false;
  }

  hideChildModal(): void 
  {
    console.log("app.cmp - hideChildModal()");

    this.childModal.hide();
  }

  stay() 
  {
    console.log("app.cmp - stay()");

    this.childModal.hide();
    this.reset();
  }

  logout() 
  {
    console.log("app.cmp - logout()");

    this.showMsg = false;
    this.childModal.hide();
    this.loggedInService.setUserLoggedIn(false);
    this.authService.setUserLogOut();
    this.router.navigate(['/']);
  }


  ngOnInit() 
  {
    //this.fetchPosts();
  }

}
