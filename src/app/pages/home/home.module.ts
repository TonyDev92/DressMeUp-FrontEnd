import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedmoduleModule } from 'src/app/shared/sharedmodule/sharedmodule.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/shared/interceptors/auth.interceptor';




@NgModule({
  declarations: [
    HomeComponent,
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi: true
  }],
  imports: [
    CommonModule,
    SharedmoduleModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
