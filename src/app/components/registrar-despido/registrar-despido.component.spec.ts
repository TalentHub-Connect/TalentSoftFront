import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarDespidoComponent } from './registrar-despido.component';

describe('RegistrarDespidoComponent', () => {
  let component: RegistrarDespidoComponent;
  let fixture: ComponentFixture<RegistrarDespidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarDespidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarDespidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
