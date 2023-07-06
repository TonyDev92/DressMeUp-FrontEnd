import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { SharedmoduleModule } from 'src/app/shared/sharedmodule/sharedmodule.module';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';



@NgModule({
  declarations: [
    ProductosComponent
  ],
  imports: [
    CommonModule,
    SharedmoduleModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
