import { Component } from '@angular/core';
import { CategoryService } from 'app/services/categoryService/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss'],
})
export class ListCategoryComponent {
  categoryList: any[] = [];

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.categoryService.getAllCategory().subscribe({
      next: (response) => {
        this.categoryList = response.data;
      },
      error: (error) => console.log(error),
    });
  }

  deleteCategory(id: any, name: any) {
    if (confirm('Are you sure to delete ' + name)) {
      this.categoryService.deleteCategory(id).subscribe({
        next: (response) => {
          this.categoryList = this.categoryList.filter(
            (item) => item.id !== id
          );
          this.toastr.success(response.message);
        },
        error: (response) => this.toastr.error(response.message),
      });
    }
  }
}
