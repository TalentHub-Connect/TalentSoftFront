import { Injectable } from '@angular/core';
import {typeincident} from '../Entities/typeincident';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TipoincidenteService {
  private apiUrl = environment.SST+'/api/type/incidents';
  


  constructor(private http: HttpClient) { }

  getincidents(): Observable<typeincident[]> {
    return this.http.get<typeincident[]>(this.apiUrl);
  }
  getincident(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
}