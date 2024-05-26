import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventosService } from 'src/app/shared/model/service/eventos.service';
import { typeevent } from 'src/app/shared/model/Entities/typeevent';
import { MatSnackBar } from '@angular/material/snack-bar';
import { event } from 'src/app/shared/model/Entities/event';
import { TipoeventoService } from 'src/app/shared/model/service/tipoevento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-evento',
  templateUrl: './agregar-evento.component.html',
  styleUrls: ['./agregar-evento.component.css']
})
export class AgregarEventoComponent {
  companyId: number | null = null;
  companyIdString: string | null = null;
  estados = ['Abierto'];
  teventos: typeevent[] = [];
  

  constructor(
    private builder: FormBuilder,
    private eventoService: EventosService,
    private snackBar: MatSnackBar,
    private teventoService: TipoeventoService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.customerform.setValue({
      place: '',
      description: '',
      evento: '',
      dateevent: null,
      status: '',
    });
    this.loadEventos();
    this.companyIdString = localStorage.getItem('companyid');
    if (this.companyIdString) {
      this.companyId = +this.companyIdString; // Convertir la cadena a número
    } else {
      console.error('No se encontró el ID de la compañía en el almacenamiento local');
    }
  }
  customerform = this.builder.group({
    place: ['', Validators.required],
    description: ['', Validators.required],
    dateevent: [new Date().toLocaleDateString('es-CO'), Validators.required],
    evento: ['', Validators.required],
    status: ['', Validators.required],
  });

  SaveCustomer() {
    console.log('Evento', this.customerform);
    if (this.customerform.valid) {
      const publishDateValue = this.customerform.value.dateevent;
      const currentDate = publishDateValue ? new Date(publishDateValue) : new Date();
      console.log('Valor de event antes de convertir a número:', this.customerform.value.evento);
      const eventId = Number(this.customerform.value.evento);
      console.log('Valor de event después de convertir a número:', eventId);

      const eventoData: event = {
        place: this.customerform.value.place || '',
        description: this.customerform.value.description || '',
        dateEvent: currentDate.toJSON().slice(0, 10), // Formatear la fecha sin la hora
        typeeventid: eventId || 0,
        status: this.customerform.value.status || '',
        companyid: this.companyId ? this.companyId : 0
      };
      this.eventoService.agregarevent(eventoData).subscribe(
        response => {
          console.log('Evento agregado correctamente:', response);
          this.showSuccessMessage();
          this.clearform();
        },
        error => {
          console.error('Error al agregar Evento:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
      this.showErrorMessage();
    }
  }

  onDiscard(): void {
    this.router.navigate(['/eventos']);
  }
  clearform() {
    this.customerform.reset();

    Object.keys(this.customerform.controls).forEach(key => {
      const control = this.customerform.get(key);
      if (control) { // Verificar si el control no es nulo
        control.markAsUntouched(); // Marcar como no tocado
        control.markAsPristine(); // Marcar como no modificado
      }
    });
  }


  loadEventos(): void {
    this.teventoService.gettevents().subscribe(
      (teventos: typeevent[]) => {
        this.teventos = teventos;
      },
      error => {
        console.error('Error al cargar los eventos:', error);
      }
    );
  }

  showSuccessMessage() {
    this.snackBar.open('El evento se agregó con éxito', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
  showErrorMessage() {
    this.snackBar.open('Hacen falta datos por llenar', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}
