import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EventosService } from 'src/app/shared/model/service/eventos.service';
import { event } from 'src/app/shared/model/Entities/event';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { DetallesEventoComponent } from '../detalles-evento/detalles-evento.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditarEventoComponent } from '../editar-evento/editar-evento.component';
import { ComunicacionAspService } from 'src/app/shared/model/service/comunicacion-asp.service';
import { TipoeventoService } from 'src/app/shared/model/service/tipoevento.service';
import { typeevent } from 'src/app/shared/model/Entities/typeevent';




@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent implements AfterViewInit {
  nombreFilterValue: string = '';
  companyIdString: string | null = null;
  companyId: number | null = null;
  apiResponse: any = [];
  teventsMap: Map<number, string> = new Map<number, string>();
  statusFilterValue: string = '';
  constructor(
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private eventoService: EventosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private aspiranteEditService: ComunicacionAspService,
    private teventService: TipoeventoService
  ) {}
  displayedColumns: string[] = [
    'nameevent',
    'place',
    'dateevent',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<event>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.companyIdString = localStorage.getItem('companyid');
    if (this.companyIdString) {
      this.companyId = +this.companyIdString;
    } else {
      console.error('No se encontró el ID de la compañía en el almacenamiento local');
    }
    this.eventoService.geteventsbyCompany(this.companyId ? this.companyId : 0).subscribe((response: any) => {
      this.apiResponse = response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loadEventName();
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.aspiranteEditService.onAspiranteEdit().subscribe(() => {
      this.refreshTableData();
    });
    
  }

  refreshTableData() {
    this.eventoService.geteventsbyCompany(this.companyId ? this.companyId : 0).subscribe((response: any) => {
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
  applyFilter() {
    this.dataSource.filter = this.nombreFilterValue.trim().toLowerCase();
  }
  
  loadEventName() {
    this.apiResponse.forEach((evento: event) => {
      this.teventService
        .getevent(evento.typeeventid)
        .subscribe((tevent: typeevent) => {
          this.teventsMap.set(evento.typeeventid, tevent.nameevent);
        });
    });
  }
  

  getEventName(eventId: number): string {
    return this.teventsMap.get(eventId) || ''; 
  }
 
  onChange($event: any) {
    if ($event.value === '') {
      this.dataSource = new MatTableDataSource(this.apiResponse);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      let filteredData = _.filter(this.apiResponse, (item) => {
        return item.status === $event.value;
      });
      this.dataSource = new MatTableDataSource(filteredData);
    }
  }
  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  edit(element: event) {
    const index = this.apiResponse.findIndex(
      (item: event) => item === element
    );
    if (index !== -1) {
      this.apiResponse[index].status = 'Cancelado';
      if (element.id !== undefined) {
        this.eventoService.editevent(element.id, 'Cancelado').subscribe(
          (response) => {
            console.log('evento editado con éxito');
            this.showSuccessMessage();
          },
          (error) => {
            console.error('Error al editar evento:', error);
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
    this.snackBar.open('El estado se cambió a Rechazado con éxito', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

  routAgregar() {
    this.router.navigate(['/agregar-evento']);
  }

  Openpopup(evento: event) {
    const dialogRef = this.dialog.open(DetallesEventoComponent, {
      data: { evento: evento }, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Popup cerrado');
    });
  }
  editpopup(evento: event) {
    console.log('Datos del evento:', evento);
    const dialogRef = this.dialog.open(EditarEventoComponent, {
      data: { evento: evento }, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Popup cerrado');
    });
  }
}
