import { Component } from '@angular/core';
import { FooterComponent } from '@coreui/angular';

@Component({
  selector: 'app-adminfooter',
  templateUrl: './adminfooter.component.html',
  styleUrls: ['./adminfooter.component.scss']
})
export class AdminfooterComponent extends FooterComponent{
  constructor() {
    super();
  }
}
