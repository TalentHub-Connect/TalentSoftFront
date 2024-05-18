import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CapacitacionesService } from 'src/app/shared/model/service/capacitaciones.service';
import { ComunicacionAspService } from 'src/app/shared/model/service/comunicacion-asp.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-capacitacion',
  templateUrl: './editar-capacitacion.component.html',
  styleUrls: ['./editar-capacitacion.component.css']
})
export class EditarCapacitacionComponent implements OnInit {
  estados = ['Abierto', 'Aplazado', 'Cancelado'];
  inputdata: any;
  currentCapacitacion: any;
  editForm!: FormGroup;
  closemessage = 'closed using directive';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<EditarCapacitacionComponent>,
    private formBuilder: FormBuilder,
    private service: CapacitacionesService,
    private aspiranteEditService: ComunicacionAspService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.inputdata = this.data;
    console.log('Datos de la capacitación:', this.inputdata);
    this.editForm = this.formBuilder.group({
      description: [''],
      status: ['']
    });
    this.currentCapacitacion = { ...this.inputdata.capacitacion };
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  editCapacitacion() {
    if (this.inputdata) {
      const id = this.inputdata.capacitacion.id;
      const newStatus = this.editForm.get('status')?.value || this.currentCapacitacion.status;
      const newDescription = this.editForm.get('description')?.value || this.currentCapacitacion.description;

      this.service.editcapacitation1(id, newStatus, newDescription).subscribe(
        () => {
          console.log('Capacitación editada exitosamente');
          this.ref.close('Capacitación editada exitosamente');
          this.aspiranteEditService.notifyAspiranteEdit();
        },
        error => {
          console.error('Error al editar la capacitación:', error);
        }
      );
    } else {
      console.error('inputdata es nulo');
    }
  }
}
