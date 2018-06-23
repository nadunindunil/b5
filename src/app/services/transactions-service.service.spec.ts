import { TestBed, inject } from '@angular/core/testing';

import { TransactionsServiceService } from './transactions-service.service';

describe('TransactionsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionsServiceService]
    });
  });

  it('should be created', inject([TransactionsServiceService], (service: TransactionsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
