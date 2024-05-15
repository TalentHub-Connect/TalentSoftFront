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
  filtroNombre: string = '';
  filtroCreador: string = '';
  causalesFiltradas: Reason[] = [];

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
          console.log('Causales cargadas:', data); // Verifica qué datos estás recibiendo exactamente
          this.causales = data;
          this.filtrarCausales();
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
      this.updatePagination();
    }
  }

  eliminarCausal(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta causal?')) {
      this.causalService.eliminarReason(id).subscribe(() => {
        this.cargarCausales();
      });
    }
  }

  editarCausal(id: number) {
    this.router.navigate(['editar-causal', id]);
  }

  onChangeItemsPerPage(): void {
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.causalesFiltradas = this.causales.slice(startIndex, endIndex);
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  onNextPage() {
    const totalPages = Math.ceil(this.causales.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
}