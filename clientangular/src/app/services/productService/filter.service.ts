import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  request = {
    keyword: '',
    brandIds: [] as any[],
    categoryIds: [] as any[],
    sort: 'az',
    page: '',
  };

  constructor() {}

  filterChanged = new Subject<any>();

  handleCheckCategory = (id: any) => {
    const isChecked = this.request.categoryIds.includes(id);
    if (isChecked) {
      this.request.categoryIds = this.request.categoryIds.filter(
        (item) => item !== id
      );
    } else {
      this.request.categoryIds.push(id);
    }
    this.filterChanged.next(this.request);
  };

  handleCheckBrand = (id: any) => {
    console.log(this.request);
    const isChecked = this.request.brandIds.includes(id);
    if (isChecked) {
      this.request.brandIds = this.request.brandIds.filter(
        (item) => item !== id
      );
    } else {
      this.request.brandIds.push(id);
    }
    this.filterChanged.next(this.request);
  };

  handleCheckBrandByCategory(idCate:any, idBrand:any){
    const isCheckedCate = this.request.brandIds.includes(idCate);
    if(!isCheckedCate){
      this.request.categoryIds.push(idCate);
    }
    const isCheckedBrand = this.request.categoryIds.includes(idBrand);
    if(!isCheckedBrand){
      this.request.brandIds.push(idBrand);
    }
    this.filterChanged.next(this.request);
  }

  handleChangeSort(type: any) {
    this.request.sort = type;
    this.filterChanged.next(this.request);
  }

  handleChangePagination(page: any) {
    this.request.page = page;
    this.filterChanged.next(this.request);
  }

  handleSearchByKeyword(string:any){
    this.request.keyword = string
    this.filterChanged.next(this.request)
  }
}
