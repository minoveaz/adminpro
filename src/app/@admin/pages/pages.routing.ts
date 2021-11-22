import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { AuthGuard } from '../guards/auth.guard';


import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

// Events

import { EventsComponent } from './events/events.component';

// settings
import { UsersComponent } from './settings/users/users.component';
import { HospitalsComponent } from './settings/hospitals/hospitals.component';
import { DoctorsComponent } from './settings/doctors/doctors.component';
import { HomeComponent } from '../../@public/pages/home/home.component';



const routes: Routes = [

    { path: 'dashboard', 
    component: PagesComponent,
    canActivate: [AuthGuard],
    children:[
      { path: '', component: DashboardComponent, data:{title: 'Dashboard'} },
      { path: 'progress', component: ProgressComponent,data:{title: 'progress'} },
      { path: 'graph1', component: Graph1Component,data:{title: 'Graph 1'} },
      { path: 'account-settings', component: AccountSettingsComponent,data:{title: 'Account Settings'} },
      { path: 'promise', component: PromiseComponent,data:{title: 'Promises'} },
      { path: 'rxjs', component: RxjsComponent,data:{title: 'Rxjs'} },
      { path: 'profile', component: ProfileComponent,data:{title: 'Profile'} },

      //Events
      { path: 'events', component: EventsComponent,data:{title: 'Events'} },


      //settings
      { path: 'users', component: UsersComponent,data:{title: 'App Users'} },
      { path: 'hospitals', component: HospitalsComponent,data:{title: 'Hospitals'} },
      { path: 'doctors', component: DoctorsComponent,data:{title: 'Doctors'} },
      
    ]
  },
 

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
