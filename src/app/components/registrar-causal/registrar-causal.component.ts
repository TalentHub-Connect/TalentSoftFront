// registrar-causal.component.ts
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Reason } from 'src/app/shared/model/Entities/reason';
import { ReasonService } from 'src/app/shared/model/service/reason.service';  // Asumiendo que la ruta es correcta

@Component({
  selector: 'app-registrar-causal',
  templateUrl: './registrar-causal.component.html',
  styleUrls: ['./registrar-causal.component.css']
})
export class RegistrarCausalComponent {
  nuevaCausal: Reason = new Reason(0, '', '', 'Admin');
  isLoading = false; // Control para mostrar un indicador de carga

  constructor(
    private causalService: ReasonService,
    private router: Router,
    private snackBar: MatSnackBar  // Inyección de MatSnackBar para mostrar notificaciones
  ) { }

  guardarCausal(): void {
    const username = localStorage.getItem('username') || 'Usuario desconocido';
    this.nuevaCausal.createForUser = username;

    if (this.nuevaCausal.name && this.nuevaCausal.description) {
      this.isLoading = true; // Activar el indicador de carga
      this.causalService.agregarReason(this.nuevaCausal, this.nuevaCausal.createForUser).subscribe({
        next: (result) => {
          console.log('Causal agregada con éxito:', result);
          this.snackBar.open('Causal agregada con éxito', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/causales-despido']);
        },
        error: (err) => {
          console.error('Error al agregar la causal:', err);
          this.snackBar.open('Error al registrar la causal', 'Cerrar', { duration: 3000 });
        },
        complete: () => {
          this.isLoading = false; // Desactivar el indicador de carga
        }
      });
    } else {
      this.snackBar.open('Por favor, complete todos los campos necesarios.', 'Cerrar', { duration: 3000 });
    }
  }



  descartar(): void {
    this.router.navigate(['/causales-despido']);
  }
}