import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresoDetallesComponent } from './progreso-detalles.component';

describe('ProgresoDetallesComponent', () => {
  let component: ProgresoDetallesComponent;
  let fixture: ComponentFixture<ProgresoDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgresoDetallesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgresoDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
