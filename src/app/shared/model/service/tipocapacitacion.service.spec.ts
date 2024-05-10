import { TestBed } from '@angular/core/testing';

import { TipocapacitacionService } from './tipocapacitacion.service';

describe('TipocapacitacionService', () => {
  let service: TipocapacitacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipocapacitacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
