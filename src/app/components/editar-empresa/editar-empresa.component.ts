import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { company } from 'src/app/shared/model/Entities/company';
import { CompanyService } from 'src/app/shared/model/service/company.service';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css']
})
export class EditarEmpresaComponent implements OnInit {
  editForm!: FormGroup;
  isLoading = false;
  originalCompanyData: company | null = null;
  companyId: number | null = null;

  constructor(private fb: FormBuilder, private companyService: CompanyService) { }

  ngOnInit() {
    const companyIdString = localStorage.getItem('companyid');
    if (companyIdString) {
      this.companyId = +companyIdString; // Convertir la cadena a número
      this.loadData();
    } else {
      console.error('No se encontró el ID de la compañía en el almacenamiento local');
    }

    this.editForm = this.fb.group({
      namecompany: ['', [Validators.required, Validators.minLength(3)]],
      nit: ['', Validators.required],
      namelegalrepresentative: [''],
      idlegalrepresentative: [''],
      email: ['', [Validators.required, Validators.email]],
      phonecompany: ['', [Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]],
      numworkers: ['', [Validators.required, Validators.min(1)]],
      address: ['', Validators.required],
      linkdate: [''],
      subscriptionenddate: [''],
      status: ['']
    });

    this.loadData();
  }

  loadData() {
    if (this.companyId) {
      this.companyService.getCompanyById(this.companyId).subscribe(
        (company: company) => {
          this.originalCompanyData = company;
          this.editForm.patchValue(company);
        },
        error => {
          console.error('Error al cargar la información de la empresa:', error);
        }
      );
    } else {
      console.error('ID de compañía no válido');
    }
  }

  onSubmit() {
    if (this.editForm.valid && this.originalCompanyData && this.companyId !== null) {
      this.isLoading = true;
      // Combinar los valores del formulario con los valores originales de la compañía
      const updatedCompany: company = { ...this.originalCompanyData, ...this.editForm.value };
      // Enviar los datos actualizados al servicio
      this.companyService.updateCompany(this.companyId!, updatedCompany).subscribe(
        () => {
          this.isLoading = false;
          alert('¡Datos actualizados exitosamente!');
        },
        error => {
          console.error('Error al actualizar la información de la empresa:', error);
          this.isLoading = false;
        }
      );
    } else {
      console.error('El formulario no es válido o el ID de la compañía es nulo');
    }
  }

}