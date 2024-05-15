import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesAspiranteComponent } from './detalles-aspirante.component';

describe('DetallesAspiranteComponent', () => {
  let component: DetallesAspiranteComponent;
  let fixture: ComponentFixture<DetallesAspiranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesAspiranteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallesAspiranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
