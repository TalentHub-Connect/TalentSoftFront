import { Component, OnInit } from '@angular/core';
import { ValidationService } from 'src/app/shared/model/service/validation.service';
import { SendBService } from 'src/app/shared/model/service/send-b.service';
import { Card } from '../../shared/model/Entities/card';
import { Router } from '@angular/router';
import { RegistrarTarjetaService } from 'src/app/shared/model/service/registraTarjeta.service';

@Component({
  selector: 'app-tarjeta-visa',
  templateUrl: './tarjeta-visa.component.html',
  styleUrls: ['./tarjeta-visa.component.css']
})
export class TarjetaVisaComponent implements OnInit {

  nuevaTarjeta: Card = new Card();
  

  cardDetails: { [key: string]: { card: HTMLElement, input: HTMLInputElement, errorDiv: HTMLElement, validation: boolean } } = {};
  confirmBtn!: HTMLButtonElement;
  formSection!: HTMLElement;
  thanksSection!: HTMLElement;
  errorSection!: HTMLElement;

  constructor(private validationService: ValidationService, private registrarTarjeta: RegistrarTarjetaService,private router: Router) { }

  ngOnInit() {
    const fields = [
      { key: 'name', selector: '.card__details-name', inputId: 'cardholder', errorSelector: '.form__cardholder--error' },
      { key: 'number', selector: '.card__number', inputId: 'cardNumber', errorSelector: '.form__inputnumber--error' },
      { key: 'month', selector: '.card__month', inputId: 'cardMonth', errorSelector: '.form__input-mm--error' },
      { key: 'year', selector: '.card__year', inputId: 'cardYear', errorSelector: '.form__input-yy--error' },
      { key: 'cvc', selector: '.card-back__cvc', inputId: 'cardCvc', errorSelector: '.form__input-cvc--error' }
    ];

    fields.forEach(field => {
      this.cardDetails[field.key] = {
        card: document.querySelector(field.selector) as HTMLElement,
        input: document.querySelector(`#${field.inputId}`) as HTMLInputElement,
        errorDiv: document.querySelector(field.errorSelector) as HTMLElement,
        validation: false
      };

      if (field.key === 'name') {
        this.cardDetails[field.key].input.addEventListener('input', () => {
          this.cardDetails[field.key].card.innerText = this.cardDetails[field.key].input.value || 'JANE APPLESEED';
        });
      } else if (field.key === 'number') {
        this.cardDetails[field.key].input.addEventListener('input', () => {
          this.validationService.validateCardNumber(this.cardDetails[field.key]);
          this.cardDetails[field.key].card.innerText = this.cardDetails[field.key].input.value;
        });
      } else {
        this.cardDetails[field.key].input.addEventListener('input', () => {
          this.cardDetails[field.key].card.innerText = this.cardDetails[field.key].input.value;
          this.validationService.validateLetters(this.cardDetails[field.key].input, this.cardDetails[field.key].errorDiv);
        });
      }
    });

    this.confirmBtn = document.querySelector('.form__submit') as HTMLButtonElement;
    this.formSection = document.querySelector('.form') as HTMLElement;
    this.thanksSection = document.querySelector('.thanks-section') as HTMLElement;

    this.confirmBtn.addEventListener('click', (event) => {
      event.preventDefault();

      let isValid = true;
      Object.values(this.cardDetails).forEach(detail => {
        if (!this.validationService.verifyIsFilled(detail.input, detail.errorDiv)) {
          isValid = false;
        }
      });

      if (isValid) {
        this.enviarDatos()
      }
    });
  }
  checkboxChanged(event: any) {
    this.nuevaTarjeta.autoRenewal = event.target.checked;
    
    if (this.nuevaTarjeta.autoRenewal) {
    } else {
    }
  }


  enviarDatos(): void {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Datos que se envían:', this.nuevaTarjeta);
      this.registrarTarjeta.registrarTarjeta(this.nuevaTarjeta, token).subscribe({
        next: (data) => {
          console.log('Respuesta recibida:', data);
          this.router.navigate(['/users']);
        },
        error: (err) => {
          console.error('Error al enviar datos:', err);
        }
      });
      
    } else {
      console.error('No se encontró el token');
      this.router.navigate(['/login']);
    }
  }
}
