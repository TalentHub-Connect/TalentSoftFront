import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurriculumService } from 'src/app/shared/model/service/curriculum.service';
import { CandidateService } from 'src/app/shared/model/service/candidate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { candidate } from 'src/app/shared/model/Entities/candidate';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurriculumDialogService } from 'src/app/shared/model/service/curriculum-dialog.service';
@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css']
})
export class CurriculumComponent {
  curriculumForm!: FormGroup;
  aspirante!: candidate;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private curriculumService: CurriculumService,
    private candidateService: CandidateService,
    private snackBar: MatSnackBar,
    private curriculumDialogService: CurriculumDialogService
  ) {
    this.curriculumDialogService.candidate$.subscribe(candidateData => {
      if (candidateData)
        this.aspirante = candidateData;
    });
  }


  ngOnInit(): void {
    console.log('Datos del candidato:', this.aspirante);
    this.initForm();
  }

  initForm(): void {
    this.curriculumForm = this.fb.group({
      address: ['', Validators.required],
      personalObjective: ['', Validators.required],
      workExperience: ['', Validators.required],
      educationalHistory: ['', Validators.required],
      language: ['', Validators.required],
      certification: ['', Validators.required],
      personalReference: ['', Validators.required],
      university: ['', Validators.required],
      career: ['', Validators.required]
    });
  }




  // Función para enviar el currículum al backend y asociarlo al aspirante
  onSubmit(): void {
    if (this.curriculumForm.valid) {
      const curriculumData = this.curriculumForm.value;

      // Guarda el currículum en el backend
      this.curriculumService.agregarCurriculum(curriculumData).subscribe(
        (curriculumId: number) => {

          // Actualiza el aspirante con el ID del currículum asignado por el servidor
          this.aspirante.cv_id = curriculumId;
          console.log('VIDAHP',this.aspirante.cv_id);
          // Guarda el aspirante actualizado en el backend
          this.candidateService.agregarCandidate(this.aspirante).subscribe(
            () => {
              console.log(this.aspirante);
              // Si la operación fue exitosa, muestra un mensaje de éxito
              this.showSuccessMessage();
            },
            error => {
              console.error('Error al guardar el aspirante:', error);
              // Si hay un error, muestra un mensaje de error
              this.showErrorMessage();
            }
          );
        },
        error => {
          console.error('Error al guardar el currículum:', error);
          // Si hay un error, muestra un mensaje de error
          this.showErrorMessage();
        }
      );
    } else {
      // Si el formulario no es válido, muestra un mensaje de error
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