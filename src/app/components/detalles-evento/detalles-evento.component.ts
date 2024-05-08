import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EventosService } from 'src/app/shared/model/service/eventos.service';
import { event } from 'src/app/shared/model/Entities/event';


@Component({
  selector: 'app-detalles-evento',
  templateUrl: './detalles-evento.component.html',
  styleUrl: './detalles-evento.component.css'
})
export class DetallesEventoComponent {
  evento: event | null = null;
  eventoId: number | null = null;

  constructor(private route: ActivatedRoute, private EventoService: EventosService ,
    @Inject(MAT_DIALOG_DATA) public data: { evento: event }, private ref:MatDialogRef<DetallesEventoComponent>) {}

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
    this.EventoService.getevent(id).subscribe(
      (evento: event) => {
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
