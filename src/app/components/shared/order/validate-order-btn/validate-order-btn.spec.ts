import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateOrderBtn } from './validate-order-btn';

describe('ValidateOrderBtn', () => {
  let component: ValidateOrderBtn;
  let fixture: ComponentFixture<ValidateOrderBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidateOrderBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateOrderBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
