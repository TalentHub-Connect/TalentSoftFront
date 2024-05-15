import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/model/service/user.service';
import { Router } from '@angular/router';
import { User } from '../../shared/model/auth/user';
import Swal from 'sweetalert2';

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
            this.router.navigate(['/users']);
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
