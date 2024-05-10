import { TestBed } from '@angular/core/testing';

import { CurriculumDialogService } from './curriculum-dialog.service';

describe('CurriculumDialogService', () => {
  let service: CurriculumDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurriculumDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
