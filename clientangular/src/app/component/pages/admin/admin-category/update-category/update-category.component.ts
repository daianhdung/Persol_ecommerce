import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from 'app/services/brandService/brand.service';
import { CategoryService } from 'app/services/categoryService/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent {
  listBrand: any[] = [];

  listCheckBrandIds : any[] = []
  id: any;

  isSubmitted: boolean = false;

  formData = this.formBuilder.group({
    name: ['', Validators.required],
    // category: ['', Validators.required],
    // mainImage: ['', Validators.required],
  });

  constructor(
    private brandService: BrandService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    forkJoin([
      this.brandService.getAllBrand(),
      this.categoryService.getCategoryById(this.id),
    ]).subscribe({
      next: ([ brandResponse, categoryResponse]) => {
        this.listBrand = brandResponse.data;
        this.formData.controls['name'].setValue(categoryResponse.data.name);
        categoryResponse.data.brands.map((item: any) => {
          this.listCheckBrandIds.push(item.id)
        });
      },
      error: (error) => console.log(error),
    });
  }

  handleCheckBrandId(id: any) {
    const isChecked = this.listCheckBrandIds.includes(id);
    if (isChecked) {
      this.listCheckBrandIds = this.listCheckBrandIds.filter((item) => item !== id);
    } else {
      this.listCheckBrandIds.push(id);
    }
  }

  onSingleSelected(event: any) {
    const file = event.target.files[0];
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.listCheckBrandIds);
    if (this.formData.valid  && this.listCheckBrandIds.length > 0) {

      const nameValue = this.formData.controls['name'].value;
      const brandValue = this.listCheckBrandIds

      const dataRequest = {
        name: nameValue,
        brands: brandValue,
      }
      this.spinner.show();
      this.categoryService.updateCategory( this.id ,dataRequest).subscribe({
        next: (response) => {
          this.spinner.hide();
          this.toastr.success(response.message)
        },
        error: (response) => {
          this.spinner.hide();
          this.toastr.error(response.message)
        },
      });
    }
  }
}
