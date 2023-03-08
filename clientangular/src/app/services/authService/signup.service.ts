import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private signupAPI = environment.apiUrl + 'signup';

  constructor() { }

  public signup(fullname:string, email: string, password: string){
    return axios.post(this.signupAPI, {
      fullname,
      email,
      password
    })
  }
}
