import { productosInterface } from './../../models/productos.model';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit{

  classProducts : productosInterface[] = [];
  title!: string;
  constructor(
    private ProductosService: ProductosService,
    private route: ActivatedRoute) {}

    getProductsByClass(classValue: string): void{
      this.ProductosService.productsApi.subscribe(products => {
        this.classProducts = products.filter(product => product.class.toLowerCase() === classValue.toLowerCase())
      })
    }
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const classValue = params['class'];
        this.getProductsByClass(classValue);
        this.title = classValue.toUpperCase();
      })
    }

}
