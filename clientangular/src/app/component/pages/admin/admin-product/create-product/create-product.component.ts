
import { Component, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BrandService } from 'app/services/brandService/brand.service';
import { CategoryService } from 'app/services/categoryService/category.service';
import { ProductService } from 'app/services/productService/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent {
  listBrand: any[] = [];
  listCategory: any[] = [];
  
  public editor:any = ClassicEditor;
  data: any = ``;

  isSubmitted: boolean = false;
  images : File[] = []

  formData = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    brand: ['', Validators.required],
    category: ['', Validators.required],
    mainImage: ['', Validators.required],
    detail: ['', Validators.required]
  });

  constructor(
    private brandService: BrandService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private productService: ProductService,
  ) {}

  ngOnInit() {
    forkJoin([
      this.brandService.getAllBrand(),
      this.categoryService.getAllCategory(),
    ]).subscribe({
      next: ([brandResponse, categoryResponse]) => {
        this.listBrand = brandResponse.data;
        this.listCategory = categoryResponse.data;
      },
      error: (error) => console.log(error),
    });
  }

  onSingleSelected(event: any) {
    const file = event.target.files[0];
    // this.formData.controls['mainImage'].setValue(file);
    console.log(file);
    this.formData.controls['mainImage'].setValue(file);
  }

  onImagesSelected(event: any) {
    const files : FileList = event.target.files;
    for(let i = 0 ; i < files.length; i++){
      this.images.push(files[i])
    }
  }

  onSubmit() {
    this.isSubmitted = true;

    console.log(this.images);

    if (this.formData.valid) {
      const formDataRequest = new FormData()
      console.log(this.formData.value);

      const nameValue = this.formData.controls['name'].value
      formDataRequest.append('name', nameValue ? nameValue: '')

      const priceValue = this.formData.controls['price'].value
      formDataRequest.append('price', priceValue ? priceValue: '')

      const categoryValue = this.formData.controls['category'].value
      formDataRequest.append('category', categoryValue ? categoryValue: '')

      const brandValue = this.formData.controls['brand'].value
      formDataRequest.append('brand', brandValue ? brandValue: '')

      const mainImageValue = this.formData.controls['mainImage'].value
      formDataRequest.append('mainImage', mainImageValue ? mainImageValue: '')

      const detailValue = this.formData.controls['detail'].value
      formDataRequest.append('detail', detailValue ? detailValue: '')

      
      for(let i = 0; i < this.images.length; i++){
        formDataRequest.append('images[]', this.images[i])
      }
      console.log(this.images);

      this.spinner.show();
      this.productService.createProduct(formDataRequest).subscribe({
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
