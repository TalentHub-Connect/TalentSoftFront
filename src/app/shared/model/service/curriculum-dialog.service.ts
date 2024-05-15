import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CurriculumComponent } from 'src/app/components/curriculum/curriculum.component';
import { candidate } from '../Entities/candidate';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurriculumDialogService {
  // Declarar el BehaviorSubject
  private candidateSource = new BehaviorSubject<candidate | null>(null);
  candidate$ = this.candidateSource.asObservable();

  constructor(private dialog: MatDialog) { }
  
  openCurriculumDialog(candidateData: candidate): void {
    console.log(candidateData);

    // Emitir los datos del candidato al BehaviorSubject
    this.candidateSource.next(candidateData);

    const dialogRef = this.dialog.open(CurriculumComponent, {
      width: '500px', // Personaliza el ancho del diálogo según tus necesidades
    });

    dialogRef.afterClosed().subscribe(result => {
      // Puedes manejar aquí cualquier lógica necesaria después de que se cierre el diálogo
    });
  }
}
