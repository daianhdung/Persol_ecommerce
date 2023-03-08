import { Component } from '@angular/core';
import { ContactService } from 'app/services/contactService/contact.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-mail',
  templateUrl: './list-mail.component.html',
  styleUrls: ['./list-mail.component.scss'],
})
export class ListMailComponent {
  listMail: any[] = [];

  constructor(
    private contactService: ContactService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.contactService.getAllMail().subscribe({
      next: (repsonse) => {
        this.listMail = repsonse.data;
        this.spinner.hide();
      },
      error: (error) => {
        console.log(error);
        this.spinner.hide();
      },
    });
  }

  deleteMail(id: any, name: any) {
    if (confirm('Are you sure to delete ' + name)) {
      this.contactService.deleteMail(id).subscribe({
        next: (response) => {
          this.listMail = this.listMail.filter((item) => item.id !== id);
          this.toastr.success('success', response.message);
        },
        error: (error) => {
          this.toastr.error('error', error.message);
        },
      });
    }
  }
}
