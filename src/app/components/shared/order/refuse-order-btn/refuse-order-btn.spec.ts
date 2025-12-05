import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefuseOrderBtn } from './refuse-order-btn';

describe('RefuseOrderBtn', () => {
  let component: RefuseOrderBtn;
  let fixture: ComponentFixture<RefuseOrderBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefuseOrderBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefuseOrderBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
