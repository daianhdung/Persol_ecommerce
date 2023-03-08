import { TestBed } from '@angular/core/testing';

import { PublicRequestService } from './public-request.service';

describe('PublicRequestService', () => {
  let service: PublicRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
