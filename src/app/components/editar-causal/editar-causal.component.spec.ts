import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCausalComponent } from './editar-causal.component';

describe('EditarCausalComponent', () => {
  let component: EditarCausalComponent;
  let fixture: ComponentFixture<EditarCausalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarCausalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarCausalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
