import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/shared/model/Entities/empleado';
import { ReasonService } from 'src/app/shared/model/service/reason.service';
import { EmpleadoService } from 'src/app/shared/model/service/empleado.service';
import { Router } from '@angular/router';
import { Reason } from 'src/app/shared/model/Entities/reason';

@Component({
  selector: 'app-registrar-despido',
  templateUrl: './registrar-despido.component.html',
  styleUrl: './registrar-despido.component.css'
})
export class RegistrarDespidoComponent implements OnInit {
  empleados: Empleado[] = [];
  causales: Reason[] = [];
  selectedEmpleado!: Empleado;
  selectedCausal!: string;


  constructor(private empleadoService: EmpleadoService, private reasonService: ReasonService, private router: Router) { }

  ngOnInit(): void {
    this.empleados = this.empleadoService.getEmpleados(); // Asegúrate de tener un método que obtenga solo los empleados activos
    this.cargarCausales();
  }

  cargarCausales() {
    this.reasonService.obtenerReasons().subscribe({
      next: (reasons) => {
        this.causales = reasons;  // Almacenamos directamente el array de Reason
      },
      error: (err) => console.error('Error al cargar causales:', err)
    });
  }

  onSubmit(): void {
    // Lógica para registrar el nuevo proceso de despido
    const newId = this.empleadoService.getEmpleados().length + 1;
    const newEmpleado: Empleado = {
      id: newId,
      nombre: this.selectedEmpleado.nombre,
      status: 'Notificación', // La etapa inicial es siempre 'Notificación'
      causal: this.selectedCausal,
      progreso: 25,
      salario: 0,
      documentos: []
    };
    this.empleadoService.addEmpleado(newEmpleado);
    this.router.navigate(['/progreso-salida']);
  }

  onDiscard(): void {
    this.router.navigate(['/progreso-salida']); // Navega de vuelta sin realizar ninguna acción
  }
}
