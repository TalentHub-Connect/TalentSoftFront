import { Component, OnInit } from '@angular/core';
import { Reason } from 'src/app/shared/model/Entities/reason';
import { Router } from '@angular/router';
import { ReasonService } from 'src/app/shared/model/service/reason.service';

@Component({
  selector: 'app-causales-despido',
  templateUrl: './causales-despido.component.html',
  styleUrls: ['./causales-despido.component.css']
})
export class CausalesDespidoComponent implements OnInit {
  causales: Reason[] = [];
  causalesFiltradas: Reason[] = [];
  paginatedCausales: Reason[] = [];
  filtroNombre: string = '';
  filtroCreador: string = '';

  currentPage = 1;
  itemsPerPage: number = 5;

  constructor(private causalService: ReasonService, private router: Router) { }

  ngOnInit() {
    this.cargarCausales();
  }

  cargarCausales() {
    const companyIdString = localStorage.getItem('companyid');
    if (companyIdString) {
      const companyId = parseInt(companyIdString, 10);
      this.causalService.obtenerReasons(companyId).subscribe({
        next: (data) => {
          this.causales = data;
          console.log('Causales cargadas:', this.causales);
          this.filtrarCausales(); // Aplicar filtros después de cargar causales
        },
        error: (error) => {
          console.error('Error al cargar causales:', error);
        }
      });
    } else {
      console.error('Company ID not found in localStorage');
    }
  }

  filtrarCausales() {
    if (this.causales && this.causales.length > 0) {
      this.causalesFiltradas = this.causales.filter(causal => {
        const nameMatch = causal.name ? causal.name.toLowerCase().includes(this.filtroNombre.toLowerCase()) : true;
        const creatorMatch = causal.createForUser ? causal.createForUser.toLowerCase().includes(this.filtroCreador.toLowerCase()) : true;
        return nameMatch && creatorMatch;
      });
      console.log('Causales filtradas:', this.causalesFiltradas);
      this.updatePagination();
    }
  }

  eliminarCausal(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta causal?')) {
      this.causalService.eliminarReason(id).subscribe(() => {
        console.log('Causal eliminada con ID:', id);
        this.cargarCausales();
      });
    }
  }

  editarCausal(id: number) {
    console.log('Editando causal con ID:', id);
    this.router.navigate(['editar-causal', id]);
  }

  onChangeItemsPerPage(): void {
    console.log('Cambiando elementos por página a:', this.itemsPerPage);
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCausales = this.causalesFiltradas.slice(startIndex, endIndex);
    console.log(`Mostrando causales del ${startIndex + 1} al ${endIndex}`);
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      console.log('Navegando a la página anterior');
      this.currentPage--;
      this.updatePagination();
    }
  }

  onNextPage() {
    const totalPages = Math.ceil(this.causalesFiltradas.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      console.log('Navegando a la página siguiente');
      this.currentPage++;
      this.updatePagination();
    }
  }

  // Métodos para actualizar filtros
  onNombreFiltroChange(event: Event) {
    this.filtroNombre = (event.target as HTMLInputElement).value;
    console.log('Filtro por nombre cambiado a:', this.filtroNombre);
    this.filtrarCausales();
  }

  onCreadorFiltroChange(event: Event) {
    this.filtroCreador = (event.target as HTMLInputElement).value;
    console.log('Filtro por creador cambiado a:', this.filtroCreador);
    this.filtrarCausales();
  }
}
