import { Injectable } from '@angular/core';
import { typecapacitation } from '../Entities/typecapacitation';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipocapacitacionService {
  private apiUrl = 'https://sstback-qa.up.railway.app/api/type/capacitations';


  constructor(private http: HttpClient) { }

  gettcapacitation(): Observable<typecapacitation []> {
    return this.http.get<typecapacitation []>(this.apiUrl);
  }
  getcapacitation(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
}