import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './@admin/pages/pages.routing';

import { NopagefoundComponent } from './@admin/nopagefound/nopagefound.component';
import { AuthRoutingModule } from './@admin/auth/auth.routing';
import { HomeComponent } from './@public/pages/home/home.component';



const routes: Routes = [
  {path: 'home', component: HomeComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes,
      {
        useHash:true,
        scrollPositionRestoration: 'enabled'
      }),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }

