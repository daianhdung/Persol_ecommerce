import { TestBed } from '@angular/core/testing';

import { TrackIpService } from './track-ip.service';

describe('TrackIpService', () => {
  let service: TrackIpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackIpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
