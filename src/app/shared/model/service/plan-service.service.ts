import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanServiceService {

  constructor(private http: HttpClient) { }
  getPlanes(): Observable<any>{
    return this.http.get<any>('URL_EJEMPLO/planes');
  }
}
