import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CapacitacionesService } from 'src/app/shared/model/service/capacitaciones.service';
import { capacitation } from 'src/app/shared/model/Entities/capacitation';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComunicacionAspService } from 'src/app/shared/model/service/comunicacion-asp.service';
import { TipocapacitacionService } from 'src/app/shared/model/service/tipocapacitacion.service';
import { typecapacitation } from 'src/app/shared/model/Entities/typecapacitation';
import { DetallesCapacitacionComponent } from '../detalles-capacitacion/detalles-capacitacion.component';
import { EditarCapacitacionComponent } from '../editar-capacitacion/editar-capacitacion.component';

@Component({
  selector: 'app-capacitaciones',
  templateUrl: './capacitaciones.component.html',
  styleUrl: './capacitaciones.component.css'
})
export class CapacitacionesComponent {
  nombreFilterValue: string = '';
  apiResponse: any = [];
  tcapacitationsMap: Map<number, string> = new Map<number, string>();
  statusFilterValue: string = '';
  constructor(
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private capacitacionService: CapacitacionesService ,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private aspiranteEditService: ComunicacionAspService,
    private tcapacitationService: TipocapacitacionService 
  ) {}
  displayedColumns: string[] = [
    'namecapacitation',
    'place',
    'capacitationdate',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<capacitation>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.capacitacionService.getcapacitations().subscribe((response: any) => {
      this.apiResponse = response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loadCapacitationName();
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.aspiranteEditService.onAspiranteEdit().subscribe(() => {
      this.refreshTableData();
    });
    
  }

  refreshTableData() {
    this.capacitacionService.getcapacitations().subscribe((response: any) => {
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
  
  loadCapacitationName() {
    this.apiResponse.forEach((capacitacion: capacitation) => {
      this.tcapacitationService
        .getcapacitation(capacitacion.typecapacitationid)
        .subscribe((tcapacitation: typecapacitation) => {
          this.tcapacitationsMap.set(capacitacion.typecapacitationid, tcapacitation.description);
        });
    });
  }
  

  getCapacitationName(capacitationId: number): string {
    return this.tcapacitationsMap.get(capacitationId) || ''; 
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

  edit(element: capacitation) {
    const index = this.apiResponse.findIndex(
      (item: capacitation) => item === element
    );
    if (index !== -1) {
      this.apiResponse[index].status = 'Cancelado';
      if (element.id !== undefined) {
        this.capacitacionService.editcapacitation(element.id, 'Cancelado').subscribe(
          (response) => {
            console.log('capacitación editado con éxito');
            this.showSuccessMessage();
          },
          (error) => {
            console.error('Error al editar capacitación:', error);
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
    this.router.navigate(['/agregar-capacitacion']);
  }

  Openpopup(capacitacion: capacitation) {
    const dialogRef = this.dialog.open(DetallesCapacitacionComponent, {
      data: { capacitacion: capacitacion }, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Popup cerrado');
    });
  }
  editpopup(capacitacion: capacitation) {
    console.log('Datos del capacitacion:', capacitacion);
    const dialogRef = this.dialog.open(EditarCapacitacionComponent, {
      data: { capacitacion: capacitacion }, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Popup cerrado');
    });
  }
}

