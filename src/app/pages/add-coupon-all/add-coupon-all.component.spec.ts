import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCouponAllComponent } from './add-coupon-all.component';

describe('AddCouponAllComponent', () => {
  let component: AddCouponAllComponent;
  let fixture: ComponentFixture<AddCouponAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCouponAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCouponAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
