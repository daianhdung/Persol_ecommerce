import { Component } from '@angular/core';
import { CompareService } from 'app/services/productService/compare.service';
import { ProductService } from 'app/services/productService/product.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
})
export class CompareComponent {

  productCompareList: any[] = []
  imgProductAPI = environment.imgProductAPI

  constructor(
    private compareService: CompareService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);

    const productIds = this.compareService.request.map((item) => item.id);

    this.productService.getListProductByIds(productIds).subscribe({
      next: response => {
        console.log(response);
        this.productCompareList = response.data
      }
    })
  }
}
