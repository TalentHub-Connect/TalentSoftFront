import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { EmpleadoN } from '../Entities/empleadoN';
import { New } from '../Entities/new';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoNService {

  private apiUrl = `${environment.NominaURL}/employee`;
  private apiUrlNew = `${environment.NominaURL}/employee`;

  constructor(private http: HttpClient) { }

  getEmpleadosNByCompanyId(companyId: number): Observable<EmpleadoN[]> {
    return this.http.get<EmpleadoN[]>(`${this.apiUrl}/getEmployees/${companyId}`).pipe(
      map(empleados => empleados.map(e => ({
        ...e,
        nombre: `${e.name} ${e.surname}`
      })))
    );
  }

  getEmpleadoNById(id: number): Observable<EmpleadoN> {
    return this.http.get<EmpleadoN>(`${this.apiUrl}/${id}`).pipe(
      map(e => ({
        ...e,
        nombre: `${e.name} ${e.surname}`
      }))
    );
  }

  deleteEmpleadoById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteEmployee/${id}`);
  }

  agregarNovedad(id: number, novedad: New): Observable<New> {
    return this.http.post<New>(`${this.apiUrl}/createNews/${id}`, novedad);
  }
}
