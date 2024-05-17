import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IncidentesService } from 'src/app/shared/model/service/incidentes.service';
import { BehaviorSubject } from 'rxjs';
import { ComunicacionAspService } from 'src/app/shared/model/service/comunicacion-asp.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-incidente',
  templateUrl: './editar-incidente.component.html',
  styleUrl: './editar-incidente.component.css'
})
export class EditarIncidenteComponent implements OnInit {
  estados = ['Abierto', 'Proceso', 'Resuelto', 'Cerrado'];
  inputdata: any;
  currentIncidente: any;
  editForm!: FormGroup;
  closemessage = 'closed using directive'
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<EditarIncidenteComponent>, private formBuilder: FormBuilder,
    private service: IncidentesService, private aspiranteEditService: ComunicacionAspService, private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.inputdata = this.data;
    console.log('Datos del evento:', this.inputdata);
    this.editForm = this.formBuilder.group({
      description: [''],
      status: ['']
    });
    this.currentIncidente= { ...this.inputdata.incident };

  }


  closepopup() {
    this.ref.close('Closed using function');
  }


  editEvento() {
    console.log('Datos2 del evento:', this.inputdata);
    if (this.inputdata) {
      console.log('id:', this.inputdata);
      const id = this.inputdata.evento.id;


      const newStatus = this.editForm.get('status')?.value || this.currentIncidente.status;
      const newDescription = this.editForm.get('description')?.value || this.currentIncidente.description;
      

      this.service.editincident1(id, newStatus, newDescription).subscribe(
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

