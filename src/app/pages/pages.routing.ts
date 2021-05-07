import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const routes: Routes = [

    { path: 'dashboard', 
    component: PagesComponent,
    children:[
      { path: '', component: DashboardComponent, data:{title: 'Dashboard'} },
      { path: 'progress', component: ProgressComponent,data:{title: 'progress'} },
      { path: 'graph1', component: Graph1Component,data:{title: 'Graph 1'} },
      { path: 'account-settings', component: AccountSettingsComponent,data:{title: 'Account Settings'} },
      { path: 'promise', component: PromiseComponent,data:{title: 'Promises'} },
      { path: 'rxjs', component: RxjsComponent,data:{title: 'Rxjs'} },
      
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
