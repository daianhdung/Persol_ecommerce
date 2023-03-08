import { Component } from '@angular/core';
import { LoginService } from 'app/services/authService/login.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  constructor(private loginService: LoginService){}

  isUserAuthenticated(){
    return this.loginService.isUserAuthenticated();
  }

  isAdminAuthenticated(){
    return this.loginService.isAdminAuthenticated();
  }
}
