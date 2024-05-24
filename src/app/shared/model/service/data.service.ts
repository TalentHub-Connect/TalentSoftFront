import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Card} from "../../../model/card";
import {Plan} from "../../../model/plan";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getPlanData(companyid: string | null) {
    return this.http.get<Plan>(`http://localhost:8082/plan/company/${companyid}`);
  }

  getCardData(item: string | null) {
    return this.http.get<Card>(`http://localhost:8082/card/email/${item}`);
  }
}
