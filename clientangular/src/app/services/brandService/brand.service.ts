import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private allBrandAPI = environment.apiUrl + 'brands';
  
  private brandAPI = environment.apiUrl + 'brand';


  constructor(private http: HttpClient) { }

  getAllBrand():Observable<any>{
    return this.http.get(this.allBrandAPI)
  }

  getBrandById(id:any) :Observable <any>{
    return this.http.get(this.brandAPI + `/${id}`)
  }

  getImageBrand( imageName: any):Observable<any>{
    return this.http.get(this.allBrandAPI + imageName)
  }

  getBrandsByCategoryId(idCate: any):Observable<any>{
    return this.http.get(environment.apiUrl + `categories/${idCate}/brands`)
  }

  createBrand(data: any) :Observable <any>{
    return this.http.post(this.brandAPI, data)
  }

  updateBrand( id:any ,data: any) :Observable <any>{
    return this.http.put(this.brandAPI + `/${id}`, data)
  }

  deleteBrand(id:any) :Observable<any>{
    return this.http.delete(this.brandAPI + `/${id}`)
  }
}
