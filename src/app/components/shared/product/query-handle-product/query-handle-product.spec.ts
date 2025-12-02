import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryHandleProduct } from './query-handle-product';

describe('QueryHandleProduct', () => {
  let component: QueryHandleProduct;
  let fixture: ComponentFixture<QueryHandleProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryHandleProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryHandleProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
