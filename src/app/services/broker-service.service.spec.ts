import { TestBed, inject } from '@angular/core/testing';

import { BrokerServiceService } from './broker-service.service';

describe('BrokerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrokerServiceService]
    });
  });

  it('should be created', inject([BrokerServiceService], (service: BrokerServiceService) => {
    expect(service).toBeTruthy();
  }));
});
