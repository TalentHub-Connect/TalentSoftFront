import { Injectable } from '@angular/core';
import { candidateStatus } from '../Entities/candidatestatus';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatestatusService {
  private apiUrl = 'https://sstback-qa.up.railway.app/api/type/capacitations';


  constructor(private http: HttpClient) { }

  gettstatus(): Observable<candidateStatus []> {
    return this.http.get<candidateStatus []>(this.apiUrl);
  }
  getstatus(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
}