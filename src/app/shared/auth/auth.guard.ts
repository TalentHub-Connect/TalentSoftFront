import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../model/service/auth.service';
import Swal from 'sweetalert2';
 
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem('token')) {
      // Obtenemos la cadena de roles del localStorage y la convertimos en un array
      const rolesStr = localStorage.getItem('role');
      const roles: string[] = rolesStr ? rolesStr.split(', ') : [];  // Aseguramos el tipo explícito aquí
      // Verifica si alguno de los roles del usuario está en la lista de roles permitidos para la ruta
      if (route.data['roles'] && route.data['roles'].some((role: string) => roles.includes(role))) {
        return true;
      }
    }
    // Si no está autorizado, muestra una alerta y redirige al login
    Swal.fire({
      icon: 'error',
      title: 'No autorizado',
      text: 'No tiene permisos para acceder a esta página.',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#AA2535',
    });
    this.router.navigate(['home']);
 
    return false;
  }
}