import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/shared/model/service/empleado.service';
import { Empleado } from 'src/app/shared/model/Entities/empleado';
import { ReasonService } from 'src/app/shared/model/service/reason.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-progreso-salida',
  templateUrl: './progreso-salida.component.html',
  styleUrls: ['./progreso-salida.component.css']
})
export class ProgresoSalidaComponent implements OnInit {
  empleados: Empleado[] = [];
  filteredEmpleados: Empleado[] = [];
  paginatedEmpleados: Empleado[] = [];

  filtroNombre: string = '';
  filtroEtapa: string = '';
  filtroCausal: string = '';
  causales: string[] = []; // Lista de causales disponibles

  currentPage = 1;
  itemsPerPage: number = 5;

  constructor(
    private empleadoService: EmpleadoService,
    private causalService: ReasonService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cargarEmpleados();
    this.cargarCausales();
  }

  cargarEmpleados() {
    console.log('Cargando lista de empleados...');
    this.empleados = this.empleadoService.getEmpleados();
    console.log('Lista de empleados cargada:', this.empleados);
    this.showSnackBar('Lista de empleados cargada');
    this.applyFilters();
  }

  cargarCausales() {
    const companyIdString = localStorage.getItem('companyid');
    if (companyIdString) {
      const companyId = parseInt(companyIdString, 10);
      this.causalService.obtenerReasons(companyId).subscribe({
        next: (data) => {
          this.causales = data.map(causal => causal.name); // Utiliza 'name' de Causal
          console.log('Causales cargadas:', this.causales);
        },
        error: (err) => {
          console.error('Error al cargar causales:', err);
        }
      });
    } else {
      console.error('Company ID not found in localStorage');
    }
  }

  applyFilters(): void {
    console.log('Aplicando filtros...');
    this.filteredEmpleados = this.empleadoService.filterEmpleados(this.filtroNombre, this.filtroEtapa, this.filtroCausal);
    console.log('Empleados después de aplicar filtros:', this.filteredEmpleados);
    this.updatePagination();
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
      this.showSnackBar(`Empleado con ID ${id} eliminado`);
      this.applyFilters();  // Refrescar la lista filtrada después de la eliminación
    }
  }

  onChangeItemsPerPage(): void {
    console.log('Cambiando elementos por página a:', this.itemsPerPage);
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEmpleados = this.filteredEmpleados.slice(startIndex, endIndex);
    console.log(`Mostrando empleados del ${startIndex + 1} al ${endIndex}`);
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      console.log('Navegando a la página anterior');
      this.currentPage--;
      this.updatePagination();
    }
  }

  onNextPage() {
    const totalPages = Math.ceil(this.filteredEmpleados.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      console.log('Navegando a la página siguiente');
      this.currentPage++;
      this.updatePagination();
    }
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
