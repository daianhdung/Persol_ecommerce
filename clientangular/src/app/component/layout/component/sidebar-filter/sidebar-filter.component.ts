import { Component, Input } from '@angular/core';
import { BrandService } from 'app/services/brandService/brand.service';
import { CategoryService } from 'app/services/categoryService/category.service';
import { FilterService } from 'app/services/productService/filter.service';
import { environment } from 'environments/environment';
import { forkJoin, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sidebar-filter',
  templateUrl: './sidebar-filter.component.html',
  styleUrls: ['./sidebar-filter.component.scss']
})
export class SidebarFilterComponent {

  listBrand: any[] = []
  listCate: any[] = []

  listCheckCategoryIds : any[] = []
  listCheckBrandIds : any[] = []

  constructor(private brandService: BrandService, private categoryService: CategoryService, private filterService: FilterService){}

  handleCheckCategoryId(id : any){
    this.filterService.handleCheckCategory(id)
  }

  handleCheckBrandId(id : any){
    this.filterService.handleCheckBrand(id)
  }

  @Input() searchInput!:string;

  ngOnInit(){
    this.searchInput = this.filterService.request.keyword
    console.log(this.filterService.request);
    this.listCheckCategoryIds = this.filterService.request.categoryIds
    this.listCheckBrandIds = this.filterService.request.brandIds

    // Multi request at once and wait for all of them to complete
    forkJoin([
      this.brandService.getAllBrand(),
      this.categoryService.getAllCategory()
    ]).subscribe({
      next: ([brandResponse, categoryResponse]) => {
        this.listBrand = brandResponse.data
        this.listCate = categoryResponse.data
      },
      error: (response) => {
        console.log(response.message);
      }
    })
  }

  searchByKeyword(string: any){
    this.filterService.handleSearchByKeyword(string)
  }

}
