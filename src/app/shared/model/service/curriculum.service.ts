import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { curriculum } from '../Entities/curriculum';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

  private apiUrl = 'https://662dcbbda7dda1fa378b4cfc.mockapi.io/create-aspirantes/curriculum';
  constructor(private http: HttpClient) { }

  getCurriculums(): Observable<curriculum[]> {
    return this.http.get<curriculum[]>(this.apiUrl);
  }
  editCurriculum(id: number, status: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, { status });
  }
  
  agregarCurriculum(curriculum: curriculum): Observable<number> {
    return this.http.post<any>(`${this.apiUrl}`, curriculum).pipe(
      map((response: curriculum) => {
        if (response && response.id) {
          return response.id;
        } else {
          throw new Error('El ID del currículum no está presente en la respuesta del servidor');
        }
      })
    );
  }
  getCurriculum(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
}
