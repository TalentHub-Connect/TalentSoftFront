import { Injectable } from '@angular/core';
import {typeevent} from '../Entities/typeevent';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoeventoService {
  private apiUrl = environment.SST+'/api/type/events';


  constructor(private http: HttpClient) { }

  gettevents(): Observable<typeevent[]> {
    return this.http.get<typeevent[]>(this.apiUrl);
  }
  getevent(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
}
