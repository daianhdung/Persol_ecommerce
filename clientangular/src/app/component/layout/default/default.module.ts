import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { HomeComponent } from '../../pages/home/home.component';
import { DetailComponent } from '../../pages/detail/detail.component';
import { CarouselComponent } from '../component/carousel/carousel/carousel.component';
import { ContactComponent } from 'app/component/pages/contact/contact.component';
import { ProductComponent } from 'app/component/pages/product/product.component';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { SidebarFilterComponent } from '../component/sidebar-filter/sidebar-filter.component';
import { ListItemComponent } from '../component/list-item/list-item.component';
import { CompareComponent } from 'app/component/pages/compare/compare.component';
import { CompareBarComponent } from '../component/compare-bar/compare-bar.component';
import { FormModule, HeaderComponent } from '@coreui/angular';


@NgModule({
  declarations: [
    HomeComponent, 
    DetailComponent,
    ContactComponent,
    ProductComponent,
    SidebarFilterComponent,
    ListItemComponent,
    CompareComponent,
    CompareBarComponent,
  ],
  imports: [
    CommonModule,
    DefaultRoutingModule,
    CarouselComponent,
    ReactiveFormsModule,
    SwiperModule,
    FormsModule
  ]
})
export class DefaultModule { }
