import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CandidateService } from 'src/app/shared/model/service/candidate.service'; 
import { candidate } from 'src/app/shared/model/Entities/candidate'; 
import { CurriculumService } from 'src/app/shared/model/service/curriculum.service';

@Component({
  selector: 'app-detalles-aspirante',
  templateUrl: './detalles-aspirante.component.html',
  styleUrls: ['./detalles-aspirante.component.css']
})
export class DetallesAspiranteComponent implements OnInit {
  aspirante: candidate | null = null;
  curriculum: any = null;
  inputdata: any;

  constructor(
    private candidateService: CandidateService,
    private curriculumService: CurriculumService,
    @Inject(MAT_DIALOG_DATA) public data: { aspirante: candidate },
    private ref: MatDialogRef<DetallesAspiranteComponent>
  ) {}

  ngOnInit(): void {
    this.inputdata = this.data;
    this.obtenerDetallesAspirante(this.inputdata.aspirante.id);
  }

  obtenerDetallesAspirante(id: number): void {
    this.candidateService.getCandidate(id).subscribe(
      (aspirante: candidate) => {
        this.aspirante = aspirante;
        console.log('Detalles del aspirante:', this.aspirante);
        if (this.aspirante && this.aspirante.cvId) {
          this.DetallesCurriculo(this.aspirante.cvId);
        }
      },
      error => {
        console.error('Error al obtener detalles del aspirante:', error);
      }
    );
  }

  DetallesCurriculo(cvId: number): void {
    this.curriculumService.getCurriculum(cvId).subscribe(
      response => {
        this.curriculum = response;
        console.log('Detalles del currículum:', this.curriculum);
      },
      error => {
        console.error('Error al obtener el currículum:', error);
      }
    );
  }

  closePopup(): void {
    this.ref.close();
  }
}
