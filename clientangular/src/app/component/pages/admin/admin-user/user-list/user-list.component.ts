import { Component } from '@angular/core';
import { UserService } from 'app/services/userService/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  userList: any[] = [];
  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.userService.getAllUser().subscribe({
      next: (response) => {
        this.userList = response.data;
      },
      error: (error) => console.log(error),
    });
  }

  deleteUser(id: any, name: any) {
    if (confirm('Are you sure to delete ' + name)) {
      this.userService.deleteUser(id).subscribe({
        next: (response) => {
          this.userList = this.userList.filter((item) => item.id !== id);
          this.toastr.success('success', response.message);
        },
        error: (error) => {
          this.toastr.error('error', error.message);
        },
      });
    }
  }
}
