import { Injectable } from '@angular/core';
import {offer} from '../Entities/offer';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class offerService {
  private apiUrl = 'https://talentsoftreclutamientospring-qa.up.railway.app/offer';
  constructor(private http: HttpClient) { }

  getoffers(companyid:number): Observable<offer[]> {
    const url = `${this.apiUrl}/getOffers/${companyid}`;
    return this.http.get<offer[]>(url);
  }
  
  editoffer(id: number, status: string): Observable<any> {
    const url = `${this.apiUrl}/updateStatus/${id}`;
    return this.http.put(url, { status });
  }
  editoffer1(id: number, status: string, tittleOffer: string, description: string, requirements: string): Observable<any> {
    const url = `${this.apiUrl}/updateOffer/${id}`;
    return this.http.put(url, { status, tittleOffer, description, requirements });
  }
  agregaroffer(offer: offer): Observable<any> {
    const url = `${this.apiUrl}/createOffer`;
    return this.http.post<any>(`${url}`, offer);
  }
  getoffer(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
}
