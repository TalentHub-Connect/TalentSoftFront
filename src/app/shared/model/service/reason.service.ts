import { Injectable } from '@angular/core';
import { Reason } from '../Entities/reason';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReasonService {
  private apiUrl = `${environment.DespidosURL}/reasons`;

  constructor(private http: HttpClient) { }

  obtenerReasons(companyId: number): Observable<Reason[]> {
    const params = new HttpParams().set('companyId', companyId.toString());
    return this.http.get<Reason[]>(this.apiUrl, { params });
  }

  agregarReason(nuevaReason: Reason): Observable<Reason> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Reason>(this.apiUrl, nuevaReason, { headers });
  }

  obtenerReasonPorId(id: number): Observable<Reason> {
    return this.http.get<Reason>(`${this.apiUrl}/${id}`);
  }

  editarReason(ReasonEditada: Reason): Observable<Reason> {
    return this.http.put<Reason>(`${this.apiUrl}/${ReasonEditada.id}`, ReasonEditada);
  }

  eliminarReason(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
