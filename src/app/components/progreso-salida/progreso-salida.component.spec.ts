import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresoSalidaComponent } from './progreso-salida.component';

describe('ProgresoSalidaComponent', () => {
  let component: ProgresoSalidaComponent;
  let fixture: ComponentFixture<ProgresoSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgresoSalidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgresoSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
