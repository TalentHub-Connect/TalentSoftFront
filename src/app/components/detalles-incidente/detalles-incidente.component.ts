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
  evento: incident | null = null;
  eventoId: number | null = null;

  constructor(private route: ActivatedRoute, private EventoService: IncidentesService ,
    @Inject(MAT_DIALOG_DATA) public data: { evento: incident }, private ref:MatDialogRef<DetallesIncidenteComponent>) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.eventoId = +idParam;
      console.log('ID del evento:', this.eventoId);
      this.obtenerDetallesEvento(this.eventoId);
    } else {
      console.error('El ID del eventoId es null');
    }
  }

  obtenerDetallesEvento(id: number): void {
    this.EventoService.getincident(id).subscribe(
      (evento: incident) => {
        this.evento = evento;
        console.log('Detalles del evento:', this.evento);
        // Aquí puedes manejar los detalles del Evento
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

