import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExeptionPageComponent } from './exeption-page.component';

describe('ExeptionPageComponent', () => {
  let component: ExeptionPageComponent;
  let fixture: ComponentFixture<ExeptionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExeptionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExeptionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
