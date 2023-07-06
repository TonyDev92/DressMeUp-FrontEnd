import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiprofileRoutingModule } from './miprofile-routing.module';
import { MiprofileComponent } from './miprofile.component';


@NgModule({
  declarations: [
    MiprofileComponent
  ],
  imports: [
    CommonModule,
    MiprofileRoutingModule
  ]
})
export class MiprofileModule { }
