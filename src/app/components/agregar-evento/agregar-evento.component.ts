import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventosService } from 'src/app/shared/model/service/eventos.service';
import { candidate } from 'src/app/shared/model/Entities/candidate';
import { TipoeventoService } from 'src/app/shared/model/service/tipoevento.service';
import { typeevent } from 'src/app/shared/model/Entities/typeevent';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurriculumDialogService } from 'src/app/shared/model/service/curriculum-dialog.service';
import { event } from 'src/app/shared/model/Entities/event';
@Component({
  selector: 'app-agregar-evento',
  templateUrl: './agregar-evento.component.html',
  styleUrl: './agregar-evento.component.css'
})
export class AgregarEventoComponent {
  estados = ['Abierto'];
  teventos: typeevent[] = [];

  constructor(
    private builder: FormBuilder,
    private eventoService: EventosService,
    private tEventoService: TipoeventoService,
    private snackBar: MatSnackBar,
  ) { }


  ngOnInit(): void {
    this.customerform.setValue({
      nameevent: 'MeVale',
      place: 'Monda',
      description: 'aaaaaaa@gmail.com',
      evento: '',
      dateevent: null,
      status: 'Inicial',
    });
    this.loadEventos();
  }
  customerform = this.builder.group({
    nameevent: ['', Validators.required],
    place: ['', Validators.required],
    description: ['', Validators.required],
    dateevent: [new Date().toLocaleDateString('es-CO'), Validators.required],
    evento: ['', Validators.required],
    status: ['', Validators.required],
  });
  openCurriculumDialog(): void {

    if (this.customerform.valid) {
      const publishDateValue = this.customerform.value.dateevent;
      const currentDate = publishDateValue ? new Date(publishDateValue) : new Date();
      console.log('Valor de offer antes de convertir a número:', this.customerform.value.nameevent);
      const eventId = Number(this.customerform.value.nameevent);
      console.log('Valor de offer después de convertir a número:', eventId);

      const eventoData: event = {
        nameevent: this.customerform.value.nameevent|| '',
        place: this.customerform.value.place || '',
        description: this.customerform.value.description|| '',
        dateevent: currentDate.toJSON().slice(0, 10), 
        typeeventid: eventId || 0,
        status: this.customerform.value.status || '',
      };
      console.log('Datos del aspirante:', eventoData);
    }
  }

  SaveCustomer() {
    console.log('Evento', this.customerform);
    if (this.customerform.valid) {
      const publishDateValue = this.customerform.value.dateevent;
      const currentDate = publishDateValue ? new Date(publishDateValue) : new Date();
      console.log('Valor de event antes de convertir a número:', this.customerform.value.nameevent);
      const eventId = Number(this.customerform.value.nameevent);
      console.log('Valor de event después de convertir a número:', eventId);

      const eventoData: event = {
        nameevent: this.customerform.value.nameevent|| '',
        place: this.customerform.value.place || '',
        description: this.customerform.value.description|| '',
        dateevent: currentDate.toJSON().slice(0, 10), // Formatear la fecha sin la hora
        typeeventid: eventId || 0,
        status: this.customerform.value.status || '',
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
    }
  }


  clearform() {
    this.customerform.reset();
  }

  loadEventos(): void {
    this.tEventoService.gettevents().subscribe(
      (typeevent: typeevent[]) => {
        this.teventos = typeevent;
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
}
