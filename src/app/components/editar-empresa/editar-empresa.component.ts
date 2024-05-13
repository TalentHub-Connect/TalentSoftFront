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
  companyId = 7;
  originalCompanyData: company | null = null;

  constructor(private fb: FormBuilder, private companyService: CompanyService) { }

  ngOnInit() {
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
    this.companyService.getCompanyById(this.companyId).subscribe(
      (company: company) => {
        // Guardar los datos originales de la compañía
        this.originalCompanyData = company;
        // Llenar el formulario con los datos de la compañía
        this.editForm.patchValue(company);
      },
      error => {
        console.error('Error al cargar la información de la empresa:', error);
      }
    );
  }

  onSubmit() {
    if (this.editForm.valid && this.originalCompanyData) {
      this.isLoading = true;
      // Combinar los valores del formulario con los valores originales de la compañía
      const updatedCompany: company = { ...this.originalCompanyData, ...this.editForm.value };
      // Enviar los datos actualizados al servicio
      this.companyService.updateCompany(this.companyId, updatedCompany).subscribe(
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
      console.error('El formulario no es válido');
    }
  }
}