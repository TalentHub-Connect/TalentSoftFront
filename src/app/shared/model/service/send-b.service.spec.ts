import { TestBed } from '@angular/core/testing';

import { SendBService } from './send-b.service';

describe('SendBService', () => {
  let service: SendBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
