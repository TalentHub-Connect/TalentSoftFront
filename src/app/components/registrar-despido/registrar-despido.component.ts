import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/shared/model/Entities/empleado';
import { ReasonService } from 'src/app/shared/model/service/reason.service';
import { EmpleadoService } from 'src/app/shared/model/service/empleado.service';
import { Router } from '@angular/router';
import { Reason } from 'src/app/shared/model/Entities/reason';

@Component({
  selector: 'app-registrar-despido',
  templateUrl: './registrar-despido.component.html',
  styleUrls: ['./registrar-despido.component.css']
})
export class RegistrarDespidoComponent implements OnInit {
  empleados: Empleado[] = [];
  causales: Reason[] = [];
  selectedEmpleado!: Empleado;
  selectedCausal!: Reason;

  constructor(
    private empleadoService: EmpleadoService,
    private reasonService: ReasonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarEmpleados();
    this.cargarCausales();
  }

  cargarEmpleados() {
    const companyIdString = localStorage.getItem('companyid');
    if (companyIdString) {
      const companyId = parseInt(companyIdString, 10);
      this.empleadoService.getEmpleadosByCompanyId(companyId).subscribe({
        next: (empleados) => {
          this.empleados = empleados;
          console.log('Empleados cargados:', this.empleados);
        },
        error: (err) => console.error('Error al cargar empleados:', err)
      });
    } else {
      console.error('Company ID not found in localStorage');
    }
  }

  cargarCausales() {
    const companyIdString = localStorage.getItem('companyid');
    if (companyIdString) {
      const companyId = parseInt(companyIdString, 10);
      this.reasonService.obtenerReasons(companyId).subscribe({
        next: (reasons) => {
          this.causales = reasons;
        },
        error: (err) => console.error('Error al cargar causales:', err)
      });
    } else {
      console.error('Company ID not found in localStorage');
    }
  }

  onSubmit(): void {
    const newId = this.empleadoService.getEmpleados().length + 1;
    const newEmpleado: Empleado = {
      id: newId,
      nombre: `${this.selectedEmpleado.name} ${this.selectedEmpleado.surname}`,
      status: 'Notificación',
      causal: this.selectedCausal.name,
      progreso: 25,
      salario: 0,
      documentos: [],
      name: this.selectedEmpleado.name,
      surname: this.selectedEmpleado.surname
    };
    this.empleadoService.addEmpleado(newEmpleado);
    this.router.navigate(['/progreso-salida']);
  }

  onDiscard(): void {
    this.router.navigate(['/progreso-salida']);
  }
}
