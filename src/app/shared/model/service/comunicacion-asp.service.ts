import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionAspService {

  constructor() { }
  private aspiranteEditSubject = new BehaviorSubject<boolean>(false);

  // Método para notificar al componente principal que se editó un aspirante
  notifyAspiranteEdit() {
    this.aspiranteEditSubject.next(true);
  }

  // Método para suscribirse a las notificaciones de edición de aspirante
  onAspiranteEdit() {
    return this.aspiranteEditSubject.asObservable();
  }
}
