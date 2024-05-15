import { TestBed } from '@angular/core/testing';

import { CandidatestatusService } from './candidatestatus.service';

describe('CandidatestatusService', () => {
  let service: CandidatestatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidatestatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
