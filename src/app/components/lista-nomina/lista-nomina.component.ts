import { Component, OnInit } from '@angular/core';
import { EmpleadoN } from 'src/app/shared/model/Entities/empleadoN';
import { EmpleadoNService } from 'src/app/shared/model/service/empleado-n.service';

@Component({
  selector: 'app-lista-nomina',
  templateUrl: './lista-nomina.component.html',
  styleUrls: ['./lista-nomina.component.css']
})
export class ListaNominaComponent implements OnInit {
  empleados: EmpleadoN[] = [];
  totalLiquidacion: number = 0;
  mesActual!: string;

  currentPage = 1;
  itemsPerPage: number = 5;
  companyId!: number;

  constructor(private empleadoNService: EmpleadoNService) { }

  ngOnInit() {
    const companyIdString = localStorage.getItem('companyid');
    if (companyIdString) {
      this.companyId = +companyIdString; // Convertir a número
      this.cargarEmpleados();
      this.obtenerMesActual();
    }
  }

  cargarEmpleados() {
    this.empleadoNService.getEmpleadosNByCompanyId(this.companyId).subscribe(empleados => {
      this.empleados = empleados;
      this.calcularTotalLiquidacion();
      this.updatePagination();
    });
  }

  calcularTotalLiquidacion() {
    this.totalLiquidacion = this.empleados.reduce((acc, empleado) => acc + empleado.salario, 0);
  }

  agregarNovedad(id: number) {
    // Lógica para agregar novedad
  }

  eliminarEmpleado(id: number) {
    this.empleadoNService.deleteEmpleadoById(id).subscribe(() => {
      this.cargarEmpleados(); // Actualizar lista después de eliminar
    });
  }

  obtenerMesActual() {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const fechaActual = new Date();
    this.mesActual = meses[fechaActual.getMonth()];
  }

  onChangeItemsPerPage(): void {
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.empleados = this.empleados.slice(startIndex, endIndex);
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  onNextPage() {
    const totalPages = Math.ceil(this.empleados.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
}