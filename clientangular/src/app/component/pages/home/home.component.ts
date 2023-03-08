import { Component } from '@angular/core';
import { BrandService } from 'app/services/brandService/brand.service';
import { FilterService } from 'app/services/productService/filter.service';
import { ProductService } from 'app/services/productService/product.service';
import { environment } from 'environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  listBrand: any[] = [];

  imgBrandAPI = environment.imgBrandAPI
  imgProductAPI = environment.imgProductAPI

  listCheckBrandIds: any[] = [];
  listTopSellProduct: any[] = []
  listFeatureProduct: any[] = []
  listBestDealProduct: any[] = []

  constructor(
    private brandService: BrandService,
    private filterService: FilterService,
    private spinner: NgxSpinnerService,
    private productService: ProductService
  ) {
    
  }

  handleCheckBrandId(id: any) {
    this.filterService.handleCheckBrand(id);
  }

  ngOnInit() {
    this.spinner.show();
    forkJoin([this.brandService.getAllBrand(),
    this.productService.getAllTopSellingProduct(),
    this.productService.getAllFeatureProduct(),
    this.productService.getAllBestDealProduct()]).subscribe({
      next: ([brandReponse, productTopSellRespose, productFeatureResponse, productBestdealResponse]) => {
        this.listBrand = brandReponse.data;
        this.listTopSellProduct = productTopSellRespose.data
        this.listFeatureProduct = productFeatureResponse.data
        this.listBestDealProduct = productBestdealResponse.data
      },
      error: (repsonse) => {
        console.log(repsonse.message);
        this.spinner.hide();
      },
      complete: () => this.spinner.hide(),
    });
  }
}
