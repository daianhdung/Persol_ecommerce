import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'app/services/authService/login.service';
import { UserService } from 'app/services/userService/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  profileTemplate = false;
  id: any;

  isSubmitted: boolean = false;

  formDataProfile = this.formBuilder.group({
    fullname: ['', Validators.required],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ],
    ],
    phone: ['', Validators.required],
    address: ['', Validators.required],
  });

  //For form Data Password
  formDataPassword = this.formBuilder.group(
    {
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', Validators.required],
    }
  );

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    route.paramMap.subscribe((params) => {
      const action = params.get('action');
      if (action == 'profile') {
        this.profileTemplate = true;
      } else if (action == 'password') {
        this.profileTemplate = false;
      }
    });
  }


  ngOnInit() {
    this.id = this.loginService.getUserInform().id;
    this.userService.getUserById(this.id).subscribe({
      next: (response) => {
        const data = response.data
        this.formDataProfile.controls['fullname'].setValue(data.fullname);
        this.formDataProfile.controls['email'].setValue(data.email);
        this.formDataProfile.controls['phone'].setValue(data.phone);
        this.formDataProfile.controls['address'].setValue(data.address);
      },
      error: (error) => console.log(error),
    });
  }

  onSubmitProfile() {
    this.isSubmitted = true;
    if (this.formDataProfile.valid) {
      console.log(this.formDataProfile.value);
      this.spinner.show();
      this.userService.updateUser(this.id, this.formDataProfile.value).subscribe({
        next: (response) => {
          this.spinner.hide();
          this.toastr.success(response.message)
        },
        error: (response) => {
          this.spinner.hide();
          this.toastr.error(response.message)
        },
      });
    }
  }

  onSubmitPassword() {
    this.isSubmitted = true;
    if (this.formDataPassword.valid) {
      this.spinner.show();
      this.userService.updateUser(this.id, this.formDataPassword.value).subscribe({
        next: (response) => {
          this.spinner.hide();
          this.toastr.success(response.message)
        },
        error: (response) => {
          this.spinner.hide();
          if(response.status == 400){
            this.toastr.error("Mật khẩu cũ không đúng")
          }
        },
      });
    }
  }
}
