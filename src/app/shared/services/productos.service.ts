import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private url = "Http://localhost:5000/products";
  
  private productSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  public productsApi = this.productSubject.asObservable(); 
  
  constructor(private http: HttpClient) { 
    this.getProductos();
  }

  getProductos(){
    return this.http.get(this.url).subscribe((res: any ) => {
      this.productSubject.next(res)
    })
  }

}
