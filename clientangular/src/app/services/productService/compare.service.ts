import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompareService {
  compareChanged = new Subject<any>();
  request: any[];

  constructor(private toastr: ToastrService) {
    // Retrieve compare request from local storage or initialize with default values
    const storedRequest = localStorage.getItem('compareRequest');
    this.request = storedRequest
      ? JSON.parse(storedRequest)
      : [
          {
            id: '',
            name: '',
            image: '',
          },
          {
            id: '',
            name: '',
            image: '',
          },
          {
            id: '',
            name: '',
            image: '',
          },
        ];
  }

  // Save the compare request to local storage and emit compareChanged event
  private saveRequest() {
    localStorage.setItem('compareRequest', JSON.stringify(this.request));
    this.compareChanged.next(this.request);
  }

  checkIfItemInCompareList(id: any): boolean {
    return this.request.some((item) => {
      return item.id === id;
    });
  }

  addCompareProductItem(product: any) {
    if (!this.checkIfItemInCompareList(product.id)) {
      for (let i = 0; i < this.request.length + 1; i++) {
        if (i === this.request.length) {
          this.toastr.error('Cant add more product');
          break;
        }
        if (this.request[i].id === '') {
          this.request[i].id = product.id;
          this.request[i].name = product.name;
          this.request[i].image = product.main_image;
          this.saveRequest();
          break;
        }
      }
    } else {
      this.toastr.error('This product already in compare list');
    }
  }

  removeCompareProductItem(id: number) {
    this.request.map((item) => {
      if (item.id === id) {
        item.id = '';
        item.name = '';
        item.image = '';
      }
    });
    this.saveRequest();
  }

  deleteAllCompareRequest() {
    this.request.map((item) => {
      item.id = '';
      item.name = '';
      item.image = '';
    });
    this.saveRequest();
  }
}
