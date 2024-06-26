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
  private apiUrlNew = `${environment.NominaURL}/news`;
  private apiUrlPay = `${environment.NominaURL}/pay`;

  constructor(private http: HttpClient) { }

  getEmpleadosNByCompanyId(companyId: number): Observable<EmpleadoN[]> {
    return this.http.get<EmpleadoN[]>(`${this.apiUrl}/getEmployeesDTO/company/${companyId}`).pipe(
      map(empleados => empleados.map(e => ({
        ...e,
        nombre: `${e.name} ${e.surname}`
      })))
    );
  }

  getEmpleadoNById(id: number): Observable<EmpleadoN> {
    return this.http.get<EmpleadoN>(`${this.apiUrl}/dto/${id}`).pipe(
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
    return this.http.post<New>(`${this.apiUrlNew}/createNews/${id}`, novedad);
  }

  disperse(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrlPay}/disperse/${id}`);
  }

  getSalaries(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrlPay}/getSalaries/${id}`);
  }
}
