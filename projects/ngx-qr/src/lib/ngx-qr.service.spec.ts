import { TestBed } from '@angular/core/testing';

import { NgxQrService } from './ngx-qr.service';

describe('NgxQrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxQrService = TestBed.get(NgxQrService);
    expect(service).toBeTruthy();
  });
});
