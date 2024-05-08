import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IncidentesService } from 'src/app/shared/model/service/incidentes.service';
import { TipoincidenteService } from 'src/app/shared/model/service/tipoincidente.service';
import { typeincident } from 'src/app/shared/model/Entities/typeincident';
import { MatSnackBar } from '@angular/material/snack-bar';
import { incident } from 'src/app/shared/model/Entities/incident';
import { Empleado } from 'src/app/shared/model/Entities/empleado';
import { EmpleadoService } from 'src/app/shared/model/service/empleado.service';

@Component({
  selector: 'app-agregar-incidente',
  templateUrl: './agregar-incidente.component.html',
  styleUrl: './agregar-incidente.component.css'
})
export class AgregarIncidenteComponent {
  estados = ['Abierto'];
  typeincident: typeincident[] = [];
  empleados: Empleado[] = [];

  constructor(
    private builder: FormBuilder,
    private incidenteService: IncidentesService ,
    private tIncidenteService: TipoincidenteService,
    private empleadosService: EmpleadoService,
    private snackBar: MatSnackBar,
  ) { }


  ngOnInit(): void {
    this.incidenteform.setValue({
      incidentdate: null,
      description: 'aaaaaaa@gmail.com',
      empleado: '',
      incidente: '',
      status: 'Inicial',
    });
    this.loadIncidentes();
    this.loadEmpleados();
  }
  incidenteform = this.builder.group({
    description: ['', Validators.required],
    incidentdate: [new Date().toLocaleDateString('es-CO'), Validators.required],
    incidente: ['', Validators.required],
    empleado: ['', Validators.required],
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
        typeincidentid: incidentId || 0,
        employeeid: employeeId || 0,
        status: this.incidenteform.value.status || '',
      };
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
    this.empleadosService.getempleados().subscribe(
      (empleado: Empleado[]) => {
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
