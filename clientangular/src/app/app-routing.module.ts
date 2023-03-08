import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth/admin.guard';
import { UserGuard } from './auth/user.guard';
import { AdminlayoutComponent } from './component/layout/admin/adminlayout/adminlayout.component';
import { AuthenlayoutComponent } from './component/layout/auth/authenlayout/authenlayout.component';
import { DefaultlayoutComponent } from './component/layout/default/defaultlayout/defaultlayout.component';
import { CreateBrandComponent } from './component/pages/admin/admin-brand/create-brand/create-brand.component';
import { ListBrandComponent } from './component/pages/admin/admin-brand/list-brand/list-brand.component';
import { UpdateBrandComponent } from './component/pages/admin/admin-brand/update-brand/update-brand.component';
import { CreateCategoryComponent } from './component/pages/admin/admin-category/create-category/create-category.component';
import { ListCategoryComponent } from './component/pages/admin/admin-category/list-category/list-category.component';
import { UpdateCategoryComponent } from './component/pages/admin/admin-category/update-category/update-category.component';
import { AdminDashboardComponent } from './component/pages/admin/admin-dashboard/admin-dashboard.component';
import { ListMailComponent } from './component/pages/admin/admin-mail/list-mail/list-mail.component';
import { MailDetailComponent } from './component/pages/admin/admin-mail/mail-detail/mail-detail.component';
import { CreateProductComponent } from './component/pages/admin/admin-product/create-product/create-product.component';
import { ListProductComponent } from './component/pages/admin/admin-product/list-product/list-product.component';
import { UpdateProductComponent } from './component/pages/admin/admin-product/update-product/update-product.component';
import { UserCreateComponent } from './component/pages/admin/admin-user/user-create/user-create.component';
import { UserListComponent } from './component/pages/admin/admin-user/user-list/user-list.component';
import { UserUpdateComponent } from './component/pages/admin/admin-user/user-update/user-update.component';
import { CompareComponent } from './component/pages/compare/compare.component';
import { ContactComponent } from './component/pages/contact/contact.component';
import { DetailComponent } from './component/pages/detail/detail.component';
import { PageNotFoundComponent } from './component/pages/page-not-found/page-not-found.component';
import { ProductComponent } from './component/pages/product/product.component';
import { ProfileComponent } from './component/pages/profile/profile.component';
import { SignupComponent } from './component/pages/signup/signup.component';

const routes: Routes = [
  //Default Routes
  {
    path: '',
    component: DefaultlayoutComponent,
    // canActivate: [UserGuard],
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () =>
          import('./component/layout/default/default.module').then(
            (m) => m.DefaultModule
          ),
      },
      { path: 'detail/:id', component: DetailComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'product', component: ProductComponent },
      { path: 'compare', component: CompareComponent }
    ],
  },
  //Home Routes
  {
    path: '',
    component: AuthenlayoutComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'login',
        loadChildren: () =>
          import('./component/layout/auth/auth.module').then(
            (m) => m.AuthModule
          ),
      },
      { path: 'signup', component: SignupComponent },
    ],
  },
  {
    path: '',
    component: AdminlayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: '/admin-home', pathMatch: 'full' },
      {
        path: 'admin-home',
        loadChildren: () =>
          import('./component/layout/admin/admin.module').then(
            (m) => m.AdminModule
          ),
      },
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'admin-user-list', component: UserListComponent },
      { path: 'admin-user-create', component: UserCreateComponent },
      { path: 'admin-user-update/:id', component: UserUpdateComponent },
      { path: 'admin-product-list', component: ListProductComponent },
      { path: 'admin-product-create', component: CreateProductComponent },
      { path: 'admin-product-update/:id', component: UpdateProductComponent },
      { path: 'admin-profile/:action', component: ProfileComponent },
      { path: 'admin-mail', component: ListMailComponent },
      { path: 'admin-mail/:id', component: MailDetailComponent },
      { path: 'admin-category-list', component: ListCategoryComponent },
      { path: 'admin-category-create', component: CreateCategoryComponent },
      { path: 'admin-category-update/:id', component: UpdateCategoryComponent },
      { path: 'admin-brand-list', component: ListBrandComponent },
      { path: 'admin-brand-create', component: CreateBrandComponent },
      { path: 'admin-brand-update/:id', component: UpdateBrandComponent },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
