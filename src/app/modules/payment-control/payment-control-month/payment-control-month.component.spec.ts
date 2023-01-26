import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentControlMonthComponent } from './payment-control-month.component';

describe('PaymentControlMonthComponent', () => {
  let component: PaymentControlMonthComponent;
  let fixture: ComponentFixture<PaymentControlMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentControlMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentControlMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
