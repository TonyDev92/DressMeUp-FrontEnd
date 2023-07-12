import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUrl: string = "";
  title = 'dressmeup';
  show: boolean = false;
  userId: string = "";

  constructor(private Router: Router ) {
    Router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        this.showcontent();
      }
    })
  }
  
  ngOnInit(): void {
    this.currentUrl = this.Router.url;
    
    this.showcontent();
  
  }
  showcontent() {
    this.show = this.currentUrl !== '/' && !this.currentUrl.includes('/login') && !this.currentUrl.includes('/register') && !this.currentUrl.includes('/carrito/pagos');
  }
  
}
