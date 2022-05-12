import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinCompleteComponent } from './checkin-complete.component';

describe('CheckinCompleteComponent', () => {
  let component: CheckinCompleteComponent;
  let fixture: ComponentFixture<CheckinCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckinCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
