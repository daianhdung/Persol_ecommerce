import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBrandComponent } from 'app/component/pages/admin/admin-brand/create-brand/create-brand.component';
import { ListBrandComponent } from 'app/component/pages/admin/admin-brand/list-brand/list-brand.component';
import { UpdateBrandComponent } from 'app/component/pages/admin/admin-brand/update-brand/update-brand.component';
import { CreateCategoryComponent } from 'app/component/pages/admin/admin-category/create-category/create-category.component';
import { ListCategoryComponent } from 'app/component/pages/admin/admin-category/list-category/list-category.component';
import { UpdateCategoryComponent } from 'app/component/pages/admin/admin-category/update-category/update-category.component';
import { AdminDashboardComponent } from 'app/component/pages/admin/admin-dashboard/admin-dashboard.component';
import { ListMailComponent } from 'app/component/pages/admin/admin-mail/list-mail/list-mail.component';
import { MailDetailComponent } from 'app/component/pages/admin/admin-mail/mail-detail/mail-detail.component';
import { CreateProductComponent } from 'app/component/pages/admin/admin-product/create-product/create-product.component';
import { ListProductComponent } from 'app/component/pages/admin/admin-product/list-product/list-product.component';
import { UserCreateComponent } from 'app/component/pages/admin/admin-user/user-create/user-create.component';
import { UserListComponent } from 'app/component/pages/admin/admin-user/user-list/user-list.component';
import { UserUpdateComponent } from 'app/component/pages/admin/admin-user/user-update/user-update.component';
import { ProfileComponent } from 'app/component/pages/profile/profile.component';


const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'admin-user-list', component: UserListComponent },
      { path: 'admin-user-create', component: UserCreateComponent },
      { path: 'admin-user-update/:id', component: UserUpdateComponent },
      { path: 'admin-product-list', component: ListProductComponent },
      { path: 'admin-product-create', component: CreateProductComponent },
      { path: 'admin-profile', component: ProfileComponent },
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
