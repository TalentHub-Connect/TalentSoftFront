import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor(private http: HttpClient) { }

  

  // Módulos nuevos
  obtenerModulos(roleId: number): Observable<any[]> {
    return this.http.get<any[]>(`https://canelaaccounmanagermicroservice-qa.up.railway.app/services/role/${roleId}`);
  }
  
}
