import { TestBed } from '@angular/core/testing';

import { EmpleadoPService } from './empleado-p.service';

describe('EmpleadoPService', () => {
  let service: EmpleadoPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadoPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
