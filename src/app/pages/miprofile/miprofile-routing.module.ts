import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiprofileComponent } from './miprofile.component';

const routes: Routes = [
  {path:"", component: MiprofileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiprofileRoutingModule { }
