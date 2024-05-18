import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CapacitacionesService } from 'src/app/shared/model/service/capacitaciones.service';
import { capacitation } from 'src/app/shared/model/Entities/capacitation';

@Component({
  selector: 'app-detalles-capacitacion',
  templateUrl: './detalles-capacitacion.component.html',
  styleUrl: './detalles-capacitacion.component.css'
})
export class DetallesCapacitacionComponent {
  capacitacion: capacitation | null = null;
  capacitacionId: number | null = null;

  constructor(private route: ActivatedRoute, private CapacitacionesService: CapacitacionesService ,
    @Inject(MAT_DIALOG_DATA) public data: { capacitacion: capacitation }, private ref:MatDialogRef<DetallesCapacitacionComponent>) {}

  ngOnInit(): void {
    
  }

  obtenerDetallesCapacitacion(id: number): void {
    this.CapacitacionesService.getcapacitation(id).subscribe(
      (capacitacion: capacitation) => {
        this.capacitacion = capacitacion;
        console.log('Detalles capacitacion:', this.capacitacion);
        // Aquí puedes manejar los detalles capacitacion
      },
      error => {
        console.error('Error al obtener detalles capacitacion:', error);
      }
    );
  }
  closePopup(){
    this.ref.close();
  }
}
