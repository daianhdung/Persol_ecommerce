import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactService } from 'app/services/contactService/contact.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {

  isSubmitted: boolean = false;
  isSuccess: boolean = false;

  public formData = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ],
    ],
    message: ['', Validators.required],
  });

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) {}

  onSubmit() {
    this.isSubmitted = true;
    if (this.formData.valid) {
      this.spinner.show();
      this.contactService.createContact(this.formData).subscribe({
        next: () => {
          this.formData.reset();
          this.isSuccess = true;
          this.spinner.hide();
          window.scrollTo(0, 0);
        },
        error: () => {
          this.isSuccess = true;
          this.spinner.hide();
        },
      });
    }
  }
}
