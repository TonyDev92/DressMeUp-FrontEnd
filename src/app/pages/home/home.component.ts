import { ProductosService } from 'src/app/shared/services/productos.service';
import { FilterProductsService } from './../../shared/services/filter-products.service';
import { Component, OnInit} from '@angular/core';
import { productosInterface } from 'src/app/models/productos.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  
  isActive!: boolean;
  productos : productosInterface[] = [];

  constructor(private FilterProductsService : FilterProductsService , 
    private ProductosService : ProductosService , private auth: AuthService,
    public themeService : ThemeService) {
    }
    
  
  ngOnInit(): void {  
    
    
    this.FilterProductsService.searchActive.subscribe(value => {
      this.isActive = value;

    })

    this.ProductosService.productsApi.subscribe(value => {
      this.productos = value;
    })
  }


}
