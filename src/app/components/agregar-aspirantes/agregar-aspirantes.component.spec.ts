import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAspirantesComponent } from './agregar-aspirantes.component';

describe('AgregarAspirantesComponent', () => {
  let component: AgregarAspirantesComponent;
  let fixture: ComponentFixture<AgregarAspirantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarAspirantesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarAspirantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
