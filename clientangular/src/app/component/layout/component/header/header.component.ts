import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginService } from 'app/services/authService/login.service';
import { BrandService } from 'app/services/brandService/brand.service';
import { FilterService } from 'app/services/productService/filter.service';
import { ProductService } from 'app/services/productService/product.service';
import { TrackIpService } from 'app/services/trackipService/track-ip.service';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  imgBrandAPI = environment.imgBrandAPI;

  visitorCount: any;
  navHead = [
    {
      id: 1,
      name: 'Sunglasses',
      brands: [{ id: '', name: '', image: '' }],
    },
    {
      id: 2,
      name: 'Glasses',
      brands: [{ id: '', name: '', image: '' }],
    },
    {
      id: 3,
      name: 'Lenses',
      brands: [{ id: '', name: '', image: '' }],
    },
  ];

  constructor(
    private loginService: LoginService,
    private brandService: BrandService,
    private filterService: FilterService,
    private trackIpService: TrackIpService,
    private toastr: ToastrService,
    private productService: ProductService
  ) {
    this.navHead.map((item) => {
      this.brandService.getBrandsByCategoryId(item.id).subscribe({
        next: (repsonse) => {
          item.brands = repsonse.data;
        },
        error: (error) => console.log(error),
      });
    });
  }

  isAuthenticated() {
    return this.loginService.isUserAuthenticated();
  }

  getUserInform() {
    return this.loginService.getUserInform();
  }

  logout() {
    this.loginService.logout();
    this.toastr.success('Logout success');
  }

  filterBrandByCate(idCate: any, idBrand: any) {
    this.filterService.handleCheckBrandByCategory(idCate, idBrand);
  }

  ngOnInit() {
    this.trackIpService.getVisitorCount().subscribe({
      next: (response) => (this.visitorCount = response.data),
    });
  }

  timeoutId: any;
  listProductSearch: any = [];
  imgProductAPI = environment.imgProductAPI;
  loading = false;
  onChangeSearch(event: any) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.loading = true;
    this.timeoutId = setTimeout(() => {
      const request = {
        keyword: event.target.value,
      };
      if (event.target.value) {
        this.productService.getProductByFilter(request).subscribe({
          next: (response) => {
            this.listProductSearch = response.data.data;
          },
          error: (error) => console.log(error),
          complete: () => {
            this.loading = false;
          },
        });
      }
    }, 500);
  }
}
