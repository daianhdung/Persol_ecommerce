import { Component } from '@angular/core';
import { BrandService } from 'app/services/brandService/brand.service';
import { CompareService } from 'app/services/productService/compare.service';
import { FilterService } from 'app/services/productService/filter.service';
import { ProductService } from 'app/services/productService/product.service';
import { environment } from 'environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  sortList = [
    {
      name: 'az',
      lable: 'Name: A-Z',
    },
    {
      name: 'za',
      lable: 'Name: A-Z',
    },
    {
      name: 'ascPrice',
      lable: 'Ascending Price',
    },
    {
      name: 'descPrice',
      lable: 'Descending Price',
    },
  ];

  pagination: any[] = [];

  listProduct: any[] = [];

  imgProductAPI = environment.imgProductAPI

  toggleCompare = true

  constructor(
    private productService: ProductService,
    private filterService: FilterService,
    private spinner: NgxSpinnerService,
    private compareService: CompareService
  ) {
    spinner.show();
  }

  private destroy$ = new Subject<void>();

  changeSort(event: Event) {
    const sortValue = (event.target as HTMLSelectElement).value;
    this.filterService.handleChangeSort(sortValue);
  }

  changePagination(event: Event) {
    window.scrollTo(0, 0);
    const clickedElement = event.currentTarget as HTMLElement;
    const pageValue = clickedElement.id;
    this.filterService.handleChangePagination(pageValue);
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.productService
      .getProductByFilter(this.filterService.request)
      .subscribe({
        next: (response) => {
          this.listProduct = response.data.data;
          this.pagination = response.data.links;
        },
        error: (error) => {
          console.log(error);
          this.spinner.hide();
        },
        complete: () => this.spinner.hide(),
      });

    this.filterService.filterChanged
      .pipe(takeUntil(this.destroy$))
      .subscribe((request) => {
        this.productService.getProductByFilter(request).subscribe({
          next: (repsonse) => {
            this.listProduct = repsonse.data.data;
            this.pagination = repsonse.data.links;
          },
          error: (error) => {
            console.log(error);
            this.spinner.hide();
          },

          complete: () => this.spinner.hide(),
        });
      });
  }

  addItemCompare(product:any){
    this.compareService.addCompareProductItem(product)
    this.toggleCompare = true
  }

  onToggleChange(value: boolean) {
    this.toggleCompare = value;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
