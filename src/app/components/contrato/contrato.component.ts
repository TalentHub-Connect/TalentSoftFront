import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurriculumService } from 'src/app/shared/model/service/curriculum.service';
import { ContratoService } from 'src/app/shared/model/service/contrato.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { candidate } from 'src/app/shared/model/Entities/candidate';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurriculumDialogService } from 'src/app/shared/model/service/curriculum-dialog.service';
import { contrato } from 'src/app/shared/model/Entities/contrato';
import { CandidateService } from 'src/app/shared/model/service/candidate.service';
import { EmpleadoPService } from 'src/app/shared/model/service/empleado-p.service';

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
  idContrato: number=0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder,
  private curriculumService: CurriculumService,
  private contratoService: ContratoService ,
  private snackBar: MatSnackBar,
  private contratoDialogService: CurriculumDialogService,
  private candidateService: CandidateService,
  private empleadoService: EmpleadoPService)
  {
    this.contratoDialogService.id$.subscribe(candidateData => {
      if (candidateData)
        this.idAspirante = candidateData;
    });
  }
  ngOnInit(): void {
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
      const contratoData: contrato = {
        salary: this.contratoForm.value.salary || 0,
        description: this.contratoForm.value.description || '',
        startDate: currentDate.toJSON().slice(0, 10),
        endDate: endDate.toJSON().slice(0, 10), 
        contractType: this.contratoForm.value.contract_type || '',
        charge: this.contratoForm.value.charge || '',
        eps: this.contratoForm.value.eps || '',
        candidateId: this.idAspirante
      };
      this.contratoService.agregarContrato(contratoData).subscribe(
        (response: { contractId: number }) => {
          this.idContrato=response.contractId;
          console.log('Contrato agregado correctamente:', response);
          this.candidateService.getCandidatebyId(this.idAspirante).subscribe(candidate => {
            console.log(candidate.name, candidate.surname, candidate.phoneNumber, candidate.companyid, this.idContrato);
            this.empleadoService.crearEmpleado(candidate.name, candidate.surname, candidate.phoneNumber, candidate.companyid, this.idContrato)
              .subscribe(() => this.showSuccessEMessage(), () => this.showErrorMessage());
          });
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
  

 
  showSuccessMessage(): void {
    this.snackBar.open('Operación exitosa', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
  showSuccessEMessage(): void {
    this.snackBar.open('Empleado creado', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  showErrorMessage(): void {
    this.snackBar.open('Error en la operación', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}
