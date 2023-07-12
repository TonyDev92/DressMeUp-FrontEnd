import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentgatewayRoutingModule } from './paymentgateway-routing.module';
import { PaymentgatewayComponent } from './paymentgateway.component';
import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  declarations: [
    PaymentgatewayComponent
  ],
  imports: [
    CommonModule,
    NgxPayPalModule,
    PaymentgatewayRoutingModule
  ]
})
export class PaymentgatewayModule { }
