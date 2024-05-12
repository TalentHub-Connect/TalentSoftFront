import { Injectable } from '@angular/core';
import { Reason } from '../Entities/reason';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReasonService {
  private apiUrl = `${environment.QaURL}/reasons`;

  constructor(private http: HttpClient) { }

  obtenerReasons(): Observable<Reason[]> {
    return this.http.get<Reason[]>(`${this.apiUrl}`);
  }


  obtenerReasonPorId(id: number): Observable<Reason> {
    return this.http.get<Reason>(`${this.apiUrl}/${id}`);
  }

  agregarReason(nuevaReason: Reason, createForUser: string): Observable<Reason> {
    createForUser = "Admin";
    const params = new HttpParams().set('createForUser', createForUser);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Reason>(this.apiUrl, nuevaReason, { headers, params });
  }


  editarReason(ReasonEditada: Reason): Observable<Reason> {
    return this.http.put<Reason>(`${this.apiUrl}/${ReasonEditada.id}`, ReasonEditada);
  }

  eliminarReason(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}