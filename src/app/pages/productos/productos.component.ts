import { FilterProductsService } from './../../shared/services/filter-products.service';
import { productosInterface } from 'src/app/models/productos.model';
import { ProductosService } from '../../shared/services/productos.service';


import { Component, OnInit } from '@angular/core';
import { __values } from 'tslib';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit{
  
  props: productosInterface[] = [];

  constructor (private ProductosService : ProductosService , 
    private FilterProductsService : FilterProductsService) { }

  ngOnInit(): void {
      this.ProductosService.productsApi.subscribe(value => {
        this.props = value;
      })
  }

}
