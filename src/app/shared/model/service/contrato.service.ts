import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { contrato } from '../Entities/contrato';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  private apiUrl = environment.NominaURL+'/contract';
  constructor(private http: HttpClient) { }

  getContratos(): Observable<contrato[]> {
    return this.http.get<contrato[]>(this.apiUrl);
  }
  editContrato(id: number, status: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, { status });
  }
  
  agregarContrato(Contrato: contrato): Observable<{ contractId: number }> {
    const url = `${this.apiUrl}/createContract`;
    return this.http.post<{ contractId: number }>(url, Contrato).pipe(
      map(response => {
        if (response && response.contractId) {
          console.log(response.contractId);
          return response;
        } else {
          throw new Error('El ID del contrato no está presente en la respuesta del servidor');
        }
      })
    );
  }
  getContrato(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
}
