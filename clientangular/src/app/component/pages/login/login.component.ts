import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginService } from 'app/services/authService/login.service';
import { CookieService } from 'app/services/storageService/cookie.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isSubmitted: boolean = false;

  public formData = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private cookieService: CookieService,
    private toastr: ToastrService, private router: Router, private spinner: NgxSpinnerService) {}


  public submitForm(): void {
    this.isSubmitted = true
    if (this.formData.valid) {
      this.spinner.show();
      this.loginService.login(this.formData.value).subscribe({
        next: response => {
          if(response.success){
            this.cookieService.set('jwtToken', response.data.authorisation.token, response.data.authorisation.expiration)
            console.log(response);
            if(response.data.user.role_id == 1){
              this.router.navigate(['/admin-dashboard'])
            }else if(response.data.user.role_id == 2){
              this.router.navigate(['/home'])
            }
          }
        },
        error: response => {
          console.error(response);
          this.toastr.error(response.error.message)
          this.spinner.hide()
        },
        complete: () => this.spinner.hide()
      })
    }
  }

}
