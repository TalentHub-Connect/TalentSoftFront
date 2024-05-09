import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCapacitacionComponent } from './agregar-capacitacion.component';

describe('AgregarCapacitacionComponent', () => {
  let component: AgregarCapacitacionComponent;
  let fixture: ComponentFixture<AgregarCapacitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarCapacitacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarCapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
