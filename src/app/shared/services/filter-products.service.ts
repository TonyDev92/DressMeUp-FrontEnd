import { Injectable } from '@angular/core';
import  { BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FilterProductsService {

  private subject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private subjectProducts: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  searchActive = this.subject.asObservable();

  filterProducts = this.subjectProducts.asObservable();

  constructor() { }
  setProducts(value : string): void{
    this.subjectProducts.next(value);
    
  }
  searcher(value: boolean): void{
    this.subject.next(value);
  }


}
