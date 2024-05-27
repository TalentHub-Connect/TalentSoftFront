// UserService.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { User } from '../auth/user';
import { Employee } from "../Entities/employee";
import { UsuarioPermisoDto } from "../Entities/usuario-permiso-dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.NominaURL + '/employee';

  constructor(private http: HttpClient) { }

  createUser(user: User, role: string, token: string): Observable<User> {
    const url = `${environment.authURL}/talentsoft/${role}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(url, user, { headers, responseType: 'text' as 'json' });
  }

  findAllEmployees(companyid: number): Observable<Employee[]> {
    const url = `${this.apiUrl}/getEmployees/company/${companyid}`;
    return this.http.get<Employee[]>(url);
  }

  agregarEmpleado(empleado: Employee) {
    return this.http.post<any>(`https://empresasnominamicroservice-qa.up.railway.app/employee/createEmployee`, empleado);
  }

  agregarUsuario(usuario: User): Observable<any> {
    return this.http.post<any>(`https://canelausermanagementmicroservice-qa.up.railway.app/user/save`, usuario);
  }

  findAllUsers(): Observable<UsuarioPermisoDto[]> {
    return this.http.get<UsuarioPermisoDto[]>(
      'https://canelausermanagementmicroservice-qa.up.railway.app/user/find_all_with_roles'
    );
  }

  findAllUsersbyCompanyId(id: string | null) {
    return this.http.get<UsuarioPermisoDto[]>(
      `https://canelausermanagementmicroservice-qa.up.railway.app/user/find_all_with_roles_by_company_id/${id}`
    );
  }
}
