import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CausalesDespidoComponent } from './causales-despido.component';

describe('CausalesDespidoComponent', () => {
  let component: CausalesDespidoComponent;
  let fixture: ComponentFixture<CausalesDespidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CausalesDespidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CausalesDespidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
