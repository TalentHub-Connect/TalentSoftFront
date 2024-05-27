import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { curriculum } from '../Entities/curriculum';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

  private apiUrl = environment.RECLUTAMIENTO+'/curriculum';
  constructor(private http: HttpClient) { }

  getCurriculums(): Observable<curriculum[]> {
    return this.http.get<curriculum[]>(this.apiUrl);
  }
  editCurriculum(id: number, status: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, { status });
  }

  agregarCurriculum(curriculum: curriculum): Observable<{ id: number }> {
    const url = `${this.apiUrl}/createCurriculum`;
    return this.http.post<{ id: number }>(url, curriculum).pipe(
      map(response => {
        if (response && response.id) {
          console.log(response.id);
          return response;
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
