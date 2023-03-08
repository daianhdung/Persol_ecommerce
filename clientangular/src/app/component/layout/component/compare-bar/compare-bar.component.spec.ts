import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareBarComponent } from './compare-bar.component';

describe('CompareBarComponent', () => {
  let component: CompareBarComponent;
  let fixture: ComponentFixture<CompareBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
