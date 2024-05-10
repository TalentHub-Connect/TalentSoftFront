import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CandidateService } from 'src/app/shared/model/service/candidate.service';
import { BehaviorSubject } from 'rxjs';
import { ComunicacionAspService } from 'src/app/shared/model/service/comunicacion-asp.service';
import { ContratoComponent } from '../contrato/contrato.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-aspirante',
  templateUrl: './editar-aspirante.component.html',
  styleUrl: './editar-aspirante.component.css'
})
export class EditarAspiranteComponent implements OnInit {
  estados = ['Inicial', 'Entrevistas', 'Pruebas técnicas', 'Pruebas psicotécnicas', 'Pruebas médicas', 'Contratado'];
  inputdata: any;
  private tablaDataSubject = new BehaviorSubject<any[]>([]);
  currentAspirante: any;
  editForm!: FormGroup;
  closemessage = 'closed using directive'
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<EditarAspiranteComponent>, private formBuilder: FormBuilder,
    private service: CandidateService, private aspiranteEditService: ComunicacionAspService, private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.inputdata = this.data;
    console.log('Datos del aspirante:', this.inputdata);
    this.editForm = this.formBuilder.group({
      email: [''],
      university: [''],
      status: [''],
      nameEmergencyContact: [''],
      emergencyContact: ['']
    });
    this.currentAspirante = { ...this.inputdata.aspirante };

  }


  closepopup() {
    this.ref.close('Closed using function');
  }


  editAspirante() {
    console.log('Datos2 del aspirante:', this.inputdata);
    if (this.inputdata) {
      console.log('id:', this.inputdata);
      const id = this.inputdata.aspirante.id;


      const newStatus = this.editForm.get('status')?.value || this.currentAspirante.status;
      const newEmail = this.editForm.get('email')?.value || this.currentAspirante.email;
      const newUniversity = this.editForm.get('university')?.value || this.currentAspirante.university;
      const newnameEmergencyContact = this.editForm.get('nameEmergencyContact')?.value || this.currentAspirante.nameEmergencyContact;
      const newemergencyContact = this.editForm.get('emergencyContact')?.value || this.currentAspirante.emergencyContact;
      console.log('id:', newStatus);

      this.service.editCandidate1(id, newStatus, newEmail, newUniversity, newnameEmergencyContact, newemergencyContact).subscribe(
        () => {
          console.log('Aspirante editado exitosamente');
          this.ref.close('Aspirante editado exitosamente');

          this.aspiranteEditService.notifyAspiranteEdit();

          // Si el nuevo estado es "Contratado", abre el diálogo de contrato
          if (newStatus === 'Contratado') {
            this.openContratoDialog();
          }

        },
        error => {
          console.error('Error al editar aspirante:', error);
        }
      );
    } else {
      console.error('inputdata es nulo');

    }
  }

  // Función para abrir el diálogo de contrato
  openContratoDialog(): void {
    this.dialog.open(ContratoComponent, {
      width: '500px', 
      data: this.currentAspirante 
    });
  }

}
