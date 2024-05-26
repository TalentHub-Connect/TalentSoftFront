import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { offerService } from 'src/app/shared/model/service/offer.service';
import { offer } from 'src/app/shared/model/Entities/offer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-convocatoria',
  templateUrl: './agregar-convocatoria.component.html',
  styleUrl: './agregar-convocatoria.component.css'
})
export class AgregarConvocatoriaComponent {
  estados = ['Abierta', 'Progreso', 'Cerrada'];
  companyId: number | null = null;
  companyIdString: string | null = null;


  constructor(private builder: FormBuilder,
    private convocatoriaService: offerService,
    private snackBar: MatSnackBar,
    private router: Router,) { }

  ngOnInit(): void {
    this.convocatoriaform.setValue({
      tittleoffer: '',
      description: '',
      experience: 0,
      publishdate: null,
      requeriments: '',
      status: 'Abierta',
    });
    this.companyIdString = localStorage.getItem('companyid');
    if (this.companyIdString) {
      this.companyId = +this.companyIdString; // Convertir la cadena a número
    } else {
      console.error('No se encontró el ID de la compañía en el almacenamiento local');
    }
  }
  convocatoriaform = this.builder.group({
    tittleoffer: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
    experience: this.builder.control(0, Validators.required),
    publishdate: [new Date().toLocaleDateString('es-CO'), Validators.required],
    requeriments: this.builder.control('', Validators.required),
    status: this.builder.control('', Validators.required),
  });

  SaveConvocatoria() {
    console.log('Convocatoria', this.convocatoriaform);
    if (this.convocatoriaform.valid) {
      const publishDateValue = this.convocatoriaform.value.publishdate;
      const currentDate = publishDateValue ? new Date(publishDateValue) : new Date();
      const convocatoriaData: offer = {
        tittleoffer: this.convocatoriaform.value.tittleoffer || '',
        description: this.convocatoriaform.value.description || '',
        experience: this.convocatoriaform.value.experience || 0,
        publishdate: currentDate.toJSON().slice(0, 10), // Formatear la fecha sin la hora
        requeriments: this.convocatoriaform.value.requeriments || '',
        status: this.convocatoriaform.value.status || '',
        companyid: this.companyId ? this.companyId : 0,
      };
      console.log(convocatoriaData);
      this.convocatoriaService.agregaroffer(convocatoriaData).subscribe(
        response => {
          console.log('Convocatoria agregado correctamente:', response);
          this.showSuccessMessage();
          this.clearform();
        },
        error => {
          console.error('Error al agregar convocatoria:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
      this.showErrorMessage();
    }
  }

  onDiscard(): void {
    this.router.navigate(['/convocatoria']);
  }

  clearform() {
    this.convocatoriaform.reset();
  }
  showSuccessMessage() {
    this.snackBar.open('La convocatoria se agregó con éxito', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
  showErrorMessage() {
    this.snackBar.open('Hacen falta datos por llenar', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}
