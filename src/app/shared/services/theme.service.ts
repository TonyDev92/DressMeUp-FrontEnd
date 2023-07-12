import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public currentTheme: 'light' | 'dark' = 'light';
  public themeClass$: BehaviorSubject<string> = new BehaviorSubject<string>('light-theme');

  constructor() { }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    
    this.themeClass$.next(this.currentTheme)
  }
  getCurrentTheme():'light' | 'dark'{
    return  this.currentTheme;
  }
}
