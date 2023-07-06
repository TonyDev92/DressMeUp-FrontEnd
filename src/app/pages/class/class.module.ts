import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassRoutingModule } from './class-routing.module';
import { SharedmoduleModule } from 'src/app/shared/sharedmodule/sharedmodule.module';
import { ClassComponent } from './class.component';


@NgModule({
  declarations: [
    ClassComponent
  ],
  imports: [
    CommonModule,
    SharedmoduleModule,
    ClassRoutingModule
  ]
})
export class ClassModule { }
