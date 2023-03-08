import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenlayoutComponent } from './authenlayout.component';

describe('AuthenlayoutComponent', () => {
  let component: AuthenlayoutComponent;
  let fixture: ComponentFixture<AuthenlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenlayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
