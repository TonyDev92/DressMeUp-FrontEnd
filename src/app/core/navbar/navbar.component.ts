import { CartService } from './../../shared/services/cart.service';
import { FilterProductsService } from '../../shared/services/filter-products.service';
import { Subscription } from 'rxjs';



import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { productosInterface } from 'src/app/models/productos.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ThemeService } from 'src/app/shared/services/theme.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userId: string = "";
  count: any;
  isActive!: boolean;
  inCart: any;

  constructor(private CartService: CartService,
    private FilterProductsService: FilterProductsService,
    private auth: AuthService,
    public themeService : ThemeService
    ) { }

  setValue() {
    this.isActive = false;
    this.FilterProductsService.searcher(this.isActive);
  }

  ngOnInit(): void {
    
    
    this.CartService.products.subscribe(value => {
      this.count = value
    })
    

    this.FilterProductsService.searchActive.subscribe(value => {
      this.isActive = value;
    })
  }



  
}
