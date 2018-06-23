import { TestBed, inject } from '@angular/core/testing';

import { SimulatorServiceService } from './simulator-service.service';

describe('SimulatorServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimulatorServiceService]
    });
  });

  it('should be created', inject([SimulatorServiceService], (service: SimulatorServiceService) => {
    expect(service).toBeTruthy();
  }));
});
