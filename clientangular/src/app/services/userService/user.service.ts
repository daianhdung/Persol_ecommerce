import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedInUser: any; // Property to store logged in user data

  private userAllAPI = environment.apiUrl + 'users';
  private userAPI = environment.apiUrl + 'user';

  constructor(private http: HttpClient) { }

  getAllUser():Observable <any> {
    return this.http.get(this.userAllAPI)
  }

  getUserById(id:any) :Observable <any>{
    return this.http.get(this.userAPI + `/${id}`)
  }

  createUser(data:any):Observable <any>{
    return this.http.post(this.userAPI, data)
  }

  deleteUser(id:any) :Observable<any>{
    return this.http.delete(this.userAPI + `/${id}`)
  }

  updateUser(id:any , data:any):Observable <any>{
    return this.http.put(this.userAPI + `/${id}`, data)
  }
}
