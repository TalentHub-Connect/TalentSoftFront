import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesCapacitacionComponent } from './detalles-capacitacion.component';

describe('DetallesCapacitacionComponent', () => {
  let component: DetallesCapacitacionComponent;
  let fixture: ComponentFixture<DetallesCapacitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetallesCapacitacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallesCapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
