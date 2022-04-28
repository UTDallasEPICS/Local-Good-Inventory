import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyOrMemberComponent } from './family-or-member.component';

describe('FamilyOrMemberComponent', () => {
  let component: FamilyOrMemberComponent;
  let fixture: ComponentFixture<FamilyOrMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyOrMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyOrMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
