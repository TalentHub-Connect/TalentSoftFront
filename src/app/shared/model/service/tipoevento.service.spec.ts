import { TestBed } from '@angular/core/testing';

import { TipoeventoService } from './tipoevento.service';

describe('TipoeventoService', () => {
  let service: TipoeventoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoeventoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
