import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentControlListComponent } from './payment-control-list.component';

describe('PaymentControlListComponent', () => {
  let component: PaymentControlListComponent;
  let fixture: ComponentFixture<PaymentControlListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentControlListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentControlListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
