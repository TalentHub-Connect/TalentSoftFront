import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { Observable, of } from 'rxjs';
import { event } from '../Entities/event';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private apiUrl = 'https://sstback-qa.up.railway.app/api/events';


  constructor(private http: HttpClient) { }


  getevents(): Observable<event[]> {
    return this.http.get<event[]>(this.apiUrl);
  }
  editevent(id: number, status: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/status`;
    return this.http.put(url, { status });
  }
  editevent1(id: number,status: string, description: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/details`;
    return this.http.put(url, { description, status, });
  }
  agregarevent(event: event): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, event);
  }
  getevent(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
}
