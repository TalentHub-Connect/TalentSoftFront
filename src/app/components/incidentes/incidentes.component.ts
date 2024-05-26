import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { IncidentesService } from 'src/app/shared/model/service/incidentes.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComunicacionAspService } from 'src/app/shared/model/service/comunicacion-asp.service';
import { TipoincidenteService } from 'src/app/shared/model/service/tipoincidente.service';
import { typeincident } from 'src/app/shared/model/Entities/typeincident';
import { incident } from 'src/app/shared/model/Entities/incident';
import { empleado } from 'src/app/shared/model/Entities/empleadoP';
import { EditarIncidenteComponent } from '../editar-incidente/editar-incidente.component';
import { DetallesIncidenteComponent } from '../detalles-incidente/detalles-incidente.component';
import { EmpleadoPService } from 'src/app/shared/model/service/empleado-p.service';

@Component({
  selector: 'app-incidentes',
  templateUrl: './incidentes.component.html',
  styleUrl: './incidentes.component.css'
})
export class IncidentesComponent implements AfterViewInit {
  nombreFilterValue: string = '';
  companyIdString: string | null = null;
  companyId: number | null = null;
  apiResponse: any = [];
  tincidentsMap: Map<number, string> = new Map<number, string>();
  employeesMap: Map<number, string> = new Map<number, string>();
  statusFilterValue: string = '';
  constructor(
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private incidentService: IncidentesService ,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private aspiranteEditService: ComunicacionAspService,
    private tincidentService: TipoincidenteService,
    private empleadoService: EmpleadoPService
  ) {}
  displayedColumns: string[] = [
    'nameempleado',
    'dateincident',
    'nameincident',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<incident>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.companyIdString = localStorage.getItem('companyid');
    if (this.companyIdString) {
      this.companyId = +this.companyIdString;
    } else {
      console.error('No se encontró el ID de la compañía en el almacenamiento local');
    }
    this.incidentService.getincidentsbyCompany(this.companyId ? this.companyId : 0).subscribe((response: any) => {
      this.apiResponse = response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loadEmployeeNames();
      this.loadIncidentName();
      this.dataSource.filterPredicate = (data: incident, filter: string) => {
        return this.getEmployeeName(data.employeeid).toLowerCase().includes(filter);
      };
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.aspiranteEditService.onAspiranteEdit().subscribe(() => {
      this.refreshTableData();
    });
    
  }
  
  
  refreshTableData() {
    this.incidentService.getincidentsbyCompany(this.companyId ? this.companyId : 0).subscribe((response: any) => {
      this.apiResponse = response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.active) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  
  loadEmployeeNames() {
    this.apiResponse.forEach((incidente: incident) => {
      this.empleadoService
        .getempleado(incidente.employeeid)
        .subscribe((empleado: empleado) => {
          this.employeesMap.set(incidente.employeeid, empleado.name);
        });
    });
  }

  loadIncidentName() {
    this.apiResponse.forEach((incidente: incident) => {
      this.tincidentService
        .getincident(incidente.typeincidentid)
        .subscribe((tincident: typeincident) => {
          this.tincidentsMap.set(incidente.typeincidentid, tincident.nameIncident);
        });
    });
  }
  getEmployeeName(employeeId: number): string {
    return this.employeesMap.get(employeeId) || ''; // Return offer title from map
  }

  getIncidentName(incidentId: number): string {
    return this.tincidentsMap.get(incidentId) || ''; 
  }
  onChange($event: any) {
    if ($event.value === '') {
      // Si se selecciona "Todos", mostrar todos los datos
      this.dataSource = new MatTableDataSource(this.apiResponse);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      // Filtrar según la selección
      let filteredData = _.filter(this.apiResponse, (item) => {
        return item.status === $event.value;
      });
      this.dataSource = new MatTableDataSource(filteredData);
    }
  }
  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  edit(element: incident) {
    const index = this.apiResponse.findIndex(
      (item: incident) => item === element
    );
    if (index !== -1) {
      this.apiResponse[index].status = 'Eliminado';
      if (element.id !== undefined) {
        this.incidentService.editincident(element.id, 'Eliminado').subscribe(
          (response) => {
            console.log('evento editado con éxito');
            this.refreshTableData();
            this.showSuccessMessage();
          },
          (error) => {
            console.error('Error al editar incidente:', error);
            this.apiResponse[index].status = element.status;
          }
        );
      } else {
        console.error('El ID del aspirante es undefined');
      }
      this.dataSource = new MatTableDataSource(this.apiResponse);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  showSuccessMessage() {
    this.snackBar.open('El incidente se eliminó con éxito', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
  showSuccessEditMessage() {
    this.snackBar.open('Se editó con éxito', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

  routAgregar() {
    this.router.navigate(['/agregar-incidente']);
  }

  Openpopup(incidente: incident) {
    const dialogRef = this.dialog.open(DetallesIncidenteComponent, {
      data: { incidente: incidente }, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Popup cerrado');
    });
  }
  editpopup(incidente: incident) {
    console.log('Datos del evento:', incidente);
    const dialogRef = this.dialog.open(EditarIncidenteComponent, {
      data: { incidente: incidente }, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.showSuccessEditMessage();
      console.log('Popup cerrado');
    });
  }
  
}

