import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/model/service/user.service';
import { Router } from '@angular/router';
import { User } from '../../shared/model/auth/user';
import Swal from 'sweetalert2';
import { Employee } from "../../shared/model/Entities/employee";

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  nuevoUsuario: User = new User();
  empleados: Employee[] = [];
  selectedEmployee: Employee | null = null;
  error_message: string = '';
  error: boolean = false;
  error_dict: { [key: number]: string } = {
    400: 'Credenciales incorrectas',
    500: 'Error del servidor',
  };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    const companyIdStr = localStorage.getItem('companyid');
    if (companyIdStr) {
      const companyId = +companyIdStr;
      this.userService.findAllEmployees(companyId).subscribe(
        (data) => {
          this.empleados = data;
        },
        (error) => {
          console.error('Error al obtener empleados:', error);
        }
      );
    }
  }

  enviarDatos(): void {
    const token = localStorage.getItem('token');
    if (token && this.selectedEmployee) {
      this.nuevoUsuario.firstName = this.selectedEmployee.name;
      this.nuevoUsuario.lastName = this.selectedEmployee.surname;

      console.log("Enviando usuario:", this.nuevoUsuario);

      this.userService.createUser(this.nuevoUsuario, this.nuevoUsuario.role, token).subscribe(
        (data: any) => {
          console.log("Respuesta del servidor:", data);
          this.nuevoUsuario.username = data;
          this.nuevoUsuario.email = data;
          let companyId: number = 0;
          let companyIdStr = localStorage.getItem("companyid");
          if (companyIdStr != null) {
            companyId = +companyIdStr;
          }
          this.nuevoUsuario.companyid = companyId;

          console.log("NUEVO USUARIO: ");
          console.log(this.nuevoUsuario);
          this.userService.agregarUsuario(this.nuevoUsuario).subscribe(
            response => {
              console.log('Usuario agregado correctamente:', response);
              this.router.navigate(['/users']);
            },
            error => {
              console.error('Error al agregar Usuario:', error);
              this.router.navigate(['/crear-usuarios']);
            }
          );
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
        });
    } else {
      console.error('No se encontró el token de autenticación o no se seleccionó un empleado');
      this.router.navigate(['/login']);
    }
  }
}
