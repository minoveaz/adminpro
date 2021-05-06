import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';


// modules
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

// components
import { ProgressComponent } from '../pages/progress/progress.component';
import { Graph1Component } from '../pages/graph1/graph1.component';
import { PagesComponent } from '../pages/pages.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graph1Component,
    PagesComponent
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Graph1Component,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ComponentsModule,
  ]
})
export class PagesModule { }
