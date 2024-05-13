import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

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
}
