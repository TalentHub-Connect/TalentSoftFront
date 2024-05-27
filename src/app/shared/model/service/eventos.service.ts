import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { Observable, of } from 'rxjs';
import { event } from '../Entities/event';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventosService {


  constructor(private http: HttpClient) { }

  geteventsbyCompany(companyid:number): Observable<event[]> {
    const url = `${environment.SST}/api/events/company/${companyid}`;
    return this.http.get<event[]>(url);
  }

  getevents(): Observable<event[]> {
    const url = `${environment.SST}/api/events`;
    return this.http.get<event[]>(url);
  }
  editevent(id: number, status: string): Observable<any> {
    const url = `${environment.SST}/api/events/${id}/status`;
    return this.http.put(url, { status });
  }
  editevent1(id: number,status: string, description: string): Observable<any> {
    const url = `${environment.SST}/api/events/${id}/details`;
    return this.http.put(url, { description, status, });
  }
  agregarevent(event: event): Observable<any> {
    const url = `${environment.SST}/api/events`;
    return this.http.post<any>(`${url}`, event);
  }
  getevent(id: number): Observable<any> {
    const url = `${environment.SST}/api/events/${id}`;
    return this.http.get<any>(url);
  }
}
