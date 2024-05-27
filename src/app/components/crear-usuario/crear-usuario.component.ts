import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/model/service/user.service';
import { Router } from '@angular/router';
import { User } from '../../shared/model/auth/user';
import Swal from 'sweetalert2';
import {Employee} from "../../shared/model/Entities/employee";

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  nuevoUsuario: User = new User();
  error_message: string = '';
  error: boolean = false;
  error_dict: { [key: number]: string } = {
    400: 'Credenciales incorrectas',
    500: 'Error del servidor',
  };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  enviarDatos(): void {
      const token = localStorage.getItem('token');
      if (token) {
        this.userService.createUser(this.nuevoUsuario, this.nuevoUsuario.role, token).subscribe(
          (data: any) => {
            console.log("Respuesta del servidor:", data);

            this.nuevoUsuario.username = data
            this.nuevoUsuario.email = data
            let companyId : number = 0;
            let companyIdStr =localStorage.getItem("companyid");
            if(companyIdStr!=null){
              companyId = +companyIdStr;
            }
            this.nuevoUsuario.companyid = companyId;
            // let empleado = new Employee(
            //   -1,
            //   this.nuevoUsuario.firstName,
            //   this.nuevoUsuario.lastName,
            //   "",
            //   -1,
            //   -1,
            //   -1,
            //   -1,
            //   companyId,
            //   "",
            //   this.nuevoUsuario.username,
            //   0,
            //   ""
            // );
            // console.log(empleado);
            // this.userService.agregarEmpleado(empleado).subscribe(response => {
            //     console.log('Empleado agregado correctamente:', response);
            //     this.router.navigate(['/users']);
            //     //this.router.navigate(['/canela/permisos']);
            //   },
            //   error => {
            //     console.error('Error al agregar Empleado:', error);
            //     //this.router.navigate(['/canela/permisos']);
            //   });
            console.log("NUEVO USUARIO: ")
            console.log(this.nuevoUsuario)
            this.userService.agregarUsuario(this.nuevoUsuario).subscribe(
              response => {
                console.log('Usuario agregado correctamente:', response);
                this.router.navigate(['/users']);
              },
              error => {
                console.error('Error al agregar Usuario:', error);
                this.router.navigate(['/canela/permisos']);
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
        console.error('No se encontró el token de autenticación');
        this.router.navigate(['/login']);
      }
  }

}
