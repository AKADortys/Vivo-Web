import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDropDownMenu } from './user-drop-down-menu';

describe('UserDropDownMenu', () => {
  let component: UserDropDownMenu;
  let fixture: ComponentFixture<UserDropDownMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDropDownMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDropDownMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
