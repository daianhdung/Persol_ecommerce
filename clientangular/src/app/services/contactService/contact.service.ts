import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private mailAPI = environment.apiUrl + 'mail';
  private allMailAPI = environment.apiUrl + 'mails';

  constructor(private http : HttpClient) { }

  createContact(data : any) :Observable<any> {
    const dataJson = JSON.parse(JSON.stringify(data.value));
    return this.http.post(this.mailAPI, dataJson);
  }

  getAllMail() :Observable<any>{
    return this.http.get(this.allMailAPI);
  }

  deleteMail(id:any) :Observable<any>{
    return this.http.delete(this.mailAPI + `/${id}`)
  }
}
