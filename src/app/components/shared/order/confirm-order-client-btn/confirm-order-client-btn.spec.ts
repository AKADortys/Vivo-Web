import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOrderClientBtn } from './confirm-order-client-btn';

describe('ConfirmOrderClientBtn', () => {
  let component: ConfirmOrderClientBtn;
  let fixture: ComponentFixture<ConfirmOrderClientBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmOrderClientBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmOrderClientBtn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
