import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Position } from 'ngx-perfect-scrollbar';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeoLocationService {
  constructor(private http: HttpClient) {}

  // getPosition(): Observable<GeolocationPosition> {
  //   return new Observable((observer) => {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         observer.next(position);
  //         observer.complete();
  //       },
  //       (error) => observer.error(error)
  //     );
  //   });
  // }
  getAddress(address: string): Observable<any> {
    const url = `https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi?address=${address}`;
  
    const headers = {
      'X-RapidAPI-Key': '1993b319a6msh6f5beffce936a34p18bf6bjsnada4e78e6c74',
      'X-RapidAPI-Host': 'address-from-to-latitude-longitude.p.rapidapi.com'
    };
  
    const options = { headers: headers };
  
    return from(
      axios.get(url, options).then(response => {
        return response.data;
      }).catch(error => {
        throw error;
      })
    );
  }
}
