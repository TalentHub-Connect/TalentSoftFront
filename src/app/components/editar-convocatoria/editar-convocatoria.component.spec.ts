import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarConvocatoriaComponent } from './editar-convocatoria.component';

describe('EditarConvocatoriaComponent', () => {
  let component: EditarConvocatoriaComponent;
  let fixture: ComponentFixture<EditarConvocatoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarConvocatoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarConvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
