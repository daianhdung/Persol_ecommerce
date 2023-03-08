import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BrandService } from 'app/services/brandService/brand.service';
import { CategoryService } from 'app/services/categoryService/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent {
  listBrand: any[] = [];

  listCheckBrandIds : any[] = []

  isSubmitted: boolean = false;

  formData = this.formBuilder.group({
    name: ['', Validators.required],
    // listBrand: [ this.formBuilder.array([]), Validators.required],
    // image: ['', Validators.required],
  });

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private brandService: BrandService
  ) {}

  handleCheckBrandId(id : any){
    const isChecked = this.listCheckBrandIds.includes(id);
    if (isChecked) {
      this.listCheckBrandIds = this.listCheckBrandIds.filter(
        (item) => item !== id
      );
    } else {
      this.listCheckBrandIds.push(id);
    }
  }


  ngOnInit() {
      this.brandService.getAllBrand().subscribe({
      next: ( BrandResponse) => {
        this.listBrand = BrandResponse.data;
      },
      error: (error) => console.log(error),
    });
  }


  onSubmit() {
    this.isSubmitted = true;
    console.log(this.listCheckBrandIds);

    if (this.formData.valid) {
      const formDataRequest = new FormData()

      const nameValue = this.formData.controls['name'].value
      formDataRequest.append('name', nameValue ? nameValue: '')

      for(let i = 0; i < this.listCheckBrandIds.length; i++){
        formDataRequest.append('brands[]', this.listCheckBrandIds[i])
      }

      this.spinner.show();
      this.categoryService.createCategory(formDataRequest).subscribe({
        next: (response) => {
          this.formData.reset();
          this.spinner.hide();
          this.toastr.success(response.message)
          console.log(response);
        },
        error: (response) => {
          this.spinner.hide();
          this.toastr.error(response.message)
        },
      });
    }
  }
}
