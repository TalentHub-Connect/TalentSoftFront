import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { offerService } from 'src/app/shared/model/service/offer.service';
import { BehaviorSubject } from 'rxjs';
import { ComunicacionAspService } from 'src/app/shared/model/service/comunicacion-asp.service';


@Component({
  selector: 'app-editar-convocatoria',
  templateUrl: './editar-convocatoria.component.html',
  styleUrl: './editar-convocatoria.component.css'
})
export class EditarConvocatoriaComponent {
  estados = ['Abierta', 'Progreso', 'Cerrada'];
  inputdata: any;
  currentConvocatoria: any;
  editForm!: FormGroup;
  closemessage = 'closed using directive'
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<EditarConvocatoriaComponent>, private formBuilder: FormBuilder,
    private service: offerService, private aspiranteEditService:ComunicacionAspService) {

  }
  ngOnInit(): void {
    this.inputdata = this.data;
    console.log('Datos de la convocatoria:', this.inputdata);
    this.editForm = this.formBuilder.group({
      tittleoffer: [''], 
      description: [''],
      status: [''],
      requeriments: ['']
    });
    this.currentConvocatoria = { ...this.inputdata.convocatoria }; 
    
  }


  closepopup() {
    this.ref.close('Closed using function');
  }


  editAspirante() {
    console.log('Datos2 de la convocatoria:', this.inputdata);
    if (this.inputdata) {
      console.log('id:', this.inputdata);
      const id = this.inputdata.aspirante.id;

      
      const newStatus = this.editForm.get('status')?.value || this.currentConvocatoria.status;
      const newtittleOffer = this.editForm.get('tittleoffer')?.value || this.currentConvocatoria.tittleoffer;
      const newDespcription = this.editForm.get('description')?.value || this.currentConvocatoria.description;
      const newRequirements = this.editForm.get('requeriments')?.value || this.currentConvocatoria.requeriments;
      console.log('id:', newStatus);
    
      this.service.editoffer1(id, newStatus, newtittleOffer, newDespcription, newRequirements).subscribe(
        () => {
          console.log('convocatoria editado exitosamente');
          this.ref.close('convocatoria editado exitosamente');
    
          this.aspiranteEditService.notifyAspiranteEdit();
          
        },
        error => {
          console.error('Error al editar aspirante:', error);
        }
      );
    } else {
      console.error('inputdata es nulo');
      
    }
  }

}
