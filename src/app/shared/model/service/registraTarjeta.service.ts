import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Card } from '../Entities/card'; // Asegúrate de que la ruta de importación es correcta

@Injectable({
  providedIn: 'root'
})
export class RegistrarTarjetaService {
  
  constructor(private http: HttpClient) { }

  // Método para registrar una tarjeta con un token Bearer
  registrarTarjeta(card: Card, token: string): Observable<Card> {
    const url = `${environment.cardURL}`;
    
    // Crear los headers necesarios para la autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Card>(url, card, { headers });
  }
}
