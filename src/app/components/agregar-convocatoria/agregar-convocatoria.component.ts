import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { offerService } from 'src/app/shared/model/service/offer.service';
import { offer } from 'src/app/shared/model/Entities/offer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateFormatPipe } from 'src/app/date-format.pipe';

@Component({
  selector: 'app-agregar-convocatoria',
  templateUrl: './agregar-convocatoria.component.html',
  styleUrl: './agregar-convocatoria.component.css'
})
export class AgregarConvocatoriaComponent {
  estados = ['Abierta', 'Progreso', 'Cerrada'];
  


  constructor(private builder: FormBuilder, private convocatoriaService: offerService,
    private snackBar: MatSnackBar, private datePipe: DateFormatPipe) {}

  ngOnInit(): void {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('es-CO');
    this.convocatoriaform.setValue({
      tittleOffer: '', 
      description: 'MeVale mondaaaaa',
      experience: 'Monda',
      publishDate: null,
      requirements: 'sistemas',
      status: 'Abierta',
    });
  }
    convocatoriaform = this.builder.group({
    tittleOffer: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
    experience: this.builder.control('', Validators.required),
    publishDate: [new Date().toLocaleDateString('es-CO'), Validators.required],
    requirements: this.builder.control('', Validators.required),
    status: this.builder.control('', Validators.required),
  });

  SaveConvocatoria() {
    console.log('Convocatoria', this.convocatoriaform);
    if (this.convocatoriaform.valid) {
      const publishDateValue = this.convocatoriaform.value.publishDate;
      const currentDate = publishDateValue ? new Date(publishDateValue) : new Date();
      const convocatoriaData: offer = {
        tittleOffer: this.convocatoriaform.value.tittleOffer || '', 
        description: this.convocatoriaform.value.description || '',
        experience: this.convocatoriaform.value.experience || '',
        publishdate: currentDate.toJSON().slice(0, 10), // Formatear la fecha sin la hora
        requirements: this.convocatoriaform.value.requirements || '',
        status: this.convocatoriaform.value.status || '',
      };
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
    }
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
}
