import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMemberInfo1Component } from './changememberinfo1.component';

describe('Appointment2Component', () => {
  let component: ChangeMemberInfo1Component;
  let fixture: ComponentFixture<ChangeMemberInfo1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeMemberInfo1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMemberInfo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
