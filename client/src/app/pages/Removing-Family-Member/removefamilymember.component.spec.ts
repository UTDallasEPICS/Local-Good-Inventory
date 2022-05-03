import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveFamilyMemberComponent } from './removefamilymember.component';

describe('Appointment2Component', () => {
  let component: RemoveFamilyMemberComponent;
  let fixture: ComponentFixture<RemoveFamilyMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveFamilyMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveFamilyMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
