import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'environments/environment';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'app/services/storageService/cookie.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  

  private loginAPI = environment.apiUrl + 'login';
  
  constructor(private http: HttpClient, private cookieService: CookieService, private jwtHelper: JwtHelperService ) { }


  public login(data:any) : Observable <any>{
    return this.http.post(this.loginAPI, data)
  }

  public logout(): void {
    this.cookieService.remove('jwtToken');
  }
  

  public isAdminAuthenticated(): boolean {
    if(this.cookieService.get('jwtToken')){
      const token = this.cookieService.get('jwtToken')
      if(token){
        const decodedToken = this.jwtHelper.decodeToken(token)
        if(decodedToken.sub1.roleId == 1){
          return true
        }
      }
    }
    return false;
  }
  public isUserAuthenticated(): boolean {
    if(this.cookieService.get('jwtToken')){
      const token = this.cookieService.get('jwtToken')
      if(token){
        const decodedToken = this.jwtHelper.decodeToken(token)
        if(decodedToken.sub1.roleId == "2"){
          return true
        }
      }
    }
    return false;
  }

  public getToken(): string {
    return this.cookieService.get('jwtToken') || '';
  }

  public getUserInform(): any{
    if(this.cookieService.get('jwtToken')){
      const token = this.cookieService.get('jwtToken')
      
      if(token){
        const decodedToken = this.jwtHelper.decodeToken(token)
        return decodedToken.sub1
      }
    }
  }

}