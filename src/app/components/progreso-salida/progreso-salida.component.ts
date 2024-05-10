import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/shared/model/service/empleado.service';
import { Empleado } from 'src/app/shared/model/Entities/empleado';
import { CausalService } from 'src/app/shared/model/service/causal.service';

@Component({
  selector: 'app-progreso-salida',
  templateUrl: './progreso-salida.component.html',
  styleUrls: ['./progreso-salida.component.css']
})
export class ProgresoSalidaComponent implements OnInit {
  empleados: Empleado[] = [];
  filteredEmpleados: Empleado[] = [];

  filtroNombre: string = '';
  filtroEtapa: string = '';
  filtroCausal: string = '';
  causales: string[] = []; // Lista de causales disponibles

  currentPage = 1; 
  itemsPerPage: number = 5;

  constructor(private empleadoService: EmpleadoService, private causalService: CausalService) { }

  ngOnInit(): void {
    this.empleados = this.empleadoService.getEmpleados();
    this.filteredEmpleados = this.empleados; // Inicialmente, todos los empleados son visibles
    this.causales = this.causalService.obtenerCausales().map(causal => causal.causal);
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredEmpleados = this.empleadoService.filterEmpleados(this.filtroNombre, this.filtroEtapa, this.filtroCausal);
  }

  onFiltroNombreChange(value: string): void {
    this.filtroNombre = value;
    this.applyFilters();
  }

  onFiltroEtapaChange(value: string): void {
    this.filtroEtapa = value;
    this.applyFilters();
  }

  onFiltroCausalChange(value: string): void {
    this.filtroCausal = value;
    this.applyFilters();
  }

  getProgressWidth(status: string): string {
    return this.empleadoService.getProgressWidth(status);
  }

  getProgressColor(status: string): string {
    return this.empleadoService.getProgressColor(status);
  }

  getProgressValue(status: string): string {
    return this.empleadoService.getProgressValue(status);
  }

  onDeleteEmpleado(id: number): void {
    if (confirm('¿Estás seguro de querer eliminar este proceso de salida?')) {
      this.empleadoService.deleteEmpleadoById(id);
      this.applyFilters();  // Refrescar la lista filtrada después de la eliminación
    }
  }

  onChangeItemsPerPage(): void {
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredEmpleados = this.filteredEmpleados.slice(startIndex, endIndex);
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Lógica para cambiar a la página siguiente
  onNextPage() {
    const totalPages = Math.ceil(this.filteredEmpleados.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }
}