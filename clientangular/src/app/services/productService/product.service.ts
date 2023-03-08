import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productAPI = environment.apiUrl + 'product';
  private productAllAPI = environment.apiUrl + 'products';

  private productDetailAPI = environment.apiUrl + 'product-detail';

  constructor(private http: HttpClient) { }

  getAllProduct():Observable<any>{
    return this.http.get(this.productAllAPI)
  }

  getProductById(id: any):Observable<any>{
    return this.http.get(this.productAPI + '/' + id)
  }

  //Customized get

  getAllTopSellingProduct():Observable <any>{
    return this.http.get(this.productAPI + '-topsell')
  }
  getAllFeatureProduct():Observable <any>{
    return this.http.get(this.productAPI + '-feature')
  }
  getAllBestDealProduct():Observable <any>{
    return this.http.get(this.productAPI + '-bestdeal')
  }


  getProductByFilter(data : any) :Observable<any>{
    return this.http.post(this.productAPI + "-filter", data)
  }

  getListProductByIds(id: any):Observable <any>{
    return this.http.get(this.productDetailAPI + `?ids=${id}`)
  }

  createProduct(data:any):Observable <any>{
    return this.http.post(this.productAPI, data)
  }

  updateProduct(id:any , data:any):Observable <any>{
    return this.http.put(this.productAPI + `/${id}`, data)
  }

  deleteProduct(id:any) :Observable<any>{
    return this.http.delete(this.productAPI + `/${id}`)
  }
}
