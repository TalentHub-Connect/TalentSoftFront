import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventosService } from 'src/app/shared/model/service/eventos.service';
import { BehaviorSubject } from 'rxjs';
import { ComunicacionAspService } from 'src/app/shared/model/service/comunicacion-asp.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.component.html',
  styleUrl: './editar-evento.component.css'
})
export class EditarEventoComponent implements OnInit {
  estados = ['Abierto', 'Aplazado', 'Cancelado'];
  inputdata: any;
  currentEvento: any;
  editForm!: FormGroup;
  closemessage = 'closed using directive'
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<EditarEventoComponent>, private formBuilder: FormBuilder,
    private service: EventosService, private aspiranteEditService: ComunicacionAspService, private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.inputdata = this.data;
    console.log('Datos del evento:', this.inputdata);
    this.editForm = this.formBuilder.group({
      description: [''],
      status: ['']
    });
    this.currentEvento= { ...this.inputdata.evento };
  }


  closepopup() {
    this.ref.close('Closed using function');
  }


  editEvento() {
    console.log('Datos2 del evento:', this.inputdata);
    if (this.inputdata) {
      const id = this.inputdata.evento.id;


      const newStatus = this.editForm.get('status')?.value || this.currentEvento.status;
      const newDescription = this.editForm.get('description')?.value || this.currentEvento.description;

      this.service.editevent1(id, newStatus, newDescription).subscribe(
        () => {
          console.log('Evento editado exitosamente');
          this.ref.close('Evento editado exitosamente');

          this.aspiranteEditService.notifyAspiranteEdit();

        },
        error => {
          console.error('Error al editar Evento:', error);
        }
      );
    } else {
      console.error('inputdata es nulo');

    }
  }


}
