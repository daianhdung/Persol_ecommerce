import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GeoLocationService } from 'app/services/geolocationService/geo-location.service';
import { interval, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  latitude!: number;
  longitude!: number;
  address!: string;

  time!: string;
  date!: string;
  private clock!: Observable<Date>;
  private clockSubscription!: Subscription;

  constructor(
    private geolocationService: GeoLocationService,
    private router: Router
  ) {
    this.clock = interval(1000).pipe(map(() => new Date()));
  }

  isRouteActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  ngOnInit() {
    this.clockSubscription = this.clock.subscribe((currentTime) => {
      this.time = currentTime.toLocaleTimeString();
      this.date = currentTime.toLocaleDateString();
    });

    // this.geolocationService.getAddress('d5 nguyen gia tri').subscribe(
    //   (response) => {
    //     console.log(response);
    //     console.log(response.Results[0]);
    //     this.address = response.Results[0].address;
    //   },
    //   (error) => console.log(error)
    // );
  }

  ngOnDestroy() {
    this.clockSubscription.unsubscribe();
  }
}
