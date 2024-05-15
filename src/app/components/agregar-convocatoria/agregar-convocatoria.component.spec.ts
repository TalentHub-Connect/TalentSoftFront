import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarConvocatoriaComponent } from './agregar-convocatoria.component';

describe('AgregarConvocatoriaComponent', () => {
  let component: AgregarConvocatoriaComponent;
  let fixture: ComponentFixture<AgregarConvocatoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarConvocatoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarConvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
