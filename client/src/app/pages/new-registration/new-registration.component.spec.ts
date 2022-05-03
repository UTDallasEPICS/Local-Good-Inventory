import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRegistrationComponent } from './new-registration.component';

describe('NewRegistrationComponent', () => {
  let component: NewRegistrationComponent;
  let fixture: ComponentFixture<NewRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
