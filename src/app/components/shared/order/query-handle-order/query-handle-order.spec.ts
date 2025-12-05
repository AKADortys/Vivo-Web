import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryHandleOrder } from './query-handle-order';

describe('QueryHandleOrder', () => {
  let component: QueryHandleOrder;
  let fixture: ComponentFixture<QueryHandleOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryHandleOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryHandleOrder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
