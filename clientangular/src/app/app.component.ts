import { Component, HostListener } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CookieService } from './services/storageService/cookie.service';
import { TrackIpService } from './services/trackipService/track-ip.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Persol';

  constructor(
    private spinner: NgxSpinnerService,
    private trackIpService: TrackIpService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    const newVisitorKey = '$2a$10$rIGqLQIOCHWHh95Kvs4te.Q4drx4H5Nmunakg9MDL5zYA1IYhb2NG';
    const sessionStorageVisitor = sessionStorage.getItem('visitor');
    if (!sessionStorageVisitor || sessionStorageVisitor !== newVisitorKey) {
      sessionStorage.setItem('visitor', newVisitorKey);
      this.trackIpService.getIpUser().subscribe({
        next: (response) => {
          this.trackIpService.newVisitor(response).subscribe({
            next: (responseVisit) => console.log(responseVisit),
            error: (error) => console.log(error),
          });
        },
        error: (error) => console.log(error),
      });
    }
  }

  @HostListener('window:unload', ['$event'])
  onUnload(event: Event) {
    
    console.log('User is leaving the page');
  }
}
