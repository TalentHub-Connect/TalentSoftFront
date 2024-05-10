import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { Observable, of } from 'rxjs';
import { capacitation } from '../Entities/capacitation';

@Injectable({
  providedIn: 'root'
})
export class CapacitacionesService {
  private apiUrl = 'https://sstback-qa.up.railway.app/api/capacitations';


  constructor(private http: HttpClient) { }


  getcapacitations(): Observable<capacitation[]> {
    return this.http.get<capacitation[]>(this.apiUrl);
  }
  editcapacitation(id: number, status: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, { status });
  }
  editcapacitation1(id: number,status: string, description: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, { status, description });
  }
  agregarcapacitation(capacitation: capacitation): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, capacitation);
  }
  getcapacitation(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
}

