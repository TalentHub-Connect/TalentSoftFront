import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarIncidenteComponent } from './editar-incidente.component';

describe('EditarIncidenteComponent', () => {
  let component: EditarIncidenteComponent;
  let fixture: ComponentFixture<EditarIncidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarIncidenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarIncidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
