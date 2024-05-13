import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { company } from '../Entities/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiUrl = 'https://companyback-qa.up.railway.app/api/talentsoft/company';

  constructor(private http: HttpClient) { }

  getIdCompany(email: string){
    const url = `${this.apiUrl}/${email}`; // Construye la URL con el email proporcionado
    return this.http.get<number>(url); // Realiza la solicitud HTTP GET y devuelve el observable
  }  
  getAllCompanies(): Observable<company[]> {
    return this.http.get<company[]>(`${this.apiUrl}/getCompanies`);
  }

  getCompanyById(id: number): Observable<company> {
    return this.http.get<company>(`${this.apiUrl}/${id}`);
  }

  createCompany(company: company): Observable<company> {
    return this.http.post<company>(`${this.apiUrl}/createCompany`, company);
  }

  updateCompany(id: number, company: company): Observable<company> {
    return this.http.put<company>(`${this.apiUrl}/updateCompany/${id}`, company);
  }

}



