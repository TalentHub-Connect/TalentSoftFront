import { TestBed } from '@angular/core/testing';

import { offerService } from './offer.service';

describe('ConvocatoriaService', () => {
  let service: offerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(offerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
