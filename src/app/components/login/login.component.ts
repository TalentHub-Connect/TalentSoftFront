import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../shared/model/service/auth.service';
import { UtilService } from '../../shared/model/service/util.service';
import { CompanyService } from 'src/app/shared/model/service/company.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showRecruitmentCard: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private utilService: UtilService,
    private companyService: CompanyService,
  ) { }

  username: string = '';
  password: string = '';
  error: boolean = false;
  error_message: string = 'Error de conexión';
  returnUrl: string = '/';
  error_dict: { [key: number]: string } = {
    400: 'Credenciales incorrectas',
    500: 'Error del servidor',
  };

  areCorrectFields(): boolean {
    let dict: { [key: string]: string } = {};
    if (this.username === '') {
      dict['Usuario'] = 'El nombre de usuario es requerido';
    }
    if (this.password === '') {
      dict['Contraseña'] = 'La contraseña es requerida';
    }

    if (Object.keys(dict).length !== 0) {
      this.utilService.raiseInvalidFields(dict);
      return false;
    } else {
      return true;
    }
  }
  hasQueryParams() { }
  iniciarSesion(): void {
    console.log("Iniciando sesión...");
    if (this.areCorrectFields()) {
      console.log("Entra1...");
      this.authService.login(this.username, this.password).subscribe(
        (data: any) => {
          this.companyService.getIdCompany(data.email).subscribe(
            (companyData: any) => {
              const id = companyData.id;
              localStorage.setItem('companyid', id.toString());

            }
          );


          const rol = localStorage.getItem('role');
          const id =localStorage.getItem('companyid')
          
          if (rol === 'ADMIN, default-roles-talentsoft') {
            this.router.navigate(['/home']);
          } if (rol !== 'ADMIN, default-roles-talentsoft') {
            this.router.navigate(['/home']);
          }
        },
        (error: any) => {
          console.error("Error en la suscripción:", error);
          let code: number | undefined = error.status
            ? Math.round(error.status / 100) * 100
            : undefined;
          if (code && code in this.error_dict) {
            this.error_message = this.error_dict[code];
          }
          this.error = true;
          Swal.fire({
            icon: 'error',
            title: 'Error al iniciar sesión',
            text: this.error_message,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#AA2535',
          });
        }
      );
    }
  }

}
