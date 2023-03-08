import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompareService } from 'app/services/productService/compare.service';
import { DownloadService } from 'app/services/productService/download.service';
import { ProductService } from 'app/services/productService/product.service';
import { environment } from 'environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  id: any;
  product: any = {};
  compareList: any[] = [];

  toggleCompare = true;

  imgImageProductAPI = environment.imgProductImageAPI;
  imgProductAPI = environment.imgProductAPI;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private downWordService: DownloadService,
    private compareService: CompareService
  ) {
    window.scrollTo(0, 0);
    spinner.show();
    this.compareList = compareService.request;
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(this.id).subscribe({
      next: (response) => {
        this.product = response.data;
        console.log(response);
      },
      error: (error) => {
        console.log(error);
        this.spinner.hide();
      },
      complete: () => this.spinner.hide(),
    });
  }

  downloadWordProduct(id: any, fileName: string) {
    this.downWordService.downloadProduct(id).subscribe({
      next: (response: Blob) => {
        const downloadUrl = URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName + '.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      error: (error) => console.log(error),
    });
  }

  addItemCompare() {
    this.compareService.addCompareProductItem(this.product);
    this.toggleCompare = true;
  }

  onToggleChange(value: boolean) {
    this.toggleCompare = value;
  }
}
