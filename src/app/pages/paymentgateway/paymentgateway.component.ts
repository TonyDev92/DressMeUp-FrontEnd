import { cartInterface } from './../../models/cart.model';
import { productosInterface } from './../../models/productos.model';
import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal'
import { environment } from 'src/app/environments/environment';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';


@Component({
  selector: 'app-paymentgateway',
  templateUrl: './paymentgateway.component.html',
  styleUrls: ['./paymentgateway.component.scss']
})
export class PaymentgatewayComponent implements OnInit {

  userId!: string;
  showModal : boolean = false;
  cartCount: number = 0;
  cartItems: productosInterface[] = [];
  test : any = [];
  modalMessage: string = '';
  

  public payPalConfig?: IPayPalConfig;

  constructor(private cart: CartService , private auth: AuthService) { }


  ngOnInit(): void {
    this.auth.checkSession().subscribe((res: any) => {
      const key = Object.keys(res)
      if (key.includes('_id')) {
        this.userId = res['_id']
        console.log(this.userId);
        
      }
    })
    this.initConfig(); //este también
    this.cartCount = this.cart.getCount();
    console.log(this.cartCount);
    this.cartItems = this.cart.getCartItems();
    console.log(this.cartItems);
    console.log(this.test = this.getCartItems());
    
  }


  openModal(message: string) {
    this.modalMessage = message;
    this.showModal = true;
  }
  getCartItems(): cartInterface[] {
    const items: cartInterface[] = [];

    this.cartItems.forEach((item: productosInterface) => {
      let found = false;

      for (let i = 0; i < items.length; i++) {
        if (items[i].name === item.name) {
          found = true; items[i].quantity = (parseInt(items[i].quantity) + 1).toString(); break;
        }
      }

      if (!found) {
        items.push({
          name: item.name, quantity: '1', category: "DIGITAL_GOODS", unit_amount: {
            currency_code: 'EUR',
            value: item.price
          }
        });
      }
    });

    return items;
  }




  private initConfig(): void { //migrar esto a otro componente

    this.payPalConfig = {
      currency: 'EUR',
      clientId: environment.clientId,

      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: this.cartCount.toFixed(2).toString(),
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: this.cartCount.toString()
              }
            }
          },
          items: this.getCartItems()
        }]  
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.openModal("Pago realizado correctamente");
        
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);

      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    };
  }


}
