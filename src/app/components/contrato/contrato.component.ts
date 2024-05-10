import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurriculumService } from 'src/app/shared/model/service/curriculum.service';
import { ContratoService } from 'src/app/shared/model/service/contrato.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { candidate } from 'src/app/shared/model/Entities/candidate';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurriculumDialogService } from 'src/app/shared/model/service/curriculum-dialog.service';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrl: './contrato.component.css'
})
export class ContratoComponent {
  tiposC = ['Termino Fijo', 'Prestación de Servicios', 'Indefinido'];
  contratoForm!: FormGroup;
  aspirante!: candidate;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder,
  private curriculumService: CurriculumService,
  private contratoService: ContratoService ,
  private snackBar: MatSnackBar,
  private curriculumDialogService: CurriculumDialogService){}
  ngOnInit(): void {
    console.log('Datos del candidato:', this.aspirante);
    this.initForm();
  }

  initForm(): void {
    this.contratoForm = this.fb.group({
      salary: ['', Validators.required],
      startdate: ['', Validators.required],
      contract_type: ['', Validators.required],
      enddate: ['', Validators.required],
      charge: ['', Validators.required],
      eps: ['', Validators.required],
    });
  }




  // Función para enviar el contrato al backend y asociarle el aspirante
  onSubmit(): void {
    if (this.contratoForm.valid && this.aspirante && this.aspirante.id) {
      const contractData = {
        ...this.contratoForm.value,
        candidate_id: this.aspirante.id
      };
  
      this.contratoService.agregarContrato(contractData).subscribe(
        () => {
          this.showSuccessMessage();
        },
        error => {
          console.error('Error al agregar contrato:', error);
          this.showErrorMessage();
        }
      );
    } else {
      this.showErrorMessage();
    }
  }
  

  // Función para mostrar un mensaje de éxito
  showSuccessMessage(): void {
    this.snackBar.open('Operación exitosa', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  // Función para mostrar un mensaje de error
  showErrorMessage(): void {
    this.snackBar.open('Error en la operación', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}
