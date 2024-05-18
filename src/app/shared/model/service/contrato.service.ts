import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { contrato } from '../Entities/contrato';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  private apiUrl = 'https://empresasnominamicroservice-qa.up.railway.app/contract';
  constructor(private http: HttpClient) { }

  getContratos(): Observable<contrato[]> {
    return this.http.get<contrato[]>(this.apiUrl);
  }
  editContrato(id: number, status: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, { status });
  }
  
  agregarContrato(Contrato: contrato): Observable<number> {
    const url = `${this.apiUrl}/createContract`;
    return this.http.post<any>(`${url}`, Contrato);
  }
  getContrato(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
}
