import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Card} from "../../../model/card";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getPlanData(): Observable<any> {
    // Aquí debes reemplazar la URL con la dirección de tu API que proporciona los datos del plan
    return this.http.get<any>('URL_DE_TU_API');
  }

  getCardData(item: string | null) {
    return this.http.get<Card>(`http://localhost:8082/card/email/${item}`);
  }
}
