import { ProductosService } from 'src/app/shared/services/productos.service';
import { productosInterface } from 'src/app/models/productos.model';
import { CartService } from './../../shared/services/cart.service';
import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, DoCheck {
  count!: number;

  product: productosInterface[] = [];

  onlyOne: string = "Producto";
  moreThan: string = "Productos";
  userId: string = "";
  inCart: productosInterface[] = [];

  constructor(
    private CartService: CartService,
    private ProductosService: ProductosService,
    private auth: AuthService) { }


  ngOnInit(): void {
   
  
    this.ProductosService.productsApi.subscribe(res => {
      this.product = res
    })
    this.calculateTotal();
    this.auth.checkSession().subscribe((res: any) => {
      
      const key = Object.keys(res)
      if (key.includes('_id')) {
        this.userId = res['_id']
        this.CartService.getProducts(this.userId).subscribe(res => {
          this.inCart = res.map((item: any) => item.products)
          console.log(res);

        })
      }
    })
    this.CartService.products.subscribe(value => {
      this.inCart = value;
      this.calculateTotal();
    })

  }
  ngDoCheck(): void {
    this.inCart.length;
    this.calculateTotal();
  }
  deleteProduct(product: productosInterface): void {
    const index = this.inCart.indexOf(product);
    const productId = product._id;
    if (index !== -1) {
      this.inCart.splice(index, 1);

      this.CartService.deleteOfCart(product, index)
      this.CartService.removeProducts(this.userId, productId).subscribe(res => {
        console.log(res);
      })
      
      this.calculateTotal();
    }
  }
  calculateTotal(): void {
    this.count = this.inCart.reduce((total, product) => total + parseFloat(product.price.replace(',', '.')), 0);
  }

}
