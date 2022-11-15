import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyEditComponent } from './family-edit.component';

describe('FamilyEditComponent', () => {
  let component: FamilyEditComponent;
  let fixture: ComponentFixture<FamilyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
