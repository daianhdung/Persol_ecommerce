import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BrandService } from 'app/services/brandService/brand.service';
import { CategoryService } from 'app/services/categoryService/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.scss']
})
export class CreateBrandComponent {

  listCategory: any[] = [];

  listCheckCategoryIds : any[] = []

  isSubmitted: boolean = false;

  formData = this.formBuilder.group({
    name: ['', Validators.required],
    image: ['', Validators.required],
  });

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private brandService: BrandService
  ) {}

  handleCheckCategoryId(id : any){
    const isChecked = this.listCheckCategoryIds.includes(id);
    if (isChecked) {
      this.listCheckCategoryIds = this.listCheckCategoryIds.filter(
        (item) => item !== id
      );
    } else {
      this.listCheckCategoryIds.push(id);
    }
  }


  ngOnInit() {
      this.categoryService.getAllCategory().subscribe({
      next: ( categoryResponse) => {
        this.listCategory = categoryResponse.data;
      },
      error: (error) => console.log(error),
    });
  }

  onSingleSelected(event: any) {
    const file = event.target.files[0];
    this.formData.controls['image'].setValue(file);
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.formData.valid && this.listCheckCategoryIds.length > 0) {
      const formDataRequest = new FormData()

      const nameValue = this.formData.controls['name'].value
      formDataRequest.append('name', nameValue ? nameValue: '')

      for(let i = 0; i < this.listCheckCategoryIds.length; i++){
        formDataRequest.append('categories[]', this.listCheckCategoryIds[i])
      }

      const imageValue = this.formData.controls['image'].value
      formDataRequest.append('image', imageValue ? imageValue: '')


      this.spinner.show();
      this.brandService.createBrand(formDataRequest).subscribe({
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
