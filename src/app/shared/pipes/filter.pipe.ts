import { Pipe, PipeTransform } from '@angular/core';
import { productosInterface } from '../../models/productos.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, ...args: string[]): productosInterface[] {
    const filteredProducts: productosInterface[] = [];
    
    for(const product of value){

      let nameProd = product.name.toLowerCase();

      let inp = args[0].toLowerCase();

      
      if(nameProd.indexOf(inp) > -1 ){
        filteredProducts.push(product)
      }
    }
    return filteredProducts;
  }

}
