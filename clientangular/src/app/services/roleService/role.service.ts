import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private roleAllAPI = environment.apiUrl + 'roles';

  constructor(private http: HttpClient) { }

  getAllRole():Observable <any>{
    return this.http.get(this.roleAllAPI)
  }
}
