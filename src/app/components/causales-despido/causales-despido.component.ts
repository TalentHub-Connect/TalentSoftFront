import { Component, OnInit } from '@angular/core';
import { Causal } from 'src/app/shared/model/Entities/causal';
import { Router } from '@angular/router';
import { CausalService } from 'src/app/shared/model/service/causal.service';

@Component({
  selector: 'app-causales-despido',
  templateUrl: './causales-despido.component.html',
  styleUrls: ['./causales-despido.component.css']
})
export class CausalesDespidoComponent implements OnInit {
  causales: Causal[] = [];
  filtroNombre: string = '';
  filtroCreador: string = '';
  causalesFiltradas: Causal[] = [];

  currentPage = 1;
  itemsPerPage: number = 5;

  constructor(private causalService: CausalService, private router: Router) { }

  ngOnInit() {
    this.cargarCausales();
  }

  cargarCausales() {
    this.causales = this.causalService.obtenerCausales();
    this.filtrarCausales();
  }

  filtrarCausales() {
    this.causalesFiltradas = this.causales.filter(causal =>
      causal.causal.toLowerCase().includes(this.filtroNombre.toLowerCase()) &&
      (causal.creador ? causal.creador.toLowerCase().includes(this.filtroCreador.toLowerCase()) : true)
    );
  }

  eliminarCausal(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta causal?')) {
      this.causalService.eliminarCausal(id);
      this.cargarCausales();
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
    this.causalesFiltradas = this.causalesFiltradas.slice(startIndex, endIndex);
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Lógica para cambiar a la página siguiente
  onNextPage() {
    const totalPages = Math.ceil(this.causalesFiltradas.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }
}
