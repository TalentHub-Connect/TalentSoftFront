import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCapacitacionComponent } from './editar-capacitacion.component';

describe('EditarCapacitacionComponent', () => {
  let component: EditarCapacitacionComponent;
  let fixture: ComponentFixture<EditarCapacitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarCapacitacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarCapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
