import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackIpService {

  apiVisitor = environment.apiUrl + 'visitor'

  constructor(private http: HttpClient) { }

  getIpUser(){
    return this.http.get('https://api.ipify.org?format=json')
  }

  getVisitorCount():Observable <any>{
    return this.http.get(this.apiVisitor)
  }

  newVisitor(data:any):Observable<any>{
    return this.http.post(this.apiVisitor, data)
  }

  updateEndtimeVitsit(data: any):Observable<any>{
    return this.http.put(this.apiVisitor, data)
  }
}
