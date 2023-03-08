import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from 'app/services/brandService/brand.service';
import { CategoryService } from 'app/services/categoryService/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.scss'],
})
export class UpdateBrandComponent {
  listCategory: any[] = [];

  listCheckCategoryIds : any[] = []
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
      this.categoryService.getAllCategory(),
      this.brandService.getBrandById(this.id),
    ]).subscribe({
      next: ([categoryResponse, brandResponse]) => {
        this.listCategory = categoryResponse.data;
        this.formData.controls['name'].setValue(brandResponse.data.name);
        brandResponse.data.categories.map((item: any) => {
          this.listCheckCategoryIds.push(item.id)
        });
      },
      error: (error) => console.log(error),
    });
  }

  handleCheckCategoryId(id: any) {
    const isChecked = this.listCheckCategoryIds.includes(id);
    if (isChecked) {
      this.listCheckCategoryIds = this.listCheckCategoryIds.filter((item) => item !== id);
    } else {
      this.listCheckCategoryIds.push(id);
    }
  }

  onSingleSelected(event: any) {
    const file = event.target.files[0];
    // this.formData.controls['mainImage'].setValue(file);
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.listCheckCategoryIds);
    if (this.formData.valid  && this.listCheckCategoryIds.length > 0) {

      const nameValue = this.formData.controls['name'].value;
      const categoryValue = this.listCheckCategoryIds
      // const imageMain = this.formData.controls['mainImage'].value;

      const dataRequest = {
        name: nameValue,
        categories: categoryValue,
        // image: imageMain
      }
      this.spinner.show();
      this.brandService.updateBrand( this.id ,dataRequest).subscribe({
        next: (response) => {
          this.spinner.hide();
          console.log(response);
          this.toastr.success(response.message)
        },
        error: (response) => {
          this.spinner.hide();
          console.log(response);
          this.toastr.error(response.message)
        },
      });
    }
  }
}
