import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesIncidenteComponent } from './detalles-incidente.component';

describe('DetallesIncidenteComponent', () => {
  let component: DetallesIncidenteComponent;
  let fixture: ComponentFixture<DetallesIncidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetallesIncidenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallesIncidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
