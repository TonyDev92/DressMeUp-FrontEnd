import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery/gallery.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../pipes/filter.pipe';
import { NavbarComponent } from '../../core/navbar/navbar.component';




@NgModule({
  declarations: [
    GalleryComponent,
    FilterPipe,
    HeaderComponent
  ],
  exports: [
    GalleryComponent,
    FilterPipe,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedmoduleModule { }
