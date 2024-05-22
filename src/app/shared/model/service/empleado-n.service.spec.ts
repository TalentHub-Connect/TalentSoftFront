import { TestBed } from '@angular/core/testing';

import { EmpleadoNService } from './empleado-n.service';

describe('EmpleadoNService', () => {
  let service: EmpleadoNService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadoNService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
