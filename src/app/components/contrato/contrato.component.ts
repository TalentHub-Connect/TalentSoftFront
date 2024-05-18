import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurriculumService } from 'src/app/shared/model/service/curriculum.service';
import { ContratoService } from 'src/app/shared/model/service/contrato.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { candidate } from 'src/app/shared/model/Entities/candidate';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurriculumDialogService } from 'src/app/shared/model/service/curriculum-dialog.service';
import { contrato } from 'src/app/shared/model/Entities/contrato';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrl: './contrato.component.css'
})
export class ContratoComponent {
  tiposC = ['Termino Fijo', 'Prestación de Servicios', 'Indefinido'];
  contratoForm!: FormGroup;
  idAspirante: number=0;
  aspirante!: candidate;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder,
  private curriculumService: CurriculumService,
  private contratoService: ContratoService ,
  private snackBar: MatSnackBar,
  private contratoDialogService: CurriculumDialogService)
  {
    this.contratoDialogService.id$.subscribe(candidateData => {
      if (candidateData)
        this.idAspirante = candidateData;
    });
  }
  ngOnInit(): void {
    console.log('Datos del candidatoCONTRATO:', this.idAspirante);
    this.initForm();
  }

  initForm(): void {
    this.contratoForm = this.fb.group({
      salary: [0, Validators.required],
      description:['', Validators.required],
      startdate: ['', Validators.required],
      contract_type: ['', Validators.required],
      enddate: ['', Validators.required],
      charge: ['', Validators.required],
      eps: ['', Validators.required],
    });
  }



  onSubmit(): void {
    if (this.contratoForm.valid ) {
      const startValue = this.contratoForm.value.startdate;
      const currentDate = startValue ? new Date(startValue) : new Date();
      const endDateValue = this.contratoForm.value.startdate;
      const endDate = endDateValue ? new Date(endDateValue) : new Date();
      console.log('Datos del candidatoCONTRATO2:', this.idAspirante);
      const contratoData: contrato = {
        salary: this.contratoForm.value.salary || 0,
        description: this.contratoForm.value.description || '',
        startDate: currentDate.toJSON().slice(0, 10),
        endDate: endDate.toJSON().slice(0, 10), // Formatear la fecha sin la hora
        contractType: this.contratoForm.value.contract_type || '',
        charge: this.contratoForm.value.charge || '',
        eps: this.contratoForm.value.eps || '',
        candidateId: this.idAspirante
      };
      console.log('contrato', contratoData);
      this.contratoService.agregarContrato(contratoData).subscribe(
        response => {
          console.log('Contrato agregado correctamente:', response);
          this.showSuccessMessage();
        },
        error => {
          console.error('Error al agregar contrato:', error);
          this.showErrorMessage();
        }
      );
    } else {
      console.log('Formulario inválido');
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
