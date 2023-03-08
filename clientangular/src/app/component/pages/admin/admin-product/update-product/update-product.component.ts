import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BrandService } from 'app/services/brandService/brand.service';
import { CategoryService } from 'app/services/categoryService/category.service';
import { ProductService } from 'app/services/productService/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent {
  listBrand: any[] = [];
  listCategory: any[] = [];
  id: any;
  product: any;

  public editor:any = ClassicEditor;
  data: any = ``;

  isSubmitted: boolean = false;

  mainImageFile: any = null;
  mainImageUrl: string = '';
  @ViewChild('fileInput') fileInput!: ElementRef;
  images: File[] = [];

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
    private route: ActivatedRoute,
    
  ) {
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

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(this.id).subscribe({
      next: (response) => {
        this.product = response.data;
        console.log(response);
        this.formData.controls['name'].setValue(this.product.name);
        this.formData.controls['price'].setValue(this.product.price);
        this.formData.controls['category'].setValue(this.product.category_id);
        this.formData.controls['brand'].setValue(this.product.brand_id);
        this.formData.controls['mainImage'].setValue(this.product.main_image);
        this.formData.controls['detail'].setValue(this.product.detail);
        // const reader = new FileReader();
        // reader.onload = (e) => (this.mainImageUrl = reader.result as string);
        // reader.readAsDataURL(this.mainImageFile);
      },
      error: (error) => console.log(error),
    });
  }

  onSingleSelected(event: any) {
    this.mainImageFile = event.target.files[0];
    this.formData.controls['mainImage'].setValue(this.mainImageFile);
    // if (this.mainImageFile) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => (this.mainImageUrl = reader.result as string);
    //   reader.readAsDataURL(this.mainImageFile);
    // }
  }
  // removeImage() {
  //   this.mainImageFile = null;
  //   this.mainImageUrl = '';
  //   this.formData.controls['mainImage'].setValue(this.mainImageFile);
  //   this.fileInput.nativeElement.value = '';
  // }

  onImagesSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.images.push(files[i]);
    }
  }

  onSubmit() {
    this.isSubmitted = true;

    console.log(this.formData.value);

    if (this.formData.valid) {
      console.log(this.formData.value);

      const nameValue = this.formData.controls['name'].value;
      const priceValue = this.formData.controls['price'].value;
      const categoryValue = this.formData.controls['category'].value;
      const brandValue = this.formData.controls['brand'].value;
      const detailValue = this.formData.controls['detail'].value;

      const dataRequest = {
        name: nameValue,
        price: priceValue,
        category: categoryValue,
        brand: brandValue,
        detail: detailValue
      }


      // const mainImageValue = this.formData.controls['mainImage'].value;
      // formDataRequest.append('mainImage', mainImageValue ? mainImageValue : '');

      // for (let i = 0; i < this.images.length; i++) {
      //   formDataRequest.append('images[]', this.images[i]);
      // }

   

      this.spinner.show();
      this.productService.updateProduct(this.id, dataRequest).subscribe({
        next: (response) => {
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
