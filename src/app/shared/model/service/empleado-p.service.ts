import { Injectable } from '@angular/core';
import {empleado} from '../Entities/empleadoP';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoPService {
  private apiUrl = 'https://empresasnominamicroservice-qa.up.railway.app/employee';


  constructor(private http: HttpClient) { }
  crearEmpleado(name: string, surname: string, phoneNumber: string, companyId: number, contractId: number): Observable<any> {
    const url = `${this.apiUrl}/createEmployee`;
    const empleadoData = {
      name,
      surname,
      phoneNumber,
      companyId,
      contractId
    };
    return this.http.post<any>(url, empleadoData);
  }
  getempleados(companyid:number): Observable<empleado[]> {
    const url = `${this.apiUrl}/getEmployees`;
    return this.http.get<empleado[]>(url);
  }
  getempleado(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
}
