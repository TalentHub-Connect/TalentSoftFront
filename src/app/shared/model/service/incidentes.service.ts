import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { Observable, of } from 'rxjs';
import { incident } from '../Entities/incident';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncidentesService {
  private apiUrl = environment.SST+'/api/incidents';


  constructor(private http: HttpClient) { }

  getincidentsbyCompany(companyid:number): Observable<incident[]> {
    const url = `${this.apiUrl}/company/${companyid}`;
    return this.http.get<incident[]>(url);
  }

  getincidents(): Observable<incident[]> {
    return this.http.get<incident[]>(this.apiUrl);
  }
  editincident(id: number, status: string): Observable<any> {
    const url = `${this.apiUrl}/status/${id}`;
    return this.http.put(url, { status });
  }
  editincident1(id: number, status: string, description: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, { status, description });
  }
  agregarincident(incident: incident): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, incident);
  }
  getincident(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
}
