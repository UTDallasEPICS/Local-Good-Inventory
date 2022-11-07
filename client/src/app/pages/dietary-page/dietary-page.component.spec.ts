import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietaryPageComponent } from './dietary-page.component';

describe('DietaryPageComponent', () => {
  let component: DietaryPageComponent;
  let fixture: ComponentFixture<DietaryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietaryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
