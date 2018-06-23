import { TestBed, inject } from '@angular/core/testing';

import { AnalystServiceService } from './analyst-service.service';

describe('AnalystServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnalystServiceService]
    });
  });

  it('should be created', inject([AnalystServiceService], (service: AnalystServiceService) => {
    expect(service).toBeTruthy();
  }));
});
