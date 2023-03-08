import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompareComponent } from 'app/component/pages/compare/compare.component';
import { ContactComponent } from 'app/component/pages/contact/contact.component';
import { ProductComponent } from 'app/component/pages/product/product.component';
import { DetailComponent } from '../../pages/detail/detail.component';
import { HomeComponent } from '../../pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'detail/:id', component: DetailComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'product', component: ProductComponent },
      { path: 'compare', component: CompareComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefaultRoutingModule {}
