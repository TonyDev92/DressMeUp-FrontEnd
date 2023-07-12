import { ThemeService } from '../../services/theme.service';
import { FilterProductsService } from './../../services/filter-products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
    search: boolean = false;
    filteredProducts='';

    constructor(private FilterProductsService : FilterProductsService,
      public themeService : ThemeService
      ) { }

    setSearch(){
      !this.search ? this.search = true : this.search = false;
      this.FilterProductsService.searcher(this.search);
      this.FilterProductsService.setProducts(this.filteredProducts)
    }
    onInputChange(): void {
      this.FilterProductsService.setProducts(this.filteredProducts);
    }
    ngOnInit(): void {
      this.FilterProductsService.searchActive.subscribe(value => {
        this.search = value;
      })
    }
    
}
