import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesConvocatoriaComponent } from './detalles-convocatoria.component';

describe('DetallesConvocatoriaComponent', () => {
  let component: DetallesConvocatoriaComponent;
  let fixture: ComponentFixture<DetallesConvocatoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesConvocatoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallesConvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
