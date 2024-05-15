import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/model/service/data.service';


@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrl: './payment-info.component.css'
})
export class PaymentInfoComponent {

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
  // ESTO ERA PARA VER SI FUNCIONABA
  ngOnInit() {
    this.planData = {
      contract: "Trial",
      cardNumber: "XXXX-XXXX-XXXX-3465",
      deadline: 30
    };
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
