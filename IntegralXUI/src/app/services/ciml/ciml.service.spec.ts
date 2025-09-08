import { TestBed } from '@angular/core/testing';

import { CimlService } from './ciml.service';

describe('CimlService', () => {
  let service: CimlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CimlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
