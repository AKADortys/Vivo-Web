import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryHandleUser } from './query-handle-user';

describe('QueryHandleUser', () => {
  let component: QueryHandleUser;
  let fixture: ComponentFixture<QueryHandleUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryHandleUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryHandleUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
