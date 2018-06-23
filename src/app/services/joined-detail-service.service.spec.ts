import { TestBed, inject } from '@angular/core/testing';

import { JoinedDetailServiceService } from './joined-detail-service.service';

describe('JoinedDetailServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JoinedDetailServiceService]
    });
  });

  it('should be created', inject([JoinedDetailServiceService], (service: JoinedDetailServiceService) => {
    expect(service).toBeTruthy();
  }));
});
