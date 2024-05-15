import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  showError(divInput: HTMLInputElement, divError: HTMLElement, msgError: string, show: boolean = true) {
    if (show) {
      divError.innerText = msgError;
      divInput.style.borderColor = '#FF0000';
    } else {
      divError.innerText = msgError;
      divInput.style.borderColor = 'hsl(270, 3%, 87%)';
    }
  }

  verifyIsFilled(divInput: HTMLInputElement, divError: HTMLElement): boolean {
    if (divInput.value.length > 0) {
      this.showError(divInput, divError, "", false);
      return true;
    } else {
      this.showError(divInput, divError, "Rellene el espacio");
      return false;
    }
  }

  validateLetters(input: HTMLInputElement, divError: HTMLElement) {
    // Validating if there's a letter
    let regExp = /[A-z]/g;
    if (regExp.test(input.value)) {
      this.showError(input, divError, 'Solo se aceptan números');
    } else {
      this.showError(input, divError, '', false);
    }
  }

  validateCardNumber(cardDetails: { card: HTMLElement, input: HTMLInputElement, errorDiv: HTMLElement, validation: boolean }) {
    
    let cardNumber = cardDetails.input.value.replace(/\s/g, ''); 
    cardNumber = cardNumber.replace(/(\d{4})/g, '$1 ').trim(); 
  
   
    cardDetails.input.value = cardNumber;
  
    
    const cardNumberWithoutSpaces = cardNumber.replace(/\s/g, ''); 
    if (/^\d{16}$/.test(cardNumberWithoutSpaces)) {
      this.showError(cardDetails.input, cardDetails.errorDiv, '', false);
      cardDetails.validation = true;
    } else {
      this.showError(cardDetails.input, cardDetails.errorDiv, 'Número de tarjeta inválido');
      cardDetails.validation = false;
    }
  }
  
}
