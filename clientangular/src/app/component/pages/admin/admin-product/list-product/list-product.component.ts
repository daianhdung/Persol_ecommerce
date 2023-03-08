import { Component } from '@angular/core';
import { ProductService } from 'app/services/productService/product.service';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent {
  productList: any[] = [];

  productImagePI = environment.imgProductAPI;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.productService.getAllProduct().subscribe({
      next: (response) => {
        this.productList = response.data;
      },
      error: (error) => console.log(error),
    });
  }

  deleteProduct(id: any, name: any) {
    if (confirm('Are you sure to delete ' + name)) {
      this.productService.deleteProduct(id).subscribe({
        next: (response) => {
          this.productList = this.productList.filter((item) => item.id !== id);
          this.toastr.success(response.message);
        },
        error: (response) => this.toastr.error(response.message),
      });
    }
  }
}
