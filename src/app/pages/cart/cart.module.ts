import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { SharedmoduleModule } from 'src/app/shared/sharedmodule/sharedmodule.module';



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    SharedmoduleModule,
    CartRoutingModule
  ]
})
export class CartModule { }
