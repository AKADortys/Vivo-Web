import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryHandlerBar } from './query-handler-bar';

describe('QueryHandlerBar', () => {
  let component: QueryHandlerBar;
  let fixture: ComponentFixture<QueryHandlerBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryHandlerBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryHandlerBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
