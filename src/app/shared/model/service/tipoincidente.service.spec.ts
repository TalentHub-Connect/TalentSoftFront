import { TestBed } from '@angular/core/testing';

import { TipoincidenteService } from './tipoincidente.service';

describe('TipoincidenteService', () => {
  let service: TipoincidenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoincidenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
