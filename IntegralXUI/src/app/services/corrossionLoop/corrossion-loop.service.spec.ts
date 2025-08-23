import { TestBed } from '@angular/core/testing';

import { CorrossionLoopService } from './corrossion-loop.service';

describe('CorrossionLoopService', () => {
  let service: CorrossionLoopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorrossionLoopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
