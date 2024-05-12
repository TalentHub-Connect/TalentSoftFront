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

  getempleados(): Observable<empleado[]> {
    const url = `${this.apiUrl}/getEmployees`;
    return this.http.get<empleado[]>(this.apiUrl);
  }
  getempleado(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
}
