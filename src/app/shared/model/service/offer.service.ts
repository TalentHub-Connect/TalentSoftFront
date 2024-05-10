import { Injectable } from '@angular/core';
import {offer} from '../Entities/offer';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class offerService {
  private apiUrl = 'https://66328febc51e14d69564cf84.mockapi.io/create-aspirantes/offer';
  constructor(private http: HttpClient) { }

  getoffers(): Observable<offer[]> {
    return this.http.get<offer[]>(this.apiUrl);
  }
  editoffer(id: number, status: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, { status });
  }
  editoffer1(id: number, status: string, tittleOffer: string, description: string, requirements: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, { status, tittleOffer, description, requirements });
  }
  agregaroffer(offer: offer): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, offer);
  }
  getoffer(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
}
