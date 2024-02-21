import { TestBed } from '@angular/core/testing';

import { NgxGovukUtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: NgxGovukUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxGovukUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
