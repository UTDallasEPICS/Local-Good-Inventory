import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFamilyMemberComponent } from './newfamilymember.component';

describe('Appointment2Component', () => {
  let component: NewFamilyMemberComponent;
  let fixture: ComponentFixture<NewFamilyMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFamilyMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFamilyMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
