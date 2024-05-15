import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/shared/model/service/sidebar.service';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent implements OnInit {
  nombreEmpresa: string = '';
  modulos: { id: number, description: string, rolId: number, status: string }[] = [];
  roles: string[] = [];

  showAdminCard: boolean = false;
  showRecruitmentCard: boolean = false;
  showDismissalCard: boolean = false;
  showNominaCard: boolean = false;
  showSSTCard: boolean = false;
  showBICard: boolean = false;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    const roleStr = localStorage.getItem('role');
    console.log('Role string from localStorage:', roleStr);

    if (roleStr) {
      this.roles = roleStr.split(', '); // Asume que los roles están separados por comas y espacios
      console.log('Role names:', this.roles);
    } else {
      console.error('Role ID not found in localStorage');
    }

    const hamBurger = document.querySelector(".toggle-btn") as HTMLElement;
    hamBurger.addEventListener("click", () => {
      const sidebar = document.querySelector("#sidebar") as HTMLElement;
      sidebar.classList.toggle("expand");
    });

    const uniqueModules = new Set(); // Usar un Set para asegurar la unicidad
    let pendingRequests = this.roles.length; // Contador para solicitudes pendientes

    this.roles.forEach(role => {
      const roleId = this.getRoleId(role);
      if (roleId !== 0) { // Asegurarse de que el roleId es válido
        this.sidebarService.obtenerModulos(roleId).subscribe(
          (modulos: any[]) => {
            console.log(`Modulos recibidos del API para el rol ${role}:`, modulos);

            const filteredModulos = modulos.filter(modulo => 
              modulo.rolId === roleId && 
              modulo.status === 'ACTIVO' && 
              !uniqueModules.has(modulo.id)
            );

            filteredModulos.forEach(modulo => uniqueModules.add(modulo.id));
            this.modulos = [...this.modulos, ...filteredModulos];
            console.log('Modulos filtrados:', this.modulos);

            pendingRequests--;
            if (pendingRequests === 0) {
              this.setCardVisibility();
            }
          },
          (error) => {
            console.error('Error al obtener los módulos:', error);
            pendingRequests--;
            if (pendingRequests === 0) {
              this.setCardVisibility();
            }
          }
        );
      } else {
        pendingRequests--;
        if (pendingRequests === 0) {
          this.setCardVisibility();
        }
      }
    });
  }

  getRoleId(roleName: string): number {
    const roleMap: { [key: string]: number } = {
      'ADMIN': 1,
      'DESPIDO': 2,
      'RECLUTAMIENTO': 3,
      'NOMINA_ELECTRONICA': 4,
      'SST': 5,
      'BI': 6
    };
    return roleMap[roleName] || 0;
  }

  setCardVisibility(): void {
    console.log('Setting card visibility based on modulos:', this.modulos);

    this.showAdminCard = this.modulos.some(modulo => modulo.description === 'ADMIN');
    this.showRecruitmentCard = this.modulos.some(modulo => modulo.description === 'RECLUTAMIENTO');
    this.showDismissalCard = this.modulos.some(modulo => modulo.description === 'DESPIDO');
    this.showNominaCard = this.modulos.some(modulo => modulo.description === 'NOMINA_ELECTRONICA');
    this.showSSTCard = this.modulos.some(modulo => modulo.description === 'SST');
    this.showBICard = this.modulos.some(modulo => modulo.description === 'BI');

    console.log('Card visibility - Admin:', this.showAdminCard);
    console.log('Card visibility - Recruitment:', this.showRecruitmentCard);
    console.log('Card visibility - Dismissal:', this.showDismissalCard);
    console.log('Card visibility - Nomina:', this.showNominaCard);
    console.log('Card visibility - SST:', this.showSSTCard);
    console.log('Card visibility - BI:', this.showBICard);
  }

  logout(): void {
    localStorage.clear();
  }
}
