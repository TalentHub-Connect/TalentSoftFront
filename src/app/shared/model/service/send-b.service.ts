import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendBService {

  constructor(private http: HttpClient) { }

  enviarDatos(data: any): Observable<any> {
    
    const url = 'BACKEND_URL';
    return this.http.post<any>(url, data);
  }
}
