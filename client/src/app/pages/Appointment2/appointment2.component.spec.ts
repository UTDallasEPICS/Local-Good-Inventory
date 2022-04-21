import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Appointment2Component } from './appointment2.component';

describe('Appointment2Component', () => {
  let component: Appointment2Component;
  let fixture: ComponentFixture<Appointment2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Appointment2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Appointment2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
