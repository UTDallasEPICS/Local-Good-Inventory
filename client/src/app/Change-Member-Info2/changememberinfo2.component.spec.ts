import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMemberInfo2Component } from './changememberinfo2.component';

describe('Appointment2Component', () => {
  let component: ChangeMemberInfo2Component;
  let fixture: ComponentFixture<ChangeMemberInfo2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeMemberInfo2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMemberInfo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
