import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { Observable, of } from 'rxjs';
import { candidate } from '../Entities/candidate';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private apiUrl = 'https://662dcbbda7dda1fa378b4cfc.mockapi.io/create-aspirantes/candidate';


  constructor(private http: HttpClient) { }



  getCandidates(): Observable<candidate[]> {
    return this.http.get<candidate[]>(this.apiUrl);
  }
  editCandidate(id: number, status: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, { status });
  }
  editCandidate1(id: number, status: string, email: string, university: string, nameEmergencyContact: string, emergencyContact: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, { status, email, university, nameEmergencyContact, emergencyContact });
  }
  agregarCandidate(candidate: candidate): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, candidate);
  }
  getCandidate(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
}
