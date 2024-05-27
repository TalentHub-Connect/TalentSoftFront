import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/shared/model/service/sidebar.service';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css'],
})
export class SlidebarComponent implements OnInit {
  nombreEmpresa: string = '';
  roles: string[] = [];

  showAdminCard: boolean = false;
  showRecruitmentCard: boolean = false;
  showDismissalCard: boolean = false;
  showNominaCard: boolean = false;
  showSSTCard: boolean = false;
  showBICard: boolean = false;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    const roleStr = localStorage.getItem('role');
    console.log('Role string from localStorage:', roleStr);

    if (roleStr) {
      this.roles = roleStr.split(', '); // Asume que los roles están separados por comas y espacios
      console.log('Role names:', this.roles);
    } else {
      console.error('Role ID not found in localStorage');
    }

    const hamBurger = document.querySelector('.toggle-btn') as HTMLElement;
    hamBurger.addEventListener('click', () => {
      const sidebar = document.querySelector('#sidebar') as HTMLElement;
      sidebar.classList.toggle('expand');
    });

    this.updateSidebarVisibility();
  }

  updateSidebarVisibility(): void {
    this.showAdminCard = this.roles.includes('ADMIN');
    this.showRecruitmentCard =
      this.roles.includes('RECLUTAMIENTO') || this.roles.includes('ADMIN');
    this.showDismissalCard =
      this.roles.includes('DESPIDO') || this.roles.includes('ADMIN');
    this.showNominaCard =
      this.roles.includes('NOMINA_ELECTRONICA') || this.roles.includes('ADMIN');
    this.showSSTCard =
      this.roles.includes('SST') || this.roles.includes('ADMIN');
    this.showBICard = this.roles.includes('BI') || this.roles.includes('ADMIN');
  }

  logout(): void {
    localStorage.clear();
  }
}
