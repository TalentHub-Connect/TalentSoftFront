import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/shared/model/service/sidebar.service';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent implements OnInit {
  nombreEmpresa: string= '';
  modulos: { icono: string, nombre: string }[] = [];
  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('role'));
    const hamBurger = document.querySelector(".toggle-btn") as HTMLElement;

    hamBurger.addEventListener("click", () => {
      const sidebar = document.querySelector("#sidebar") as HTMLElement;
      
      sidebar.classList.toggle("expand");
    });
    

    // Obtener los módulos
    this.sidebarService.obtenerModulos().subscribe(
      (modulos: any[]) => {
        this.modulos = modulos;
      },
      (error) => {
        console.error('Error al obtener los módulos:', error);
      }
    );
  }
  logout(): void {
    localStorage.clear()
  }
  role=localStorage.getItem('role');

  showRecruitmentCard: boolean = this.role!.includes('RECLUTAMIENTO')|| this.role!.includes('ADMIN') ;
  showDismissalCard: boolean = this.role!.includes('DESPIDO')|| this.role!.includes('ADMIN') ;
  showSSTCard: boolean = this.role!.includes('SST') || this.role!.includes('ADMIN') ;
  showBICard: boolean = this.role!.includes('BI')|| this.role!.includes('ADMIN') ;
  showNominaCard: boolean = this.role!.includes('NOMINA')|| this.role!.includes('ADMIN') ;
  showAdminCard:boolean = this.role!.includes('ADMIN')|| this.role!.includes('ADMIN') ;
}
