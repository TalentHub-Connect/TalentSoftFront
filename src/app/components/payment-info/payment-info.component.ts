import { Router } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import { DataService } from 'src/app/shared/model/service/data.service';
import {Card} from "../../model/card";


@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrl: './payment-info.component.css'
})
export class PaymentInfoComponent  implements  OnInit{

  constructor(private dataService: DataService,private router: Router) { }
  registerCoupon() {
    this.router.navigate(['/cupon']);
  }
  placeCard() {
    this.router.navigate(['/cambiar-mp']);
  }
  cambiarPlan() {
    this.router.navigate(['/cambiar-plan']);
  }
  planData: any;
  card: Card | undefined;
  // ESTO ERA PARA VER SI FUNCIONABA
  ngOnInit() {
    console.log(localStorage.getItem("email"));
    //this.dataService.getCardData(localStorage.getItem("email")).subscribe(card => this.card = card);
    this.dataService.getCardData("emailpro@hoas.com").subscribe(card => this.card = card);
  }

  //Acá si hace toda la lógica de la base de datos-Falta la URL, ponerla en el servisio que se llama data

  /*ngOnInit(): void {
    this.getPlanData();
  }*/

  getPlanData(): void {
    this.dataService.getPlanData()
      .subscribe(data => {
        this.planData = data;
      });
  }
}
