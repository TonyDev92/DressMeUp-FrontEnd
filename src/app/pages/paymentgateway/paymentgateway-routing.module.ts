import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentgatewayComponent } from './paymentgateway.component';

const routes: Routes = [
  {path:"" , component: PaymentgatewayComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentgatewayRoutingModule { }
