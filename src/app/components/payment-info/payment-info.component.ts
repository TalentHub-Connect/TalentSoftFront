import { Router } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import { DataService } from 'src/app/shared/model/service/data.service';

import Swal from "sweetalert2";
import {Plan} from "../../model/plan";
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
  planData: Plan | undefined;
  card: Card | undefined;

  paymentInfo : string = "";
  // ESTO ERA PARA VER SI FUNCIONABA
  ngOnInit() {
    let timerInterval: any;
    Swal.fire({
      title: "Cargando...",
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading(null);
        let timer: any;
        timerInterval = setInterval(() => {
        }, 50);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });

    console.log(localStorage.getItem("email"));
    this.dataService.getCardData(localStorage.getItem("username")).subscribe(card => this.card = card);
    if(this.card?.cardHolder != null || this.card?.cardHolder != undefined){
      this.paymentInfo = "Tarjeta terminada en "+this.card.cardNumber;
    }else{
      this.paymentInfo = "Pago asociado a la plataforma PSE"
    }
    this.dataService.getPlanData(localStorage.getItem("companyid")).subscribe(plan => {
      this.planData = plan;
      let timerInterval: any;
      Swal.fire({
        title: "Listo!",
        timer: 600,
        confirmButtonColor: '#2E575A',
        timerProgressBar: true,
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
    })
  }

}
