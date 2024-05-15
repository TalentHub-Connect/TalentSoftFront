import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/shared/model/service/candidate.service'; // Importa el servicio de aspirante si no lo has hecho aún
import { candidate } from 'src/app/shared/model/Entities/candidate'; // Importa el modelo de aspirante si no lo has hecho aún

@Component({
  selector: 'app-detalles-aspirante',
  templateUrl: './detalles-aspirante.component.html',
  styleUrls: ['./detalles-aspirante.component.css']
})
export class DetallesAspiranteComponent implements OnInit {
  aspirante: candidate | null = null;
  aspiranteId: number | null = null;

  constructor(private route: ActivatedRoute, private CandidateService: CandidateService,
    @Inject(MAT_DIALOG_DATA) public data: { aspirante: candidate }, private ref:MatDialogRef<DetallesAspiranteComponent>) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.aspiranteId = +idParam;
      console.log('ID del aspirante:', this.aspiranteId);
      this.obtenerDetallesAspirante(this.aspiranteId);
    } else {
      console.error('El ID del aspirante es null');
    }
  }

  obtenerDetallesAspirante(id: number): void {
    this.CandidateService.getCandidate(id).subscribe(
      (aspirante: candidate) => {
        this.aspirante = aspirante;
        console.log('Detalles del aspirante:', this.aspirante);
        // Aquí puedes manejar los detalles del aspirante
      },
      error => {
        console.error('Error al obtener detalles del aspirante:', error);
      }
    );
  }
  closePopup(){
    this.ref.close();
  }
}
