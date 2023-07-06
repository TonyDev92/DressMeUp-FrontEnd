import { FilterProductsService } from './../../services/filter-products.service';
import { productosInterface } from './../../../models/productos.model';
import { CartService } from './../../services/cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';




@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
    @Input() products : productosInterface[] = [];
    userId : string = "";

    filterProducts='';

    inCart: productosInterface[] = [];
    
    constructor(
      private CartService: CartService , 
      private FilterProductsService: FilterProductsService,
      private auth: AuthService) {}
    
    ngOnInit(): void { 
      this.auth.checkSession().subscribe((res: any) => {
        const key = Object.keys(res)
        if(key.includes('_id')){
          this.userId = res['_id']
        }
        
      })
      this.FilterProductsService.filterProducts.subscribe(value => {
        this.filterProducts = value || ''; 
        //verify that the value of filterProducts is not null and if it is, assign ' '
      })
      
    }

    add(product: productosInterface){
      // this.inCart = this.CartService.products;
      this.CartService.addToCart(product); 
      
      this.CartService.products.subscribe(value => {
        this.inCart = value;
        
        
      })
      const cart = {products : this.inCart.map(product => product._id)};
      
      this.CartService.updateCart(cart, this.userId).subscribe(res => {
        console.log(res);
      
      })
      
      
    }

}
