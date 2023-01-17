import { TestBed } from '@angular/core/testing';

import { PaymentControlService } from './payment-control.service';

describe('PaymentControlService', () => {
  let service: PaymentControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
