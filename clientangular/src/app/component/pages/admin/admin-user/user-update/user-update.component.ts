import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from 'app/services/roleService/role.service';
import { UserService } from 'app/services/userService/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent {
  roleList: any[] = [];
  id: any
  user:any = {}

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
    role: [ this.user.role?.name, Validators.required],
  });

  constructor(
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.roleService.getAllRole().subscribe({
      next: (response) => {
        this.roleList = response.data;
      },
      error: error => console.log(error)
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.userService.getUserById(this.id).subscribe({
      next: response => {
        this.user = response.data
        this.formData.controls['fullname'].setValue(this.user.fullname)
        this.formData.controls['email'].setValue(this.user.email)
        this.formData.controls['phone'].setValue(this.user.phone)
        this.formData.controls['address'].setValue(this.user.address)
        this.formData.controls['role'].setValue(this.user.role_id)
      },
      error: error => console.log(error)
    })
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.formData.valid) {
      console.log(this.formData.value);
      this.spinner.show();
      this.userService.updateUser(this.id, this.formData.value).subscribe({
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
