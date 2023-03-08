import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  private wordDownloadAPI = environment.apiUrl + 'word';

  constructor(private http: HttpClient) {}

  downloadProduct(id: any):Observable<any>{

    return this.http.get(this.wordDownloadAPI + '/' + id, {
      responseType: 'blob'
    })
  }
}
