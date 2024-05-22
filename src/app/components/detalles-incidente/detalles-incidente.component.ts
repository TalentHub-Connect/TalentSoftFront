import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IncidentesService } from 'src/app/shared/model/service/incidentes.service';
import { incident } from 'src/app/shared/model/Entities/incident';

@Component({
  selector: 'app-detalles-incidente',
  templateUrl: './detalles-incidente.component.html',
  styleUrl: './detalles-incidente.component.css'
})
export class DetallesIncidenteComponent {
  incidente: incident | null = null;
  eventoId: number | null = null;

  constructor(private route: ActivatedRoute, private EventoService: IncidentesService ,
    @Inject(MAT_DIALOG_DATA) public data: { incidente: incident }, private ref:MatDialogRef<DetallesIncidenteComponent>) {}

  ngOnInit(): void {
    
  }

  obtenerDetallesEvento(id: number): void {
    this.EventoService.getincident(id).subscribe(
      (incident: incident) => {
        this.incidente = incident;
        console.log('Detalles del incidente:', this.incidente);
      },
      error => {
        console.error('Error al obtener detalles del Evento:', error);
      }
    );
  }
  closePopup(){
    this.ref.close();
  }
}

