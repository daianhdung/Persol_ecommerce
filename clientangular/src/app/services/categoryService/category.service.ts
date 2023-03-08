import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private allCateAPI = environment.apiUrl + 'categories';
  private cateAPI = environment.apiUrl + 'category';

  constructor(private http: HttpClient) { }

  getAllCategory():Observable<any>{
    return this.http.get(this.allCateAPI)
  }

  getCategoryById(id:any) :Observable <any>{
    return this.http.get(this.cateAPI + `/${id}`)
  }

  createCategory(data: any) :Observable <any>{
    return this.http.post(this.cateAPI, data)
  }

  updateCategory( id:any ,data: any) :Observable <any>{
    return this.http.put(this.cateAPI + `/${id}`, data)
  }

  deleteCategory(id:any) :Observable<any>{
    return this.http.delete(this.cateAPI + `/${id}`)
  }
}
