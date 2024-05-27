// UserService.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { User } from '../auth/user';
import {Employee} from "../Entities/employee";
import {UsuarioPermisoDto} from "../Entities/usuario-permiso-dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user: User, role: string, token: string): Observable<User> {
    const url = `${environment.authURL}/talentsoft/${role}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(url, user, { headers, responseType: 'text' as 'json' });
  }

  findAllEmployees(id : string | null) :Observable<Employee[]>{
    return this.http.get<Employee[]>(`http://localhost:8080/employee/getEmployees/${id}`)
  }

  agregarEmpleado(empleado: Employee) {
    return this.http.post<any>(`https://empresasnominamicroservice-qa.up.railway.app/employee/createEmployee`, empleado);
  }

  agregarUsuario(usuario: User): Observable<any> {
    return this.http.post<any>(`http://localhost:8083/user/save`, usuario);
  }

  findAllUsers(): Observable<UsuarioPermisoDto[]> {
    return this.http.get<UsuarioPermisoDto[]>(
      'https://canelausermanagementmicroservice-qa.up.railway.app/user/find_all_with_roles'
    );
  }

  findAllUsersbyCompanyId(id: string | null) {
    return this.http.get<UsuarioPermisoDto[]>(
      `http://localhost:8083/user/find_all_with_roles_by_company_id/${id}`
    );
  }
}
