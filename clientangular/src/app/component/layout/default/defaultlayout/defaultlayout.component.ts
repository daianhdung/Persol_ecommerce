import { Component } from '@angular/core';
import {Router } from '@angular/router';



@Component({
  selector: 'app-defaultlayout',
  templateUrl: './defaultlayout.component.html',
  styleUrls: ['./defaultlayout.component.scss']
})
export class DefaultlayoutComponent {

  showFooter: boolean = false;
  activeRoute!: any;

  constructor(private router: Router) {}

  isRouteActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

}
