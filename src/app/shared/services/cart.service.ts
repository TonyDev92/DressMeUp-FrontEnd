import { HttpClient } from '@angular/common/http';
import { productosInterface } from './../../models/productos.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  private url = "Http://localhost:5000/users";
  cartItemCount: number = 0;
  private cartChangedSubject: Subject<void> = new Subject<void>();


  constructor(private http: HttpClient) { }

  private productsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  public products: Observable<productosInterface[]> = this.productsSubject.asObservable();

  get cartChanged(): Observable<void> {
    return this.cartChangedSubject.asObservable();
  }




  getProducts(userId: string): Observable<any> {
    
    return this.http.get(`${this.url}/${userId}`)
  }

  addToCart(product: productosInterface) { //Servicio para añadir elementos al carrito 

      const currentProducts = this.productsSubject.getValue();
      const updatedProducts = [...currentProducts, product];
      this.productsSubject.next(updatedProducts);
      this.cartChangedSubject.next()

  }

  deleteOfCart(product: productosInterface, index: number){
    
    const currentProducts = this.productsSubject.getValue();
    const updatedProducts = [...currentProducts];
    updatedProducts.splice(index, 1);
    this.productsSubject.next(updatedProducts);
    this.cartChangedSubject.next();
  }
  removeProducts(userId: string, productId: String): Observable<any> {
    this.cartChangedSubject.next()
    return this.http.put(`${this.url}/remove/${userId}`, { products: [productId] })
  }


  updateCart(cart: any, userId: string): Observable<any> {

    this.cartChangedSubject.next();
    return this.http.put(`${this.url}/updatecart/${userId}`, cart)

  }

  getcartItemCount(): number {
    const currentProducts = this.productsSubject.getValue();
    return currentProducts.length;
  
  }
}