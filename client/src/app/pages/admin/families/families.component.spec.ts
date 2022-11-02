import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliesComponent } from './families.component';

describe('FamiliesComponent', () => {
  let component: FamiliesComponent;
  let fixture: ComponentFixture<FamiliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamiliesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
