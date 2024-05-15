import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCausalComponent } from './registrar-causal.component';

describe('RegistrarCausalComponent', () => {
  let component: RegistrarCausalComponent;
  let fixture: ComponentFixture<RegistrarCausalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarCausalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarCausalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
