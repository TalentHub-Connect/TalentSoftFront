import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAspiranteComponent } from './editar-aspirante.component';

describe('EditarAspiranteComponent', () => {
  let component: EditarAspiranteComponent;
  let fixture: ComponentFixture<EditarAspiranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAspiranteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarAspiranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
