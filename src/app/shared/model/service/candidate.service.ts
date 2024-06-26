import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { Observable, of } from 'rxjs';
import { candidate } from '../Entities/candidate';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private apiUrl = environment.RECLUTAMIENTO+'/candidate';


  constructor(private http: HttpClient) { }


  getCandidates(companyid:number): Observable<candidate[]> {
    const url = `${this.apiUrl}/getCandidates/company/${companyid}`;
    return this.http.get<candidate[]>(url);
  }
  editCandidate(id: number, status: string): Observable<any> {
    const url = `${this.apiUrl}/deleteCandidate/${id}`;
    return this.http.put(url, { status });
  }
  editCandidate1(id: number, status: string, phoneNumber: number): Observable<any> {
    const url = `${this.apiUrl}/updateCandidate/${id}`;
    return this.http.put(url, { status, phoneNumber});
  }
  agregarCandidate(candidate: candidate): Observable<any> {
    const url = `${this.apiUrl}/createCandidate`;
    return this.http.post<any>(`${url}`, candidate);
  }
  getCandidatebyId(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
}
