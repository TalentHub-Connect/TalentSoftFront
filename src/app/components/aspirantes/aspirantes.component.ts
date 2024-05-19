import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CandidateService } from 'src/app/shared/model/service/candidate.service';
import { candidate } from 'src/app/shared/model/Entities/candidate';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { DetallesAspiranteComponent } from '../detalles-aspirante/detalles-aspirante.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditarAspiranteComponent } from '../editar-aspirante/editar-aspirante.component';
import { ComunicacionAspService } from 'src/app/shared/model/service/comunicacion-asp.service';
import { offerService } from 'src/app/shared/model/service/offer.service';
import { offer } from 'src/app/shared/model/Entities/offer';
import { candidateStatus } from 'src/app/shared/model/Entities/candidatestatus';
import { CandidatestatusService } from 'src/app/shared/model/service/candidatestatus.service';

@Component({
  selector: 'app-aspirantes',
  templateUrl: './aspirantes.component.html',
  styleUrls: ['./aspirantes.component.css'],
})
export class AspirantesComponent implements AfterViewInit {
  nombreFilterValue: string = '';
  statusFilterValue: string = '';
  apiResponse: any = [];
  companyIdString: string | null = null;
  companyId: number | null = null;
  nStatusMap: Map<number, string> = new Map<number, string>();
  offersMap: Map<number, string> = new Map<number, string>();

  constructor(
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private aspiranteService: CandidateService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private aspiranteEditService: ComunicacionAspService,
    private offerService: offerService,
    private serviceStatus: CandidatestatusService
  ) {}

  displayedColumns: string[] = [
    'name',
    'surname',
    'phonenumber',
    'offer',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<candidate>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.companyIdString = localStorage.getItem('companyid');
    if (this.companyIdString) {
      this.companyId = +this.companyIdString;
    } else {
      console.error('No se encontró el ID de la compañía en el almacenamiento local');
    }
    this.loadCandidates();
  }

  loadCandidates() {
    this.aspiranteService.getCandidates(this.companyId ? this.companyId : 0).subscribe((response: any) => {
      this.apiResponse = response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.customFilterPredicate();
      this.loadOfferTitles();
      this.loadStatusTitles();
    });

    this.aspiranteEditService.onAspiranteEdit().subscribe(() => {
      this.refreshTableData();
    });
  }

  refreshTableData() {
    this.aspiranteService.getCandidates(this.companyId ? this.companyId : 0).subscribe((response: any) => {
      this.apiResponse = response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.active) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  customFilterPredicate() {
    return (data: candidate, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      const matchesName = data.name.toLowerCase().includes(searchTerms.nombre.toLowerCase());
      const matchesStatus = this.getStatusName(data.candidateStatusId).toLowerCase().includes(searchTerms.status.toLowerCase());
      return matchesName && matchesStatus;
    };
  }

  applyFilter() {
    const filterValues = {
      nombre: this.nombreFilterValue,
      status: this.statusFilterValue
    };
    this.dataSource.filter = JSON.stringify(filterValues);
  }

  loadOfferTitles() {
    this.apiResponse.forEach((candidate: candidate) => {
      this.offerService.getoffer(candidate.offerId).subscribe((offer: offer) => {
        this.offersMap.set(candidate.offerId, offer.tittleoffer);
      });
    });
  }

  getOfferTitle(offerId: number): string {
    return this.offersMap.get(offerId) || ''; // Return offer title from map
  }

  loadStatusTitles() {
    this.apiResponse.forEach((candidate: candidate) => {
      this.serviceStatus.getstatus(candidate.candidateStatusId).subscribe((statusid: candidateStatus) => {
        this.nStatusMap.set(candidate.candidateStatusId, statusid.description);
      });
    });
  }

  getStatusName(statusId: number): string {
    return this.nStatusMap.get(statusId) || '';
  }

  onChange($event: any) {
    this.statusFilterValue = $event.value;
    this.applyFilter();
  }

  filterData($event: any) {
    this.nombreFilterValue = $event.target.value;
    this.applyFilter();
  }

  edit(element: candidate) {
    const index = this.apiResponse.findIndex((item: candidate) => item === element);
    if (index !== -1) {
      this.apiResponse[index].status = 'Eliminado';
      if (element.id !== undefined) {
        this.aspiranteService.editCandidate(element.id, 'Eliminado').subscribe(
          (response) => {
            console.log('Aspirante eliminado con éxito');
            this.refreshTableData();
            this.showSuccessMessage();
          },
          (error) => {
            console.error('Error al eliminar aspirante:', error);
            this.apiResponse[index].status = element.candidateStatusId;
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
    this.router.navigate(['/agregar-aspirante']);
  }

  Openpopup(aspirante: candidate) {
    const dialogRef = this.dialog.open(DetallesAspiranteComponent, {
      data: { aspirante: aspirante }, // Pasa el objeto aspirante al popup
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Popup cerrado');
    });
  }

  editpopup(aspirante: candidate) {
    console.log('Datos del aspirante:', aspirante);
    const dialogRef = this.dialog.open(EditarAspiranteComponent, {
      data: { aspirante: aspirante }, // Pasa el objeto aspirante al popup
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.showSuccessEditMessage();
      console.log('Popup cerrado');
    });
  }
}
