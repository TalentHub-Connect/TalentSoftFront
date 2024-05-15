import { Injectable } from '@angular/core';
import { candidateStatus } from '../Entities/candidatestatus';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatestatusService {
  private apiUrl = 'https://talentsoftreclutamientospring-qa.up.railway.app/candidatestatus';


  constructor(private http: HttpClient) { }

  gettstatus(): Observable<candidateStatus []> {
    const url = `${this.apiUrl}/getCandidatestatus`;
    return this.http.get<candidateStatus []>(url);
  }
  getstatus(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
}