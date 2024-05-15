import { TestBed } from '@angular/core/testing';

import { ComunicacionAspService } from './comunicacion-asp.service';

describe('ComunicacionAspService', () => {
  let service: ComunicacionAspService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunicacionAspService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
