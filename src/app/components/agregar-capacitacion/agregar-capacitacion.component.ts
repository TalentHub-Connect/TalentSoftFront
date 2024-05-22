import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CapacitacionesService } from 'src/app/shared/model/service/capacitaciones.service';
import { TipocapacitacionService } from 'src/app/shared/model/service/tipocapacitacion.service';
import { typecapacitation } from 'src/app/shared/model/Entities/typecapacitation';
import { MatSnackBar } from '@angular/material/snack-bar';
import { capacitation } from 'src/app/shared/model/Entities/capacitation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-capacitacion',
  templateUrl: './agregar-capacitacion.component.html',
  styleUrls: ['./agregar-capacitacion.component.css']
})
export class AgregarCapacitacionComponent implements OnInit {
  companyId: number | null = null;
  companyIdString: string | null = null;
  estados = ['Abierto'];
  tcapacitaciones: typecapacitation[] = [];
  capacitacionform: FormGroup;

  constructor(
    private builder: FormBuilder,
    private capacitacionService: CapacitacionesService,
    private tCapacitacionService: TipocapacitacionService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    // Inicialización del formulario
    this.capacitacionform = this.builder.group({
      place: ['', Validators.required],
      description: ['', Validators.required],
      dateevent: [new Date().toLocaleDateString('es-CO'), Validators.required],
      capacitacion: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.capacitacionform.setValue({
      place: '',
      description: '',
      dateevent: null,
      capacitacion: '',
      status: '',
    });

    this.loadCapacitaciones();
    this.companyIdString = localStorage.getItem('companyid');
    if (this.companyIdString) {
      this.companyId = +this.companyIdString; // Convertir la cadena a número
    } else {
      console.error('No se encontró el ID de la compañía en el almacenamiento local');
    }
  }

  SaveCapacitacion() {
    console.log('capacitacion', this.capacitacionform);
    if (this.capacitacionform.valid) {
      const publishDateValue = this.capacitacionform.value.dateevent;
      const currentDate = publishDateValue ? new Date(publishDateValue) : new Date();
      console.log('Valor de event antes de convertir a número:', this.capacitacionform.value.capacitacion);
      const capacitationId = Number(this.capacitacionform.value.capacitacion);
      console.log('Valor de event después de convertir a número:', capacitationId);

      const capacitacionData: capacitation = {
        place: this.capacitacionform.value.place || '',
        description: this.capacitacionform.value.description || '',
        capacitationDate: currentDate.toJSON().slice(0, 10), // Formatear la fecha sin la hora
        typeCapacitationId: capacitationId || 0,
        status: this.capacitacionform.value.status || '',
        companyid: this.companyId ? this.companyId : 0,
      };
      this.capacitacionService.agregarcapacitation(capacitacionData).subscribe(
        response => {
          console.log('Evento agregado correctamente:', response);
          this.showSuccessMessage();
          this.clearform();
        },
        error => {
          console.error('Error al agregar Evento:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  onDiscard(): void {
    this.router.navigate(['/capacitaciones']);
  }

  clearform() {
    this.capacitacionform.reset();

    Object.keys(this.capacitacionform.controls).forEach(key => {
      const control = this.capacitacionform.get(key);
      if (control) { // Verificar si el control no es nulo
        control.markAsUntouched(); // Marcar como no tocado
        control.markAsPristine(); // Marcar como no modificado
      }
    });
  }

  loadCapacitaciones(): void {
    this.tCapacitacionService.gettcapacitation().subscribe(
      (tcapacitaciones: typecapacitation[]) => {
        this.tcapacitaciones = tcapacitaciones;
      },
      error => {
        console.error('Error al cargar las capacitaciones:', error);
      }
    );
  }

  showSuccessMessage() {
    this.snackBar.open('El evento se agregó con éxito', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}
