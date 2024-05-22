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
    this.editForm = this.formBuilder.group({
      tittleOffer: [''], 
      description: [''],
      status: [''],
      requirements: ['']
    });
    this.currentConvocatoria = { ...this.inputdata.convocatoria }; 
    
  }


  closepopup() {
    this.ref.close('Closed using function');
  }


  editConvocatoria() {
    if (this.inputdata) {
      const id = this.inputdata.convocatoria.id;

      
      const newStatus = this.editForm.get('status')?.value || this.currentConvocatoria.status;
      const newtittleOffer = this.editForm.get('tittleOffer')?.value || this.currentConvocatoria.tittleoffer;
      const newDespcription = this.editForm.get('description')?.value || this.currentConvocatoria.description;
      const newRequirements = this.editForm.get('requirements')?.value || this.currentConvocatoria.requirements;
    
      this.service.editoffer1(id, newStatus, newtittleOffer, newDespcription, newRequirements).subscribe(
        () => {
          console.log('convocatoria editado exitosamente');
          this.ref.close('convocatoria editado exitosamente');
    
          this.aspiranteEditService.notifyAspiranteEdit();
          
        },
        error => {
          console.error('Error al editar convocatoria:', error);
        }
      );
    } else {
      console.error('inputdata es nulo');
      
    }
  }

}
