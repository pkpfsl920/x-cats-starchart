import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts'

import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
//import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { FetchComponent } from './fetch/fetch.component';
import { ChangeComponent } from './change/change.component';
import { DeleteComponent } from './delete/delete.component';
import { ChartComponent } from './chart/chart.component';
import { LoginComponent } from './auth/login.component';
import { GuestGuard } from './auth/guest.guard';
import { SuperUserGuard } from './auth/super-user.guard';
import { AppService } from './app.service';
import { LoggedInService } from './services/loggedin.service';



const appRoutes: Routes = 
[
  // path - gets entered after your url domain
  // action - what component should get loaded
  // empty path for starting page (home page)
  { path: '', component: HomeComponent},  // localhost:4200
  { path: 'login', component: LoginComponent},  // localhost:4200/login
  { path: 'add', component: AddComponent, canActivate: [SuperUserGuard]},  // localhost:4200/add
  { path: 'fetch', component: FetchComponent, canActivate: [GuestGuard]},  // localhost:4200/fetch
  { path: 'change', component: ChangeComponent, canActivate: [SuperUserGuard]},  // localhost:4200/change
  { path: 'delete', component: DeleteComponent, canActivate: [SuperUserGuard]},  // localhost:4200/delete
  { path: 'chart', component: ChartComponent}  // localhost:4200/chart
];


export function app_init(appService: AppService) 
{
  return () => appService.initializeApp();
}


@NgModule({
  declarations: [AppComponent, HomeComponent, AddComponent, 
                 FetchComponent, ChangeComponent, DeleteComponent, 
                 ChartComponent, LoginComponent],

  imports: 
  [
    BrowserModule, 
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // the forRoot() method allows us to register the routes 
    // in the angular app
    RouterModule.forRoot(appRoutes),
    NgIdleKeepaliveModule.forRoot(),
    ModalModule.forRoot()
  ],

  providers: 
  [ GuestGuard, 
    SuperUserGuard,
    LoggedInService,
    AppService,    
    {
      provide: APP_INITIALIZER, useFactory: app_init, deps: [AppService], multi: true
    }
  ],

  bootstrap: [AppComponent]
})

export class AppModule {}
