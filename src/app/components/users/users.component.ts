import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/model/service/user.service";
import {Router} from "@angular/router";
import {User} from "../../shared/model/auth/user";
import {Employee} from "../../shared/model/Entities/employee";
import {UsuarioPermisoDto} from "../../shared/model/Entities/usuario-permiso-dto";
import Swal from "sweetalert2";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private  userService: UserService,
    private router: Router
  ) {
  }

  users : Employee[]  | undefined
  username: string | null = null;


  rolesPorUsuario: { [key: string]: string[] } = {};
  usuarios: UsuarioPermisoDto[] | undefined;


  ngOnInit(){
    let timerInterval: any;
    Swal.fire({
      title: 'Cargando...',
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading(null);
        let timer: any;
        timerInterval = setInterval(() => {}, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    });

    this.username = localStorage.getItem('username');

    this.userService.findAllUsersbyCompanyId(localStorage.getItem("companyid")).subscribe((users) => {
      this.usuarios = users;
      this.usuarios.forEach((user) => {
        console.log(user.username)
        this.rolesPorUsuario[user.username] = user.roles;
      });
    });

    console.log("company: "+localStorage.getItem("companyid"))
    this.userService.findAllEmployees(localStorage.getItem("companyid")).subscribe(users =>
    {
      this.users = users;
      console.log("Users: "+ this.users);
      Swal.fire({
        icon: 'warning',
        title: 'Gestión de usuarios',
        text: 'No olvide guardar los cambios al finalizar',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#346C73',
      });
    });

  }

  public handleCheckboxChange(
    event: Event,
    username: string,
    rol: string
  ): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      const isChecked = target.checked;
      this.actualizarRoles(username, rol, isChecked);
    } else {
      // Manejar el caso en que target es null (si es necesario)
      console.error('El target es null en el evento del checkbox.');
    }
  }
  actualizarRoles(username: string, rol: string, isChecked: boolean): void {
    // Verificar si el usuario ya tiene este rol
    this.username = username;
    if (isChecked) {
      this.rolesPorUsuario[username].push(rol);
    } else {
      let rolesFinales: string[] = [];
      this.rolesPorUsuario[username].forEach((rolInner) => {
        if (rolInner != rol) {
          rolesFinales.push(rolInner);
        }
      });
      this.rolesPorUsuario[username] = rolesFinales;
    }

    console.log(
      'Roles actualizados para el usuario con ID : ' +
      this.username +
      ' Sus roles son: ' +
      this.rolesPorUsuario[username]
    );
  }
}

