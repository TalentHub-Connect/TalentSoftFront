import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { Observable, of } from 'rxjs';
import { candidate } from '../Entities/candidate';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private apiUrl = 'https://talentsoftreclutamientospring-qa.up.railway.app/candidate';


  constructor(private http: HttpClient) { }


  getCandidates(companyid:number): Observable<candidate[]> {
    const url = `${this.apiUrl}/getCandidates/${companyid}`;
    return this.http.get<candidate[]>(url);
  }
  editCandidate(id: number, status: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, { status });
  }
  editCandidate1(id: number, status: string, email: string, university: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, { status, email, university});
  }
  agregarCandidate(candidate: candidate): Observable<any> {
    const url = `${this.apiUrl}/createCandidate`;
    return this.http.post<any>(`${url}`, candidate);
  }
  getCandidate(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
}
