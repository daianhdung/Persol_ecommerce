import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from 'app/component/pages/admin/admin-dashboard/admin-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { UserListComponent } from 'app/component/pages/admin/admin-user/user-list/user-list.component';
import { ListProductComponent } from 'app/component/pages/admin/admin-product/list-product/list-product.component';
import { CreateProductComponent } from 'app/component/pages/admin/admin-product/create-product/create-product.component';
import { UpdateProductComponent } from 'app/component/pages/admin/admin-product/update-product/update-product.component';
import { UserCreateComponent } from 'app/component/pages/admin/admin-user/user-create/user-create.component';
import { UserUpdateComponent } from 'app/component/pages/admin/admin-user/user-update/user-update.component';
import { ProfileComponent } from 'app/component/pages/profile/profile.component';
import { ListMailComponent } from 'app/component/pages/admin/admin-mail/list-mail/list-mail.component';
import { MailDetailComponent } from 'app/component/pages/admin/admin-mail/mail-detail/mail-detail.component';
import { CreateCategoryComponent } from 'app/component/pages/admin/admin-category/create-category/create-category.component';
import { UpdateCategoryComponent } from 'app/component/pages/admin/admin-category/update-category/update-category.component';
import { ListCategoryComponent } from 'app/component/pages/admin/admin-category/list-category/list-category.component';
import { CreateBrandComponent } from 'app/component/pages/admin/admin-brand/create-brand/create-brand.component';
import { UpdateBrandComponent } from 'app/component/pages/admin/admin-brand/update-brand/update-brand.component';
import { ListBrandComponent } from 'app/component/pages/admin/admin-brand/list-brand/list-brand.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';




@NgModule({
  declarations: [
    AdminDashboardComponent,
    UserListComponent,
    UserCreateComponent,
    UserUpdateComponent,
    ListProductComponent,
    CreateProductComponent,
    UpdateProductComponent,
    ProfileComponent,
    ListMailComponent,
    MailDetailComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    ListCategoryComponent,
    CreateBrandComponent,
    UpdateBrandComponent,
    ListBrandComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CKEditorModule,
    

    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    
  ],
})
export class AdminModule { }
