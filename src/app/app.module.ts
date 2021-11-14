import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './@admin/pages/pages.module';
import { AuthModule } from './@admin/auth/auth.module';


import { AppComponent } from './app.component';
import { NopagefoundComponent } from './@admin/nopagefound/nopagefound.component';
import { PublicModule } from './@public/pages/public.module';



@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
  ],
  imports: [
    BrowserModule,
    PagesModule,
    PublicModule,
    AuthModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
