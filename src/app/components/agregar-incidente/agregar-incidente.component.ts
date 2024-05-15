import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IncidentesService } from 'src/app/shared/model/service/incidentes.service';
import { TipoincidenteService } from 'src/app/shared/model/service/tipoincidente.service';
import { typeincident } from 'src/app/shared/model/Entities/typeincident';
import { MatSnackBar } from '@angular/material/snack-bar';
import { incident } from 'src/app/shared/model/Entities/incident';
import { empleado } from 'src/app/shared/model/Entities/empleadoP';
import { EmpleadoPService } from 'src/app/shared/model/service/empleado-p.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-incidente',
  templateUrl: './agregar-incidente.component.html',
  styleUrl: './agregar-incidente.component.css'
})
export class AgregarIncidenteComponent {
  companyId: number | null = null;
  companyIdString: string | null = null;
  estados = ['Abierto'];
  typeincident: typeincident[] = [];
  empleados: empleado[] = [];

  constructor(
    private builder: FormBuilder,
    private incidenteService: IncidentesService ,
    private tIncidenteService: TipoincidenteService,
    private empleadosService: EmpleadoPService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.incidenteform.setValue({
      incidentdate: null,
      description: 'aaaaaaa@gmail.com',
      empleado: '',
      place: '',
      incidente: '',
      status: 'Inicial',
    });
    this.loadIncidentes();
    this.loadEmpleados();
    this.companyIdString = localStorage.getItem('companyid');
    if (this.companyIdString) {
      this.companyId = +this.companyIdString; // Convertir la cadena a número
    } else {
      console.error('No se encontró el ID de la compañía en el almacenamiento local');
    }
  }
  incidenteform = this.builder.group({
    description: ['', Validators.required],
    incidentdate: [new Date().toLocaleDateString('es-CO'), Validators.required],
    incidente: ['', Validators.required],
    empleado: ['', Validators.required],
    place: ['', Validators.required],
    status: ['', Validators.required],
  });
  

  SaveIncident() {
    console.log('Evento', this.incidenteform);
    if (this.incidenteform.valid) {
      const publishDateValue = this.incidenteform.value.incidentdate;
      const currentDate = publishDateValue ? new Date(publishDateValue) : new Date();
      console.log('Valor de offer antes de convertir a número:', this.incidenteform.value.incidente);
      const incidentId = Number(this.incidenteform.value.incidente);
      const employeeId = Number(this.incidenteform.value.empleado);
      console.log('Valor de offer después de convertir a número:', incidentId);

      const incidentData: incident = {
        description: this.incidenteform.value.description|| '',
        incidentdate: currentDate.toJSON().slice(0, 10), 
        status: this.incidenteform.value.status || '',
        place: this.incidenteform.value.place || '',
        typeincidentid: incidentId || 0,
        employeeid: employeeId || 0,
        companyid: this.companyId ? this.companyId : 0
      };
      console.log('Valor de offer después de convertir a número:',  incidentData);
      this.incidenteService.agregarincident(incidentData).subscribe(
        response => {
          console.log('Incidente agregado correctamente:', response);
          this.showSuccessMessage();
          this.clearform();
        },
        error => {
          console.error('Error al agregar Incidente:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  onDiscard(): void {
    this.router.navigate(['/eventos']);
  }
  clearform() {
    this.incidenteform.reset();
  }

  loadIncidentes(): void {
    this.tIncidenteService.getincidents().subscribe(
      (typeincident: typeincident[]) => {
        this.typeincident = typeincident;
      },
      error => {
        console.error('Error al cargar los incidentes:', error);
      }
    );
  }
  loadEmpleados(): void {
    this.empleadosService.getempleados(this.companyId ? this.companyId : 0).subscribe(
      (empleado: empleado[]) => {
        this.empleados = empleado;
      },
      error => {
        console.error('Error al cargar empleados:', error);
      }
    );
  }

  showSuccessMessage() {
    this.snackBar.open('El incidente se agregó con éxito', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}
