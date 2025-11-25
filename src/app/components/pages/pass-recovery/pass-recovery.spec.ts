import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassRecovery } from './pass-recovery';

describe('PassRecovery', () => {
  let component: PassRecovery;
  let fixture: ComponentFixture<PassRecovery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassRecovery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassRecovery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
