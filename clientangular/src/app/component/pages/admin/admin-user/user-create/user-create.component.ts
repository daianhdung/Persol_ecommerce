import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { RoleService } from 'app/services/roleService/role.service';
import { UserService } from 'app/services/userService/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent {
  roleList: any[] = [];

  isSubmitted: boolean = false;

  formData = this.formBuilder.group({
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
    password: ['',[ Validators.required, , Validators.minLength(6)]],
    role: ['', Validators.required],
  });

  constructor(
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private userService: UserService
  ) {
    this.roleService.getAllRole().subscribe({
      next: (response) => {
        this.roleList = response.data;
      },
      error: error => console.log(error)
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.isSubmitted = true;
    if (this.formData.valid) {
      console.log(this.formData.value);
      this.spinner.show();
      this.userService.createUser(this.formData.value).subscribe({
        next: (response) => {
          this.formData.reset();
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
}
