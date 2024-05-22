import { Component, AfterViewInit, ViewChild, NgModule } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { offerService } from 'src/app/shared/model/service/offer.service';
import { offer } from 'src/app/shared/model/Entities/offer';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { DetallesConvocatoriaComponent } from '../detalles-convocatoria/detalles-convocatoria.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditarConvocatoriaComponent } from '../editar-convocatoria/editar-convocatoria.component';
import { ComunicacionAspService } from 'src/app/shared/model/service/comunicacion-asp.service';

@Component({
  selector: 'app-convocatoria',
  templateUrl: './convocatoria.component.html',
  styleUrl: './convocatoria.component.css',
})
export class ConvocatoriaComponent implements AfterViewInit {
  nombreFilterValue: string = '';
  apiResponse: any = [];
  companyIdString: string | null = null;
  companyId: number | null = null;
  statusFilterValue: string = ''; // Agrega una variable para almacenar el valor del filtro de status
  constructor(
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private convocatoriaService: offerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private aspiranteEditService: ComunicacionAspService
  ) {}
  displayedColumns: string[] = [
    'tittleOffer',
    'publishDate',
    'experience',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<offer>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.companyIdString = localStorage.getItem('companyid');
    if (this.companyIdString) {
      this.companyId = +this.companyIdString;
    } else {
      console.error('No se encontró el ID de la compañía en el almacenamiento local');
    }
    this.convocatoriaService.getoffers(this.companyId ? this.companyId : 0).subscribe((response: any) => {
      this.apiResponse = response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.aspiranteEditService.onAspiranteEdit().subscribe(() => {
      // Actualiza los datos de la tabla
      this.refreshTableData();
    });
  }

  refreshTableData() {
    this.convocatoriaService.getoffers( this.companyId ? this.companyId : 0).subscribe((response: any) => {
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

  edit(element: offer) {
    const index = this.apiResponse.findIndex((item: offer) => item === element);
    if (index !== -1) {
      this.apiResponse[index].status = 'Eliminado';
      if (element.id !== undefined) {
        this.convocatoriaService.editoffer(element.id, 'Eliminado').subscribe(
          (response) => {
            console.log('Convocatoria eliminada con éxito');
            this.refreshTableData();
            this.showSuccessMessage();
          },
          (error) => {
            console.error('Error al eliminar convocatoria:', error);
            this.apiResponse[index].status = element.status;
          }
        );
      } else {
        console.error('El ID de la convocatoria es undefined');
      }
      this.dataSource = new MatTableDataSource(this.apiResponse);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  showSuccessMessage() {
    this.snackBar.open('Se eliminó con éxito', 'Cerrar', {
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
    this.router.navigate(['/agregar-convocatoria']);
  }

  Openpopup(convocatoria: offer) {
    const dialogRef = this.dialog.open(DetallesConvocatoriaComponent, {
      data: { convocatoria: convocatoria },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Popup cerrado');
    });
  }
  editpopup(convocatoria: offer) {
    console.log('Datos de la convocatoria:', convocatoria);
    const dialogRef = this.dialog.open(EditarConvocatoriaComponent, {
      data: { convocatoria: convocatoria },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.showSuccessEditMessage();
      console.log('Popup cerrado');
    });
  }
}
