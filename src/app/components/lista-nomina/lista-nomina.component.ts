import { Component, OnInit } from '@angular/core';
import { EmpleadoN } from 'src/app/shared/model/Entities/empleadoN';
import { EmpleadoNService } from 'src/app/shared/model/service/empleado-n.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista-nomina',
  templateUrl: './lista-nomina.component.html',
  styleUrls: ['./lista-nomina.component.css']
})
export class ListaNominaComponent implements OnInit {
  empleados: EmpleadoN[] = [];
  filteredEmpleados: EmpleadoN[] = [];
  paginatedEmpleados: EmpleadoN[] = [];
  totalLiquidacion: number = 0;
  mesActual!: string;

  currentPage = 1;
  itemsPerPage: number = 5;
  companyId!: number;

  // Propiedades de los filtros
  nombreFiltro: string = '';
  statusFiltro: string = '';
  departamentoFiltro: string = '';

  constructor(private empleadoNService: EmpleadoNService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    const companyIdString = localStorage.getItem('companyid');
    if (companyIdString) {
      this.companyId = +companyIdString;
      this.cargarEmpleados();
      this.obtenerMesActual();
    }
  }

  cargarEmpleados() {
    console.log('Cargando lista de empleados...');
    this.empleadoNService.getEmpleadosNByCompanyId(this.companyId).subscribe(empleados => {
      this.empleados = empleados;
      this.snackBar.open('Lista de empleados cargada', 'Cerrar', { duration: 3000 });
      this.calcularTotalLiquidacion();
      this.aplicarFiltros();
    });
  }

  calcularTotalLiquidacion() {
    this.empleadoNService.getSalaries(this.companyId).subscribe(total => {
      this.totalLiquidacion = total;
    });
  }

  dispersarPagos() {
    this.empleadoNService.disperse(this.companyId).subscribe(success => {
      if (success) {
        alert('Pagos dispersados con éxito');
        this.cargarEmpleados();
      } else {
        alert('Error al dispersar los pagos');
      }
    });
  }

  obtenerMesActual() {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const fechaActual = new Date();
    this.mesActual = meses[fechaActual.getMonth()];
  }

  // Métodos de filtrado
  aplicarFiltros() {
    this.filteredEmpleados = this.empleados.filter(empleado => {
      return (
        (this.nombreFiltro === '' || empleado.nombre.toLowerCase().includes(this.nombreFiltro.toLowerCase())) &&
        (this.statusFiltro === '' || empleado.status === this.statusFiltro) &&
        (this.departamentoFiltro === '' || empleado.department === this.departamentoFiltro)
      );
    });
    this.updatePagination();
  }

  onChangeItemsPerPage(): void {
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEmpleados = this.filteredEmpleados.slice(startIndex, endIndex);
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  onNextPage() {
    const totalPages = Math.ceil(this.filteredEmpleados.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  // Métodos para actualizar filtros
  onNombreFiltroChange(event: Event) {
    this.nombreFiltro = (event.target as HTMLInputElement).value;
    this.aplicarFiltros();
  }

  onStatusFiltroChange(event: Event) {
    this.statusFiltro = (event.target as HTMLSelectElement).value;
    this.aplicarFiltros();
  }

  onDepartamentoFiltroChange(event: Event) {
    this.departamentoFiltro = (event.target as HTMLSelectElement).value;
    this.aplicarFiltros();
  }
}
